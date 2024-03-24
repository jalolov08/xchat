import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles as aboutStyles} from './aboutContact.style';
import HeaderBack from '../../ui/HeaderBack/headerBack.ui';
import {API} from '../../../config';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import { useScheme } from '../../contexts/ThemeContext/theme.context';
export default function AboutContact({route, navigation}) {
  const {user, contact} = route.params;
  const styles = aboutStyles();
  const {colors} = useScheme()
  return (
    <View style={styles.container}>
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
          <Text style={styles.contactName}>{contact.displayName}</Text>
          <Text style={styles.contactPhone}>
            {contact.phoneNumbers[0].number}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.optionCont}>
        <Text style={styles.optionText}>Перейти в чат</Text>
        <Icon
          type={Icons.Ionicons}
          name="chatbox-outline"
          color={colors.accent}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionCont}>
        <Text style={styles.optionText}>Очистить чат</Text>
        <Icon
          type={Icons.Ionicons}
          name="trash-outline"
          color={colors.accent}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionCont}>
        <Text style={styles.optionText}>Заблокировать</Text>
        <Icon
          type={Icons.Ionicons}
          name="hand-left-outline"
          color={colors.accent}
        />
      </TouchableOpacity>
    </View>
  );
}
