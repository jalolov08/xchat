import React from 'react';
import {StyleSheet} from 'react-native';
import {lightColors} from '../../constants/lightColors.constant';
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
      placeholderTextColor={lightColors.placeHolder}
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
    color: lightColors.text,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border,
  },
});
