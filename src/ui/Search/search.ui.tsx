import React from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon, { Icons } from '../Icon/icon.ui';
import { useScheme } from '../../contexts/ThemeContext/theme.context';

type TSearch = {
  containerStyle?: StyleProp<ViewStyle>;
  value?: string;
  onChange?: (text: string) => void; 
};

export default function Search({ containerStyle, value, onChange }: TSearch) {
  const { colors } = useScheme();

  const styles = StyleSheet.create({
    container: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.search,
      borderRadius: 12,
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Icon
        type={Icons.Ionicons}
        name="search"
        size={20}
        style={{ margin: 10 }}
        color={colors.placeHolder}
      />
      <TextInput
        placeholder="Поиск"
        placeholderTextColor={colors.placeHolder}
        keyboardType="default"
        value={value}
        onChangeText={onChange} 
      />
    </View>
  );
}
