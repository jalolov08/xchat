import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import { useScheme } from '../../contexts/ThemeContext/theme.context';

type TPhoneInput = {
  value: string;
  onChange: (text: string) => void;
};

export default function PhoneInput({value, onChange}: TPhoneInput) {
    const {colors} = useScheme()
const styles = StyleSheet.create({
  input: {
    marginTop: 70,
    width: '100%',
    fontSize: 19,
    color: colors.text,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
  return (
    <TextInputMask
      style={styles.input}
      placeholder="Телефон"
      placeholderTextColor={colors.placeHolder}
      keyboardType="phone-pad"
      type={'custom'}
      options={{
        mask: '+7 (999) 999-99-99',
      }}
      value={value}
      onChangeText={onChange}
      maxLength={18}
    />
  );
}

