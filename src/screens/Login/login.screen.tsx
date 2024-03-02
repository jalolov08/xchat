import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './login.style';
import PhoneInput from '../../components/PhoneInput/phoneInput.component';
import CheckBox from 'react-native-check-box';
import {darkColors} from '../../constants/darkColors.constant';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import {useAuth} from '../../contexts/AuthContext/auth.context';
import {useNavigation} from '@react-navigation/native';
export default function Login() {
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const {onLogin, authState} = useAuth();
  const navigation = useNavigation();
  const handleLogin = async () => {
    const result = await onLogin(phone);
    if (result.error) {
      Alert.alert(result.msg);
    } else {
      navigation.navigate('Verify');
    }
  };
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
          checkBoxColor={darkColors.text}
          uncheckedCheckBoxColor={darkColors.placeHolder}
        />
        <Text style={styles.privacyText}>
          Пользовательское соглашение — договор между владельцем компьютерной
          программы и пользователем её копии.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.nextBtn, (!phone || !isChecked) && {opacity: 0.5}]}
        disabled={!phone || !isChecked}
        onPress={handleLogin}>
        <Text style={styles.btnText}>Далее</Text>
        <Icon
          type={Icons.Ionicons}
          name="arrow-forward-outline"
          color={darkColors.text}
        />
      </TouchableOpacity>
    </View>
  );
}
