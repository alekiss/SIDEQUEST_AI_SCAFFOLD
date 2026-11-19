import { ImageBackground, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../theme/colors";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;
export default function WelcomeScreen({ navigation }: Props) {
  return (
    <ImageBackground
      source={require("../../assets/images/welcome-hero.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.brand}>
          <Ionicons name="compass" size={22} color={colors.secondary} />
          <Text style={styles.brandText}>
            SIDEQUEST <Text style={{ color: colors.secondary }}>AI</Text>
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.eyebrow}>
            SAIA DA ROTINA. ENCONTRE SUA PRÓXIMA MISSÃO.
          </Text>
          <Text style={styles.title}>
            Seu dia comum{"\n"}pode virar uma{"\n"}grande aventura.
          </Text>
          <Text style={styles.description}>
            Missões criadas por inteligência artificial, de acordo com seu
            humor, seu tempo e o clima ao seu redor.
          </Text>
          <PrimaryButton
            title="COMEÇAR A AVENTURA  →"
            onPress={() => navigation.replace("MainTabs")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: colors.background },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
    paddingTop: 62,
    backgroundColor: "rgba(7,9,28,0.22)",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandText: {
    color: colors.text,
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 16,
  },
  bottom: {
    backgroundColor: "rgba(9,11,29,0.88)",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eyebrow: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 38,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginVertical: 16,
  },
});
