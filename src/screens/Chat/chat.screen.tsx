import {View, Text, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles as chatStyles} from './chat.style';
import ChatHeader from '../../components/ChatHeader/chatHeader.component';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import Message from '../../components/Message/message.component';
import {useGetMessages} from '../../hooks/useGetMessages';
import useMessages from '../../zustand/useMessages';
import {useAuth} from '../../contexts/AuthContext/auth.context';
import Lottie from '../../ui/Lottie/lottie.ui';
import chatLoader from '../../assets/animations/chat_loader.json';
export default function Chat({route}) {
  const {otherParticipant} = route.params;
  const {loading} = useGetMessages(otherParticipant.user);
  const styles = chatStyles();
  const {colors} = useScheme();
  const [inputHeight, setInputHeight] = useState(60);
  const scrollViewRef = useRef(null);
  const {messages} = useMessages();
  const {authState} = useAuth();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: false});
    }
  }, [inputHeight]);

  const handleContentSizeChange = e => {
    const newHeight = Math.min(e.nativeEvent.contentSize.height, 100);
    setInputHeight(newHeight);
  };

  return (
    <View style={{flex: 1}}>
      <ChatHeader
        fullName={otherParticipant.fullName}
        photo={otherParticipant.photo}
      />
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            paddingBottom: 50,
          }}>
          {loading ? (
            <Lottie
              source={chatLoader}
              width={200}
              height={200}
              style={{alignSelf: 'center', marginTop: 100}}
            />
          ) : (
            <>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  date={message.createdAt}
                  text={message.message}
                  isMyMessage={message.senderId === authState?._id}
                />
              ))}
            </>
          )}
        </ScrollView>

        <View style={[styles.inputCont, {height: inputHeight}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              onContentSizeChange={handleContentSizeChange}
            />
          </View>
          <Icon
            type={Icons.Ionicons}
            name="send-outline"
            color={colors.placeHolder}
            size={28}
          />
        </View>
      </View>
    </View>
  );
}
