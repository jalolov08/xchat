import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useMemo, useState} from 'react';
import {styles as loginStyles} from './login.style';
import PhoneInput from '../../components/PhoneInput/phoneInput.component';
import CheckBox from 'react-native-check-box';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import {useAuth} from '../../contexts/AuthContext/auth.context';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import LinearGradient from 'react-native-linear-gradient';
export default function Login({navigation}) {
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const {onLogin, authState} = useAuth();
  const {colors , dark} = useScheme();
  const styles = loginStyles();
  const handleLogin = async () => {
    const sanitizedValue = phone.replace(/[()\s-]/g, '');
    
    const result = await onLogin(sanitizedValue);
    if (result.error) {
      Alert.alert(result.msg);
    } else {
      navigation.navigate('Verify');
    }
  };
  const gradientColors = useMemo(() => {
    return dark === true
      ? ['#0C1D1E', '#0A1213']
      : [colors.background, colors.background];
  }, [dark, colors]);
  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
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
          checkBoxColor={colors.text}
          uncheckedCheckBoxColor={colors.placeHolder}
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
          color={colors.text}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}
