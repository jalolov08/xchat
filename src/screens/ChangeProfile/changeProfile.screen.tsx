import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {styles as changeStyles} from './changeProfile.style';
import HeaderBack from '../../ui/HeaderBack/headerBack.ui';
import userDefault from '../../assets/user.png';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {API, API_BASE} from '../../../config';
import {useAuth} from '../../contexts/AuthContext/auth.context';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import {BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ChangeProfile({navigation, route}) {
  const [photoUri, setPhotoUri] = useState(
    route?.params.photoUri ? API.concat(route.params.photoUri) : '',
  );
  const back = route?.params.back;
  const [name, setName] = useState(route.params.name);
  const [surname, setSurname] = useState(route.params.surname);
  const styles = changeStyles();
  const [photo, setPhoto] = useState({
    uri: null,
    name: null,
    type: null,
    size: null,
  });
  const {authState, setAuthState} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {colors , dark} = useScheme();
  useEffect(() => {
    if (!back) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove(); 
    }
  }, [back]);

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
    setIsLoading(true);
    try {
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
    } finally {
      setIsLoading(false);
    }
  }

  const handleSaveChanges = async () => {
    try {
      if (!name) {
        Alert.alert('Пожалуйста введите своё имя.');
        return;
      }

      let uploadedPhotoUri = authState?.photoUri;

      if (photo.uri) {
        uploadedPhotoUri = await uploadAvatar();
      }

      setIsLoading(true);

      const res = await axios.post(`${API_BASE}/user/change`, {
        name,
        surname,
        photoUri: uploadedPhotoUri,
      });
      setAuthState({
        ...authState,
        name: name,
        surname: surname,
        photoUri: uploadedPhotoUri,
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const gradientColors = useMemo(() => {
    return dark === true
      ? ['#0C1D1E', '#0A1213']
      : [colors.background, colors.background];
  }, [dark, colors]);
  return (
    <View style={{flex: 1}}>
      <HeaderBack
        backIcon={back}
        title="Редактировать профиль"
        onRightIconClick={handleSaveChanges}
        rightIconName="checkmark-outline"
      />
      <LinearGradient colors={gradientColors} style={styles.container}>
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
      </LinearGradient>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
}
