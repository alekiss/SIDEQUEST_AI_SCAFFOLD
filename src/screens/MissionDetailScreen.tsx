import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import PrimaryButton from "../components/PrimaryButton";
import SurfaceCard from "../components/SurfaceCard";
import { useApp } from "../context/AppContext";
import type { RootStackParamList } from "../navigation/types";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Detalhes">;
export default function MissionDetailScreen({ route, navigation }: Props) {
  const { mission } = route.params;
  const { addCompletedMission, completedMissions } = useApp();
  const completed = completedMissions.includes(mission.id);

  const finish = async () => {
    if (completed) return;
    addCompletedMission(mission);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Missão concluída!",
      `Você ganhou ${mission.xp} XP. Continue explorando!`,
      [{ text: "Boa!", onPress: () => navigation.goBack() }],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.category}>{mission.category.toUpperCase()}</Text>
      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.description}>{mission.description}</Text>
      <View style={styles.stats}>
        <SurfaceCard style={styles.stat}>
          <Text style={styles.statValue}>{mission.durationMinutes} min</Text>
          <Text style={styles.statLabel}>DURAÇÃO</Text>
        </SurfaceCard>
        <SurfaceCard style={styles.stat}>
          <Text style={styles.statValue}>{mission.difficulty}</Text>
          <Text style={styles.statLabel}>DIFICULDADE</Text>
        </SurfaceCard>
        <SurfaceCard style={styles.stat}>
          <Text style={styles.statValue}>+{mission.xp} XP</Text>
          <Text style={styles.statLabel}>RECOMPENSA</Text>
        </SurfaceCard>
      </View>
      <Text style={styles.heading}>Seu roteiro</Text>
      <SurfaceCard>
        {mission.steps.map((step, index) => (
          <View key={`${index}-${step}`} style={styles.step}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </SurfaceCard>
      <PrimaryButton
        title={
          completed ? "MISSÃO JÁ CONCLUÍDA ✓" : "CONCLUIR MISSÃO E GANHAR XP"
        }
        onPress={finish}
        disabled={completed}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  category: {
    color: colors.secondary,
    fontWeight: "900",
    letterSpacing: 1.5,
    fontSize: 11,
    marginTop: 12,
  },
  title: { color: colors.text, fontSize: 30, fontWeight: "900", marginTop: 8 },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  stats: { flexDirection: "row", gap: 8, marginTop: 22 },
  stat: { flex: 1, padding: 10, alignItems: "center", marginBottom: 0 },
  statValue: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 13,
    textAlign: "center",
  },
  statLabel: {
    color: colors.muted,
    fontSize: 9,
    marginTop: 5,
    letterSpacing: 1,
  },
  heading: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 18,
    marginTop: 26,
    marginBottom: 12,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: { color: colors.secondary, fontWeight: "900" },
  stepText: { color: colors.text, flex: 1, lineHeight: 21 },
});
