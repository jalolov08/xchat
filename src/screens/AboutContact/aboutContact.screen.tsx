import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo} from 'react';
import {styles as aboutStyles} from './aboutContact.style';
import HeaderBack from '../../ui/HeaderBack/headerBack.ui';
import {API, API_BASE} from '../../../config';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import axios from 'axios';
import useBlockedUsers from '../../zustand/useBlockedUsers';
import {useBlockUser} from '../../hooks/useBlockUser';
import LinearGradient from 'react-native-linear-gradient';
export default function AboutContact({route, navigation}) {
  const {user, contact} = route.params;
  const styles = aboutStyles();
  const {colors, dark} = useScheme();
  const {isUserBlocked} = useBlockedUsers();
  const {blockUser, isLoading} = useBlockUser();
  const modifiedUser = {
    _id: user._id,
    fullName: `${user.name} ${user.surname}`,
    photo: user.photoUri,
    user: user._id,
    phone: user.phone,
  };
  const handleChatDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE}/chat/delete/all/${user._id}`,
      );
      console.log(response.data);
      Alert.alert(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      Alert.alert(error.response.data.message);
    }
  };
  const gradientColors = useMemo(() => {
    return dark === true
      ? ['#0C1D1E', '#0A1213']
      : [colors.background, colors.background];
  }, [dark, colors]);
  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <HeaderBack
        title="О контакте"
        backIcon={true}
        rightIconName="create-outline"
        onRightIconClick={() =>
          navigation.navigate('EditContact', {contact, user})
        }
      />
      <View style={styles.contactCont}>
        <Image
          source={{uri: `${API}${user.photoUri}`}}
          style={styles.contactPhoto}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.contactName} numberOfLines={1}>
            {contact.displayName}
          </Text>
          <Text style={styles.contactPhone}>
            {contact.phoneNumbers[0].number}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.optionCont}
        onPress={() =>
          navigation.navigate('Chat', {otherParticipant: modifiedUser})
        }>
        <Text style={styles.optionText}>Перейти в чат</Text>
        <Icon
          type={Icons.Ionicons}
          name="chatbox-outline"
          color={colors.accent}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionCont} onPress={handleChatDelete}>
        <Text style={styles.optionText}>Очистить чат</Text>
        <Icon
          type={Icons.Ionicons}
          name="trash-outline"
          color={colors.accent}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionCont}
        onPress={() => blockUser(user._id)}>
        <Text style={styles.optionText}>
          {isUserBlocked(user._id) ? 'Разблокировать' : 'Заблокировать'}
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.accent} />
        ) : (
          <Icon
            type={Icons.Ionicons}
            name="hand-left-outline"
            color={colors.accent}
          />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}
