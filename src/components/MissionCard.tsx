import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Mission } from "../types/Mission";
import { colors } from "../theme/colors";

type Props = { mission: Mission; onPress: () => void; completed?: boolean };
const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Exploração: "compass-outline",
  Criatividade: "color-palette-outline",
  Social: "people-outline",
  "Bem-estar": "leaf-outline",
};

export default function MissionCard({ mission, onPress, completed }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
    >
      <View style={styles.top}>
        <View style={styles.icon}>
          <Ionicons
            name={categoryIcons[mission.category] ?? "sparkles"}
            size={22}
            color={colors.secondary}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.category}>{mission.category.toUpperCase()}</Text>
          <Text style={styles.title}>{mission.title}</Text>
        </View>
        <Text style={styles.xp}>+{mission.xp} XP</Text>
      </View>
      <Text style={styles.description}>{mission.description}</Text>
      <View style={styles.meta}>
        <Text style={styles.metaText}>
          <Ionicons name="time-outline" size={14} /> {mission.durationMinutes}{" "}
          min
        </Text>
        <Text style={styles.metaText}>{mission.difficulty}</Text>
        {completed && <Text style={styles.done}>Concluída ✓</Text>}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  top: { flexDirection: "row", alignItems: "center", gap: 10 },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 3,
    flexShrink: 1,
  },
  xp: { color: colors.accent, fontWeight: "900", fontSize: 12 },
  description: { color: colors.muted, lineHeight: 20, marginTop: 12 },
  meta: { flexDirection: "row", alignItems: "center", gap: 16, marginTop: 14 },
  metaText: { color: colors.muted, fontSize: 12 },
  done: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "700",
    marginLeft: "auto",
  },
});
