import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon, {Icons} from '../Icon/icon.ui';
import {useNavigation} from '@react-navigation/native';
import { useScheme } from '../../contexts/ThemeContext/theme.context';
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
  const {colors} = useScheme()
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
      marginLeft: 10,
      fontWeight:'600'
    },
  });
  return (
    <View style={styles.container}>
      {backIcon && (
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.Ionicons}
            name="arrow-back-outline"
            color={colors.primary}
            size={28}
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
    </View>
  );
}


