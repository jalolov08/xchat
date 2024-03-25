import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import {useNavigation} from '@react-navigation/native';
import {API} from '../../../config';

export default function ChatHeader({
  fullName,
  photo,
}: {
  fullName: string;
  photo: string;
}) {
  const {colors} = useScheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      padding: 16,
    },
    name: {
      fontSize: 19,
      color: colors.text,
      marginLeft: 10,
      fontWeight: '600',
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 40,
      marginLeft: 20,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon
          type={Icons.Ionicons}
          name="arrow-back-outline"
          color={colors.primary}
          size={24}
        />
      </Pressable>
      <Image
        style={styles.image}
        source={{
          uri: `${API}${photo}`,
        }}
      />
      <Text style={styles.name}>{fullName}</Text>
    </View>
  );
}
