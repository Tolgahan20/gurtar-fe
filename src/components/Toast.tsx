import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { ToastType } from '../context/ToastContext';
import { Body } from './ui/Typography';

interface ToastProps {
  type: ToastType;
  message: string;
  onDismiss: () => void;
  duration?: number;
}

type ToastConfig = {
  backgroundColor: string;
  iconColor: string;
  textColor: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export function Toast({ type, message, onDismiss, duration = 3000 }: ToastProps) {
  const translateY = React.useRef(new Animated.Value(-100)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Show animation
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss after duration
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const getToastConfig = (): ToastConfig => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.primaryLight,
          iconColor: colors.success,
          textColor: colors.textPrimary,
          icon: 'checkmark-circle',
        };
      case 'error':
        return {
          backgroundColor: '#FFF2F2',
          iconColor: colors.error,
          textColor: colors.textPrimary,
          icon: 'alert-circle',
        };
      case 'warning':
        return {
          backgroundColor: '#FFF7E6',
          iconColor: colors.warning,
          textColor: colors.textPrimary,
          icon: 'warning',
        };
      case 'info':
        return {
          backgroundColor: '#E6F7FF',
          iconColor: colors.primary,
          textColor: colors.textPrimary,
          icon: 'information-circle',
        };
      default:
        return {
          backgroundColor: colors.primaryLight,
          iconColor: colors.primary,
          textColor: colors.textPrimary,
          icon: 'information-circle',
        };
    }
  };

  const config = getToastConfig();
  const messageStyle: TextStyle = {
    ...styles.message,
    color: config.textColor,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name={config.icon} size={24} color={config.iconColor} style={styles.icon} />
        <Body style={messageStyle}>{message}</Body>
      </View>
      <TouchableOpacity 
        onPress={handleDismiss} 
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.closeButton}
      >
        <Ionicons name="close" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: spacing.lg,
    right: spacing.lg,
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  message: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
  closeButton: {
    marginLeft: spacing.md,
    padding: 2,
  },
});
