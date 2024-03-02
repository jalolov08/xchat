import React from 'react';
import {StyleSheet} from 'react-native';
import {darkColors} from '../../constants/darkColors.constant';
import {TextInputMask} from 'react-native-masked-text';

type TPhoneInput = {
  value: string;
  onChange: (text: string) => void;
};

export default function PhoneInput({value, onChange}: TPhoneInput) {
  return (
    <TextInputMask
      style={styles.input}
      placeholder="Телефон"
      placeholderTextColor={darkColors.placeHolder}
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

const styles = StyleSheet.create({
  input: {
    marginTop: 70,
    width: '100%',
    fontSize: 19,
    color: darkColors.text,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkColors.border,
  },
});
