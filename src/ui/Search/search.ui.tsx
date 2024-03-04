import {View, TextInput, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import Icon, {Icons} from '../Icon/icon.ui';
import {darkColors} from '../../constants/darkColors.constant';
type TSearch = {
  containerStyle?: StyleProp<ViewStyle>;
  value?: string;
  onChange?: () => void;
};
export default function Search({containerStyle, value, onChange}: TSearch) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon
        type={Icons.Ionicons}
        name="search"
        style={{margin: 10}}
        color={darkColors.placeHolder}
      />
      <TextInput
        placeholder="Поиск"
        placeholderTextColor={darkColors.placeHolder}
        keyboardType="default"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: darkColors.border,
    borderRadius: 12,
  },
});
