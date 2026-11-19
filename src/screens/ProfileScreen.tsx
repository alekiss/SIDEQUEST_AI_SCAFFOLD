import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SurfaceCard from "../components/SurfaceCard";
import { useApp } from "../context/AppContext";
import { colors } from "../theme/colors";

export default function ProfileScreen() {
  const { xp, completedMissions } = useApp();
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={42} color={colors.secondary} />
      </View>
      <Text style={styles.title}>Explorador(a)</Text>
      <Text style={styles.subtitle}>Sua jornada está só começando.</Text>
      <SurfaceCard>
        <Text style={styles.label}>NÍVEL ATUAL</Text>
        <Text style={styles.level}>Nível {level}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {progress}/100 XP para o próximo nível
        </Text>
      </SurfaceCard>
      <View style={styles.statsRow}>
        <SurfaceCard style={styles.stat}>
          <Text style={styles.value}>{xp}</Text>
          <Text style={styles.label}>XP TOTAL</Text>
        </SurfaceCard>
        <SurfaceCard style={styles.stat}>
          <Text style={styles.value}>{completedMissions.length}</Text>
          <Text style={styles.label}>MISSÕES</Text>
        </SurfaceCard>
      </View>
      <Text style={styles.section}>Conquistas</Text>
      <SurfaceCard>
        <View style={styles.achievement}>
          <Ionicons name="sparkles" size={24} color={colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.achievementTitle}>Primeiro passo</Text>
            <Text style={styles.subtitleSmall}>
              Conclua sua primeira missão
            </Text>
          </View>
          <Text style={styles.status}>
            {completedMissions.length >= 1 ? "DESBLOQUEADA" : "BLOQUEADA"}
          </Text>
        </View>
        <View style={styles.achievement}>
          <Ionicons name="flame" size={24} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.achievementTitle}>Em movimento</Text>
            <Text style={styles.subtitleSmall}>Conclua cinco missões</Text>
          </View>
          <Text style={styles.status}>
            {completedMissions.length >= 5 ? "DESBLOQUEADA" : "BLOQUEADA"}
          </Text>
        </View>
      </SurfaceCard>
      <Text style={styles.note}>
        Nesta versão, XP e conquistas ficam apenas na memória enquanto o app
        estiver aberto. Persistência local é uma possível evolução.
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, alignItems: "stretch" },
  avatar: {
    alignSelf: "center",
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 14,
  },
  subtitle: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  level: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    marginTop: 8,
    marginBottom: 14,
  },
  progressTrack: {
    height: 9,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: 9,
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  progressText: { color: colors.muted, fontSize: 11, marginTop: 8 },
  statsRow: { flexDirection: "row", gap: 10 },
  stat: { flex: 1, alignItems: "center" },
  value: {
    color: colors.accent,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
  },
  section: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 10,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 8,
  },
  achievementTitle: { color: colors.text, fontWeight: "800" },
  subtitleSmall: { color: colors.muted, fontSize: 11, marginTop: 3 },
  status: { color: colors.secondary, fontSize: 9, fontWeight: "900" },
  note: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 8 },
});
