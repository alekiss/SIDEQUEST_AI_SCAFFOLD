import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type Props = { label: string; selected: boolean; onPress: () => void };
export default function ChoiceChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { color: colors.muted, fontWeight: "600" },
  selectedLabel: { color: "#FFFFFF" },
});
