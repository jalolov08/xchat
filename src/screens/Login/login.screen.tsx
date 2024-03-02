import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './login.style';
import PhoneInput from '../../components/PhoneInput/phoneInput.component';
import CheckBox from 'react-native-check-box';
import {lightColors} from '../../constants/lightColors.constant';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
export default function Login() {
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.textCont}>
        <Text style={styles.title}>Ваш номер телефона</Text>
        <Text style={styles.subTitle}>
          Введите свой номер телефона и подтвердите согласие с пользовательским
          соглашением
        </Text>
      </View>
      <PhoneInput value={phone} onChange={text => setPhone(text)} />
      <View style={styles.privacyCont}>
        <CheckBox
          style={{width: 18, height: 18}}
          onClick={() => setIsChecked(!isChecked)}
          isChecked={isChecked}
          checkBoxColor={lightColors.text}
          uncheckedCheckBoxColor={lightColors.placeHolder}
        />
        <Text style={styles.privacyText}>
          Пользовательское соглашение — договор между владельцем компьютерной
          программы и пользователем её копии.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.nextBtn, (!phone || !isChecked) && {opacity: 0.5}]}
        disabled={!phone || !isChecked}>
        <Text style={styles.btnText}>Далее</Text>
        <Icon
          type={Icons.Ionicons}
          name="arrow-forward-outline"
          color={lightColors.text}
        />
      </TouchableOpacity>
    </View>
  );
}
