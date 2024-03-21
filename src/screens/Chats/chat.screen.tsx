import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext/auth.context';
import useChats, { Chat } from '../../zustand/useChats';
import Search from '../../ui/Search/search.ui';
import styles from './chat.style';
import { API } from '../../../config';
import errorLoad from '../../assets/animations/error.json';
import empty from '../../assets/animations/empty.json';
import Lottie from '../../ui/Lottie/lottie.ui';

interface OtherParticipant {
  user: string;
  photo: string;
  fullName: string;
}

export default function Chats() {
  const navigation = useNavigation();
  const { chats } = useChats();
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const sortChatsByDate = (chats: Chat[]) => {
    return chats.slice().sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  };

  const sortedChats = sortChatsByDate(chats);

  const renderItem = ({ item }: { item: Chat }) => {
    const otherParticipant = item.participantDetails.find(
      (participant: OtherParticipant) => participant.user !== authState?._id,
    );

    return (
      <TouchableOpacity style={styles.chatCont}>
        <Image
          source={{ uri: `${API}${otherParticipant.photo}` }}
          style={styles.chatPhoto}
        />
        <View>
          <Text style={styles.chatName}>{otherParticipant.fullName}</Text>
          <Text style={styles.chatLastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Чаты</Text>
      <Search
        containerStyle={{ marginTop: 20 }}
        value={searchQuery}
        onChange={setSearchQuery}
      />
      {isLoading ? (
        <Lottie source={errorLoad} />
      ) : sortedChats.length === 0 ? (
          <Lottie source={empty} />
      ) : (
        <FlatList
          data={sortedChats}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
}
