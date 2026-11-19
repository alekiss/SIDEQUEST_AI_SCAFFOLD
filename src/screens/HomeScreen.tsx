import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "../navigation/types";
import { colors } from "../theme/colors";
import SurfaceCard from "../components/SurfaceCard";
import ChoiceChip from "../components/ChoiceChip";
import PrimaryButton from "../components/PrimaryButton";
import MissionCard from "../components/MissionCard";
import { getCurrentWeather } from "../services/weatherService";
import { generateMissions } from "../services/aiService";
import { useApp } from "../context/AppContext";
import type { Energy, Mission, Mood, WeatherInfo } from "../types/Mission";

type Props = BottomTabScreenProps<MainTabParamList, "Missões">;
export default function HomeScreen({ navigation }: Props) {
  const [mood, setMood] = useState<Mood>("Tranquilo");
  const [energy, setEnergy] = useState<Energy>("Média");
  const [minutes, setMinutes] = useState(30);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const { xp, completedMissions } = useApp();

  const loadWeather = async () => {
    setWeatherLoading(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted)
        throw new Error("Permissão de localização não concedida.");
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const result = await getCurrentWeather(
        position.coords.latitude,
        position.coords.longitude,
      );
      setWeather(result);
      await Haptics.selectionAsync();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível consultar o clima.";
      Alert.alert(
        "Clima indisponível",
        `${message}\nVocê ainda pode gerar missões sem essa informação.`,
      );
    } finally {
      setWeatherLoading(false);
    }
  };

  const createMissions = async () => {
    setLoading(true);
    setMissions([]);
    try {
      const result = await generateMissions({
        mood,
        energy,
        availableMinutes: minutes,
        weather,
      });
      setMissions(result);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido.";
      Alert.alert("Não foi possível criar missões", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>SUA PRÓXIMA AVENTURA</Text>
          <Text style={styles.title}>O que vamos fazer hoje?</Text>
        </View>
        <View style={styles.xpBadge}>
          <Ionicons name="flash" color={colors.accent} size={16} />
          <Text style={styles.xpText}>{xp} XP</Text>
        </View>
      </View>

      <SurfaceCard>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Clima ao seu redor</Text>
          <Ionicons
            name="partly-sunny-outline"
            size={22}
            color={colors.secondary}
          />
        </View>
        {weather ? (
          <Text style={styles.weather}>
            {weather.temperature}°C · {weather.description}
          </Text>
        ) : (
          <Text style={styles.muted}>
            Use sua localização para adaptar as missões ao clima.
          </Text>
        )}
        <PrimaryButton
          title={
            weatherLoading
              ? "CONSULTANDO..."
              : weather
                ? "ATUALIZAR CLIMA"
                : "BUSCAR CLIMA LOCAL"
          }
          onPress={loadWeather}
          loading={weatherLoading}
          variant="secondary"
        />
      </SurfaceCard>

      <Text style={styles.sectionTitle}>Como você está se sentindo?</Text>
      <View style={styles.chips}>
        {(["Animado", "Tranquilo", "Cansado", "Desafiado"] as Mood[]).map(
          (item) => (
            <ChoiceChip
              key={item}
              label={item}
              selected={mood === item}
              onPress={() => setMood(item)}
            />
          ),
        )}
      </View>

      <Text style={styles.sectionTitle}>Qual seu nível de energia?</Text>
      <View style={styles.chips}>
        {(["Baixa", "Média", "Alta"] as Energy[]).map((item) => (
          <ChoiceChip
            key={item}
            label={item}
            selected={energy === item}
            onPress={() => setEnergy(item)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quanto tempo você tem?</Text>
      <View style={styles.chips}>
        {([10, 20, 30, 60] as const).map((item) => (
          <ChoiceChip
            key={item}
            label={`${item} min`}
            selected={minutes === item}
            onPress={() => setMinutes(item)}
          />
        ))}
      </View>

      <PrimaryButton
        title="✦  GERAR MINHAS MISSÕES"
        onPress={createMissions}
        loading={loading}
      />
      {missions.length > 0 && (
        <Text style={styles.sectionTitle}>Missões preparadas para você</Text>
      )}
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          completed={completedMissions.includes(mission.id)}
          onPress={() => navigation.navigate("Detalhes", { mission })}
        />
      ))}
      <Text style={styles.footer}>
        As sugestões são geradas por IA. Escolha apenas atividades seguras e
        adequadas à sua realidade.
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 36 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  greeting: {
    color: colors.secondary,
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 1.4,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 6,
    maxWidth: 250,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    padding: 10,
    borderRadius: 14,
    gap: 4,
  },
  xpText: { color: colors.accent, fontWeight: "900" },
  cardTitle: { color: colors.text, fontWeight: "800", fontSize: 16 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weather: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  muted: { color: colors.muted, marginBottom: 12, lineHeight: 20 },
  sectionTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 17,
    marginTop: 12,
    marginBottom: 10,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", marginBottom: 8 },
  footer: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 20,
    textAlign: "center",
  },
});
