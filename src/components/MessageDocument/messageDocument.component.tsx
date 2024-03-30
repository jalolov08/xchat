import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {API} from '../../../config';
import pdf from '../../assets/PDF.png';
import doc from '../../assets/DOC.png';
import txt from '../../assets/TXT.png';
import docx from '../../assets/DOCX.png';
import xsl from '../../assets/XSL.png';
import ppt from '../../assets/PPT.png';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import Icon, {Icons} from '../../ui/Icon/icon.ui';

const getFileImage = (extension: string) => {
  switch (extension) {
    case 'pdf':
      return pdf;
    case 'doc':
    case 'docx':
      return doc;
    case 'txt':
      return txt;
    case 'xsl':
      return xsl;
    case 'ppt':
      return ppt;
    default:
      return null;
  }
};
export type TMessage = {
  uri: string;
  isMyMessage: boolean;
  id: string;
  date: string;
};
const MessageDocument = ({uri, isMyMessage, id, date}:TMessage) => {
  const filename = uri.split('messages\\')[1];
  const {colors} = useScheme();
  const extension = uri.split('.').pop().trim();
  const [fileImage, setFileImage] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const image = getFileImage(extension);
    setFileImage(image);
  }, []);

  const openDocument = async () => {
    try {
      const downloadsDir =
        Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath
          : RNFS.LibraryDirectoryPath;
      const localFile = `${downloadsDir}/${filename}`;

      const exists = await RNFS.exists(localFile);

      if (exists) {
        await FileViewer.open(localFile);
      } else {
        const options = {
          fromUrl: API + uri,
          toFile: localFile,
        };

        setDownloading(true);

        const downloadResult = await RNFS.downloadFile(options).promise;

        if (downloadResult.statusCode === 200) {
          await FileViewer.open(localFile);
        } else {
          console.error(
            'Error downloading file. Status code:',
            downloadResult.statusCode,
          );
        }
      }
    } catch (error) {
      console.error('Error opening document:', error);
    } finally {
      setDownloading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
      backgroundColor: isMyMessage
        ? colors.messageSender
        : colors.messageReceiver,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      height: 85,
      marginVertical: 5,
      marginHorizontal: 16,
      width: '70%',
      padding: 10,
      flexDirection: 'row',
      overflow: 'hidden',
      justifyContent: 'space-between',
    },
    image: {
      width: 60,
      height: 60,
      resizeMode: 'cover',
      aspectRatio: 1,
      alignSelf: 'center',
    },
    text: {
      color: isMyMessage ? '#fff' : colors.text,
      fontSize: 14,
    },
    date: {
      fontSize: 13,
      color: '#669da0',
    },
  });

  return (
    <Pressable onPress={openDocument}>
      <View style={styles.container} key={id}>
        {downloading ? (
          <ActivityIndicator
            size="small"
            color={colors.text}
            style={{marginLeft: 30}}
          />
        ) : (
          <>{fileImage && <Image source={fileImage} style={styles.image} />}</>
        )}
        <View style={{width: '70%'}}>
          <Text numberOfLines={1} style={styles.text}>
            {filename}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginTop: 30,
            }}>
            <Text style={styles.date}>{date}</Text>
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
        </View>
      </View>
    </Pressable>
  );
};

export default MessageDocument;
