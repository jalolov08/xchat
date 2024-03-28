import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
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

interface OtherParticipant {
  user: string;
  photo: string;
  fullName: string;
}

export default function Chats() {
  const navigation = useNavigation();
  const {chats} = useChats();
  const {authState} = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const styles = chatStyles();

  const sortChatsByDate = (chats: Chat[]) => {
    return chats.slice().sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  };

  const sortedChats = sortChatsByDate(chats);

  const renderItem = ({item}: {item: Chat}) => {
    const otherParticipant = item.participantDetails.find(
      (participant: OtherParticipant) => participant.user !== authState?._id,
    );
    return (
      <TouchableOpacity
        style={styles.chatCont}
        onPress={() => navigation.navigate('Chat', {otherParticipant})}>
        <Image
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Чаты</Text>
      <Search
        containerStyle={{marginTop: 20}}
        value={searchQuery}
        onChange={setSearchQuery}
      />
      {sortedChats.length === 0 ? (
        <Lottie source={empty} width={200} height={200} style={{alignSelf:'center' , marginTop:100}}/>
      ) : (
        <FlatList
          data={sortedChats}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
}
