import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {darkColors} from '../../constants/darkColors.constant';
import Icon, {Icons} from '../Icon/icon.ui';
import {useNavigation} from '@react-navigation/native';
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
  return (
    <View style={styles.container}>
      {backIcon && (
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.Ionicons}
            name="arrow-back-outline"
            color={darkColors.primary}
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
            color={darkColors.primary}
            size={28}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: darkColors.background,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: darkColors.border,
    borderBottomWidth: 1,
    padding:16
  },
  title: {
    fontSize: 22,
    color: darkColors.primary,
    marginLeft: 10,
  },
});
