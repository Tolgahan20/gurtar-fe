import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../constants/theme";
import { ToastType } from "../context/ToastContext";
import { Body } from "./ui/Typography";

interface ToastProps {
  type: ToastType;
  message: string;
}

const getToastConfig = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        backgroundColor: colors.success,
        icon: "checkmark-circle-outline",
      };
    case "error":
      return {
        backgroundColor: colors.error,
        icon: "alert-circle-outline",
      };
    case "warning":
      return {
        backgroundColor: colors.warning,
        icon: "warning-outline",
      };
    case "info":
      return {
        backgroundColor: colors.info,
        icon: "information-circle-outline",
      };
    default:
      return {
        backgroundColor: colors.info,
        icon: "information-circle-outline",
      };
  }
};

export function Toast({ type, message }: ToastProps) {
  const config = getToastConfig(type);

  return (
    <View
      style={[styles.container, { backgroundColor: config.backgroundColor }]}
    >
      <Ionicons
        name={config.icon as any}
        size={24}
        color={colors.textLight}
        style={styles.icon}
      />
      <Body style={styles.message}>{message}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
    padding: spacing.md,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    marginRight: spacing.sm,
  },
  message: {
    color: colors.textLight,
    flex: 1,
  },
});
