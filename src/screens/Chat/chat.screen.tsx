import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { styles as chatStyles } from './chat.style';
import ChatHeader from '../../components/ChatHeader/chatHeader.component';
import { useScheme } from '../../contexts/ThemeContext/theme.context';
import Icon, { Icons } from '../../ui/Icon/icon.ui';
import Message from '../../components/Message/message.component';
import { useGetMessages } from '../../hooks/useGetMessages';
import useMessages from '../../zustand/useMessages';
import { useAuth } from '../../contexts/AuthContext/auth.context';
import Lottie from '../../ui/Lottie/lottie.ui';
import chatLoader from '../../assets/animations/chat_loader.json';
import useSendMessage from '../../hooks/useSendMessage';
import { formatDate } from '../../utils/formatDate';
import { extractTime } from '../../utils/extractTime';

export default function Chat({ route }) {
  const { otherParticipant } = route.params;
  const { loading } = useGetMessages(otherParticipant.user);
  const styles = chatStyles();
  const { colors } = useScheme();
  const [inputHeight, setInputHeight] = useState(60);
  const scrollViewRef = useRef(null);
  const { messages } = useMessages();
  const { authState } = useAuth();
  const [message, setMessage] = useState('');
  const { sending, error, sendMessage } = useSendMessage();
  console.log(sending);
  
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [inputHeight]);

  const handleContentSizeChange = (e) => {
    const newHeight = Math.min(e.nativeEvent.contentSize.height, 100);
    setInputHeight(newHeight);
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      return;
    }

    try {
      await sendMessage(otherParticipant.user, {
        message: message.trim(),
        messageType: 'text',
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader fullName={otherParticipant.fullName} photo={otherParticipant.photo} />
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            paddingBottom: 50,
          }}
        >
          {loading ? (
            <Lottie
              source={chatLoader}
              width={200}
              height={200}
              style={{ alignSelf: 'center', marginTop: 100 }}
            />
          ) : (
            <>
              {messages.map((messageItem, index) => (
                <Message
                  key={index}
                  date={extractTime(messageItem.createdAt)}
                  text={messageItem.message}
                  isMyMessage={messageItem.senderId === authState?._id}
                />
              ))}
            </>
          )}
        </ScrollView>

        <View style={[styles.inputCont, { height: inputHeight }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              type={Icons.Ionicons}
              name="add-outline"
              color={colors.placeHolder}
              size={28}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Type a message"
              placeholderTextColor={colors.placeHolder}
              multiline={true}
              returnKeyType="send"
              textAlignVertical="top"
              value={message}
              onChangeText={setMessage}
              onContentSizeChange={handleContentSizeChange}
            />
          </View>
        {sending ? (
           <Icon
           type={Icons.Ionicons}
           name="hourglass-outline"
           color={colors.placeHolder}
           size={28}
         />
        ):(
          <Pressable onPress={handleSubmit}>
          <Icon
              type={Icons.Ionicons}
              name="send-outline"
              color={colors.placeHolder}
              size={28}
            />
          </Pressable>
        )}
        </View>
      </View>
    </View>
  );
}
