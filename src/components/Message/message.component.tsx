import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import useMessages from '../../zustand/useMessages';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useSelect from '../../zustand/useSelect';

type TMessage = {
  id: string;
  text: string;
  isMyMessage: boolean;
  date: string;
  answerFor?: string;
  onReplyIdChange?: (replyId: string) => void;
};

function Message({
  id,
  text,
  isMyMessage,
  date,
  answerFor,
  onReplyIdChange,
}: TMessage) {
  const {colors} = useScheme();
  const {getMessageById} = useMessages();
  const repliedMessage = answerFor ? getMessageById(answerFor) : null;
  const translateX = useSharedValue(0);
  const [firstSelectionDone, setFirstSelectionDone] = useState(false);
  const {selectItem, selectedItems, deselectItem, clearSelection} = useSelect();
  const isSelect = selectedItems.includes(id);
  const penGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      const newTranslateX = context.startX + event.translationX;
      translateX.value = Math.max(-50, Math.min(0, newTranslateX));
    },
    onEnd: event => {
      if (translateX.value < -20) {
        translateX.value = withSpring(-50, {}, () => {
          runOnJS(onReplyIdChange)(id);
        });
      }
      translateX.value = withSpring(0);
    },
  });

  const viewStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    backgroundColor: isMyMessage
      ? colors.messageSender
      : colors.messageReceiver,
  }));

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
      maxWidth: '85%',
      minWidth: '30%',
      padding: 10,
    },
    message: {
      color: isMyMessage ? '#fff' : colors.text,
      fontSize: 17,
    },
    date: {
      fontSize: 13,
      color: '#669da0',
    },
    replyCont: {
      backgroundColor: isMyMessage
        ? colors.messageReceiver
        : colors.messageSender,
      padding: 8,
      marginBottom: 5,
      borderRadius: 8,
      borderLeftColor: '#fff',
      borderLeftWidth: 2,
    },
    answerText: {
      fontSize: 14,
      color: '#fff',
    },
  });
  const handlePress = () => {
    if (isSelect) {
      deselectItem(id);
    } else {
      if (selectedItems.length > 0) {
        selectItem(id);
      }
    }
  };

  const handleLongPress = () => {
    selectItem(id);
    setFirstSelectionDone(true);
  };

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      android_disableSound={true}
      style={{
        backgroundColor: isSelect ? 'hsla(182, 100%, 19%, 0.2)' : 'transparent',
      }}>
      <PanGestureHandler onGestureEvent={penGesture}>
        <Animated.View style={[styles.container, viewStyle]}>
          {answerFor && (
            <View style={styles.replyCont}>
              <Text style={styles.answerText} numberOfLines={1}>
                {repliedMessage?.message}
              </Text>
            </View>
          )}
          <Text style={styles.message}>{text}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginTop: 10,
            }}>
            <Text style={styles.date}>{date}</Text>
            {isMyMessage && (
              <Icon
                type={Icons.Ionicons}
                name="checkmark-done-outline"
                color={'#669da0'}
                size={16}
                style={{marginLeft: 5}}
              />
            )}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Pressable>
  );
}
export default React.memo(Message);
