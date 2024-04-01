import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {styles as changeStyles} from './changeProfile.style';
import HeaderBack from '../../ui/HeaderBack/headerBack.ui';
import userDefault from '../../assets/user.png';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {API, API_BASE} from '../../../config';

export default function ChangeProfile({navigation, route}) {
  const [photoUri, setPhotoUri] = useState(API + route.params.photoUri);
  const [name, setName] = useState(route.params.name);
  const [surname, setSurname] = useState(route.params.surname);
  const styles = changeStyles();
  const [photo, setPhoto] = useState({
    uri: null,
    name: null,
    type: null,
    size: null,
  });

  const ImagePicker = async () => {
    let options = {
      title: 'Select Profile Picture',
      mediaType: 'photo',
      includeBase64: false,
    };
    const photos = await launchImageLibrary(options);
    if (photos && photos.assets && photos.assets.length > 0) {
      setPhotoUri(photos.assets[0].uri);
      setPhoto({
        type: photos.assets?.[0]?.type || '',
        name: photos.assets?.[0]?.fileName || '',
        uri: photos.assets[0].uri,
        size: photos.assets[0].fileSize,
      });
    }
  };

  async function uploadAvatar() {
    try {
      if (!photoUri) {
        console.error('No file selected.');
        return;
      }

      let formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        name: photo.name,
        type: photo.type,
        size: photo.size,
      });

      const response = await axios.post(
        `${API_BASE}/user/upload/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data.url;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSaveChanges = async () => {
    try {
      if (!name) {
        Alert.alert('Please enter your name');
        return;
      }

      const uploadedPhotoUri = await uploadAvatar();
      console.log(name, surname, uploadedPhotoUri);

      const res = await axios.post(`${API_BASE}/user/change`, {
        name,
        surname,
        photoUri: uploadedPhotoUri,
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderBack
        backIcon={true}
        title="Редактировать профиль"
        onRightIconClick={handleSaveChanges}
        rightIconName="checkmark-outline"
      />
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={ImagePicker}
            style={{alignSelf: 'center', marginTop: 20}}>
            {photoUri ? (
              <Image source={{uri: photoUri}} style={styles.image} />
            ) : (
              <Image source={userDefault} style={styles.image} />
            )}
          </TouchableOpacity>
          <View style={{marginTop: 40}}>
            <Text style={styles.inputLabel}>Имя *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={{marginTop: 40}}>
            <Text style={styles.inputLabel}>Фамилия</Text>
            <TextInput
              style={styles.input}
              value={surname}
              onChangeText={text => setSurname(text)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
