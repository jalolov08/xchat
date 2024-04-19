import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, { useMemo } from 'react';
import Icon, {Icons} from '../Icon/icon.ui';
import {useNavigation} from '@react-navigation/native';
import { useScheme } from '../../contexts/ThemeContext/theme.context';
import LinearGradient from 'react-native-linear-gradient';
type THeader = {
  backIcon?: boolean;
  title?: string;
  rightIconName?: string;
  onRightIconClick?: () => void;
};
export default function HeaderBack({
  backIcon,
  title,
  rightIconName,
  onRightIconClick,
}: THeader) {
  const navigation = useNavigation();
  const {colors , dark} = useScheme()
  const styles = StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      padding: 16,
    },
    title: {
      fontSize: 22,
      color: colors.primary,
      marginLeft: 15,
      fontWeight:'600'
    },
  });
  const gradientColors = useMemo(() => {
    return dark === true
      ? ['#0C1D1E', '#0A1213']
      : [colors.background, colors.background];
  }, [dark, colors]);
  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      {backIcon && (
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.Ionicons}
            name="arrow-back-outline"
            color={colors.primary}
            size={24}
          />
        </Pressable>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {rightIconName && (
        <Pressable onPress={onRightIconClick} style={{marginLeft: 'auto'}}>
          <Icon
            type={Icons.Ionicons}
            name={rightIconName}
            color={colors.primary}
            size={28}
          />
        </Pressable>
      )}
    </LinearGradient>
  );
}


