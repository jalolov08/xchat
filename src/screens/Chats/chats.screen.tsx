import React, {useMemo, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../contexts/AuthContext/auth.context';
import useChats, {Chat} from '../../zustand/useChats';
import Search from '../../ui/Search/search.ui';
import {styles as chatStyles} from './chats.style';
import {API} from '../../../config';
import errorLoad from '../../assets/animations/error.json';
import empty from '../../assets/animations/empty.json';
import Lottie from '../../ui/Lottie/lottie.ui';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

interface OtherParticipant {
  user: string;
  photo: string;
  fullName: string;
}

export default function Chats() {
  const navigation = useNavigation();
  const {chats} = useChats();
  const {authState} = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {colors, dark} = useScheme();
  const styles = chatStyles();

  const filteredChats = useMemo(() => {
    if (!searchQuery) return chats;

    return chats.filter(chat => {
      const otherParticipant = chat.participantDetails.find(
        (participant: OtherParticipant) => participant.user !== authState?._id,
      );
      return otherParticipant.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [chats, authState, searchQuery]);

  filteredChats.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const renderItem = ({item}: {item: Chat}) => {
    const otherParticipant = item.participantDetails.find(
      (participant: OtherParticipant) => participant.user !== authState?._id,
    );

    return (
      <TouchableOpacity
        style={styles.chatCont}
        onPress={() => navigation.navigate('Chat', {otherParticipant})}>
        <FastImage
          source={{uri: `${API}${otherParticipant.photo}`}}
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
  const gradientColors = useMemo(() => {
    return dark === true
      ? ['#0C1D1E', '#0A1213']
      : [colors.background, colors.background];
  }, [dark, colors]);
  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <Text style={styles.title}>Чаты</Text>
      <Search
        containerStyle={{marginTop: 20}}
        value={searchQuery}
        onChange={setSearchQuery}
      />
      {filteredChats.length === 0 ? (
        <Lottie
          source={empty}
          width={200}
          height={200}
          style={{alignSelf: 'center', marginTop: 100}}
        />
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </LinearGradient>
  );
}
