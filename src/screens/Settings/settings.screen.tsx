import {View, Text, Image, Switch, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles as settingsStyle} from './settings.style';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import {useAuth} from '../../contexts/AuthContext/auth.context';
import {API} from '../../../config';

export default function Settings({navigation}) {
  const styles = settingsStyle();
  const {colors, setScheme, dark} = useScheme();
  const {authState} = useAuth();
  const toggleDarkMode = () => {
    const newScheme = dark ? 'light' : 'dark';
    setScheme(newScheme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Настройки</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('ChangeProfile', {
              name: authState?.name,
              surname: authState?.surname,
              photoUri: authState?.photoUri,
            })
          }>
          <Icon
            type={Icons.Ionicons}
            name="create-outline"
            color={colors.accent}
            size={26}
          />
        </Pressable>
      </View>
      <View style={styles.userCont}>
        <Image
          source={{uri: `${API}${authState?.photoUri}`}}
          style={styles.photo}
        />
        <View>
          <Text style={styles.name}>
            {authState?.name} {authState?.surname}
          </Text>
          <Text style={styles.phone}>{authState?.phone}</Text>
        </View>
      </View>
      <Pressable style={styles.settingsCont}>
        <Text style={styles.settingsText}>Темная тема</Text>
        <Switch
          value={dark}
          onValueChange={toggleDarkMode}
          thumbColor={colors.accentt}
          trackColor={{false: colors.text, true: colors.text}}
        />
      </Pressable>
      <Pressable style={styles.settingsCont}>
        <Text style={styles.settingsText}>Конфиденциальность </Text>
        <Icon
          type={Icons.Ionicons}
          name="shield-outline"
          size={26}
          color={colors.accent}
        />
      </Pressable>
      <Pressable style={styles.settingsCont}>
        <Text style={[styles.settingsText, {color: '#CF2A2A'}]}>Выйти </Text>
        <Icon
          type={Icons.Ionicons}
          name="log-out-outline"
          size={26}
          color="#CF2A2A"
        />
      </Pressable>
    </View>
  );
}
