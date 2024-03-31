import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import useSendMessage from '../../hooks/useSendMessage';
import {extractTime} from '../../utils/extractTime';
import useListenMessages from '../../hooks/useListenMessages';
import ChatHeaderSelected from '../../components/ChatHeaderSelected/chatHeaderSelected.component';
import useSelect from '../../zustand/useSelect';
import {useFocusEffect} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import MessageImage from '../../components/MessageImage/messageImage.component';
import MessageModal from '../../components/MessageModal/messageModal.component';
import MessageDocument from '../../components/MessageDocument/messageDocument.component';
import useListenMessageViewed from '../../hooks/useListenMessageViewed';
type PickedDocument = {
  uri: string;
  type: string;
  name: string;
  size: number;
};

export default function Chat({route}) {
  useListenMessages();
  useListenMessageViewed();
  const {otherParticipant} = route.params;
  const {loading} = useGetMessages(otherParticipant.user);
  const styles = chatStyles();
  const {colors} = useScheme();
  const [inputHeight, setInputHeight] = useState(60);
  const scrollViewRef = useRef<ScrollView>(null);
  const {messages, getMessageById} = useMessages();
  const {authState} = useAuth();
  const [message, setMessage] = useState('');
  const [replyId, setReplyId] = useState('');
  const {sending, sendMessage} = useSendMessage();
  const [answerText, setAnswerText] = useState('');
  const {selectedItems, clearSelection} = useSelect();
  const [pickedDocument, setPickedDocument] = useState<
    PickedDocument | undefined
  >();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.xls,
          DocumentPicker.types.plainText,
          DocumentPicker.types.ppt,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });

      setPickedDocument(res[0]);

      showModal();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error :', err);
      }
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      let backPressCount = 0;

      const onBackPress = () => {
        if (selectedItems.length > 0 && backPressCount === 0) {
          clearSelection();
          backPressCount++;
          return true;
        } else {
          return false;
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        backHandler.remove();
      };
    }, [clearSelection, selectedItems]),
  );
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: messages.length > 0});
    }
  }, [messages, inputHeight]);

  const handleContentSizeChange = e =>
    setInputHeight(Math.min(e.nativeEvent.contentSize.height, 100));

  const handleReplyIdChange = (newReplyId: string) => {
    setReplyId(newReplyId);
    clearSelection();
  };

  useEffect(() => {
    if (replyId) setAnswerText(getMessageById(replyId)?.message || '');
  }, [replyId, getMessageById]);

  const handleSubmit = async () => {
    if (!message.trim() && !pickedDocument) return;

    try {
      const messageToSend = new FormData();

      if (message.trim()) {
        messageToSend.append('message', message.trim());
      }

      if (pickedDocument) {
        const documentType = pickedDocument.type.startsWith('image/')
          ? 'image'
          : 'document';

        messageToSend.append('file', {
          uri: pickedDocument.uri,
          type: pickedDocument.type,
          name: pickedDocument.name,
        });

        messageToSend.append('messageType', documentType);
      } else {
        messageToSend.append('messageType', 'text');
      }

      if (replyId) {
        messageToSend.append('answerFor', replyId);
      }

      await sendMessage(otherParticipant.user, messageToSend);

      setMessage('');
      setReplyId('');
      setAnswerText('');
      setPickedDocument(null);
      hideModal();
    } catch (error) {
      console.error('Error sending message:', error);
      hideModal();
    }
  };

  return (
    <View style={{flex: 1}}>
      <MessageModal
        visible={visible}
        hideModal={hideModal}
        pickedDocument={pickedDocument}
        handleSubmit={handleSubmit}
        sending={sending}
      />
      {selectedItems.length > 0 ? (
        <ChatHeaderSelected />
      ) : (
        <ChatHeader
          fullName={otherParticipant.fullName}
          photo={otherParticipant.photo}
        />
      )}
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            paddingBottom: replyId ? 100 : 50,
          }}>
          {loading ? (
            <Lottie
              source={chatLoader}
              width={200}
              height={200}
              style={{alignSelf: 'center', marginTop: 100}}
            />
          ) : (
            messages.map((messageItem, index) => {
              if (messageItem.messageType === 'image') {
                return (
                  <MessageImage
                    key={index}
                    uri={messageItem.uri}
                    id={messageItem._id}
                    date={extractTime(messageItem.createdAt)}
                    isMyMessage={messageItem.senderId === authState?._id}
                    date={extractTime(messageItem.createdAt)}
                    viewed={messageItem.viewed}

                  />
                );
              } else if (messageItem.messageType === 'document') {
                return (
                  <MessageDocument
                    uri={messageItem.uri}
                    date={extractTime(messageItem.createdAt)}
                    isMyMessage={messageItem.senderId === authState?._id}
                    id={messageItem._id}
                    viewed={messageItem.viewed}
                  />
                );
              } else {
                return (
                  <Message
                    key={index}
                    id={messageItem._id}
                    date={extractTime(messageItem.createdAt)}
                    text={messageItem.message}
                    isMyMessage={messageItem.senderId === authState?._id}
                    answerFor={messageItem.answerFor}
                    onReplyIdChange={handleReplyIdChange}
                    viewed={messageItem.viewed}

                  />
                );
              }
            })
          )}
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0}}>
          {replyId && (
            <View style={styles.replyCont}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  type={Icons.FontAwesome}
                  name="reply"
                  color={colors.text}
                  size={18}
                />
                <Text style={styles.replyText}>{answerText}</Text>
              </View>
              <Pressable
                onPress={() => {
                  setAnswerText(''), setReplyId('');
                }}>
                <Icon
                  type={Icons.Ionicons}
                  name="close-outline"
                  color={colors.text}
                  size={20}
                />
              </Pressable>
            </View>
          )}
          <View style={[styles.inputCont, {height: inputHeight}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Pressable onPress={pickDocument}>
                <Icon
                  type={Icons.Ionicons}
                  name="add-outline"
                  color={colors.placeHolder}
                  size={28}
                />
              </Pressable>
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
            ) : (
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
    </View>
  );
}
