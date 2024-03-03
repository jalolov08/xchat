import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './verify.style';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {darkColors} from '../../constants/darkColors.constant';
import {lightColors} from '../../constants/lightColors.constant';
import LinearGradient from 'react-native-linear-gradient';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import {useAuth} from '../../contexts/AuthContext/auth.context';
const CELL_COUNT = 6;

export default function Verify({navigation}) {
  const [code, setCode] = useState('');
  const {onVerify, authState} = useAuth();
  
  const handleVerify = async () => {
    const result = await onVerify(code);
    if (result.data.token) {
      console.log('Token is verified');
      navigation.navigate('Chats');
    } else {
      Alert.alert(result.data.error);
      setCode('');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textCont}>
        <Text style={styles.title}>Подтвердите номер</Text>
        <Text style={styles.subTitle}>
          На ваш номер отправлено sms-сообщение с 6-значным кодом. Введите код
        </Text>
      </View>

      <CodeField
        value={code}
        onChangeText={(text: string) => setCode(text)}
        cellCount={CELL_COUNT}
        rootStyle={{marginTop: 30}}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <LinearGradient
            colors={['rgba(0, 92, 96, 0)', 'rgba(0, 92, 96, 0.2)']}
            key={index}
            style={{
              flex: 1,
              height: 71,
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: isFocused
                ? darkColors.text
                : darkColors.border,
              borderBottomWidth: 2,
            }}>
            <Text
              style={{
                fontSize: 24,
                color: darkColors.text,
                fontWeight: '600',
              }}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </LinearGradient>
        )}
      />
      <TouchableOpacity
        style={[
          styles.nextBtn,
          {opacity: code.length !== CELL_COUNT ? 0.5 : 1},
        ]}
        onPress={handleVerify}
        disabled={code.length !== CELL_COUNT}>
        <Text style={styles.btnText}>Потвердить</Text>
      </TouchableOpacity>
    </View>
  );
}
