import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import Icon, {Icons} from '../../ui/Icon/icon.ui';

export default function Message({
  text,
  isMyMessage,
  date,
}: {
  text: string;
  isMyMessage: boolean;
  date: string;
}) {
  const {colors} = useScheme();
  const borderRadiusStyle = isMyMessage
    ? {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }
    : {
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      };
  const styles = StyleSheet.create({
    container: {
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
      backgroundColor: isMyMessage
        ? colors.messageSender
        : colors.messageReceiver,
      ...borderRadiusStyle,

      marginVertical: 5,
      marginHorizontal: 16,
      padding: 10,
      maxWidth: '85%',
    },
    message: {
      color: isMyMessage ? '#fff' : colors.text,
      fontSize: 17,
    },
    date: {
      fontSize: 13,
      color: '#669da0',
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{text}</Text>
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <Text style={styles.date}>{date}</Text>
        {isMyMessage && (
          <Icon
            type={Icons.Ionicons}
            name="checkmark-done-outline"
            color={'#669da0'}
            size={16}
          />
        )}
      </View>
    </View>
  );
}
