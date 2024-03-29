import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {View, ActivityIndicator} from 'react-native';
import useSelect from '../../zustand/useSelect';
import {API} from '../../../config';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import Icon, {Icons} from '../../ui/Icon/icon.ui';

const MessageImage = ({imageUri, isMyMessage, id, date}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {selectItem, selectedItems, deselectItem, clearSelection} = useSelect();
  const isSelect = selectedItems.includes(id);
  const {colors} = useScheme();
  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  const styles = StyleSheet.create({
    container: {
      width: '70%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
      overflow: 'hidden',
      marginVertical: 5,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    loader: {
      position: 'absolute',
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      resizeMode: 'cover',
    },
    errorContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    errorText: {
      color: '#ffffff',
      fontSize: 16,
    },
    dateText: {
      fontSize: 13,
      color: '#fff',
    },
  });

  const handlePress = () => {
    if (isSelect) {
      deselectItem(id);
    } else {
      if (selectedItems.length > 0) {
        selectItem(id);
      }
    }
  };

  const handleLongPress = () => {
    selectItem(id);
  };
  return (
    <Pressable
      onPress={handlePress}
      android_disableSound={true}
      key={id}
      onLongPress={handleLongPress}
      style={{
        backgroundColor: isSelect ? 'hsla(182, 100%, 19%, 0.2)' : 'transparent',
      }}>
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator
            style={styles.loader}
            size="small"
            color="#0000ff"
          />
        )}
        {error ? (
          <TouchableOpacity
            style={styles.errorContainer}
            onPress={() => setError(false)}>
            <Text style={styles.errorText}>
              Error loading image. Tap to retry.
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <Image
              style={styles.image}
              source={{uri: `${API}${imageUri}`}}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 5,
                right: 8,
              }}>
              <Text style={styles.dateText}>{date}</Text>
              {isMyMessage && (
                <Icon
                  type={Icons.Ionicons}
                  name="checkmark-done-outline"
                  color={'#669da0'}
                  size={16}
                  style={{marginLeft: 5}}
                />
              )}
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default MessageImage;
