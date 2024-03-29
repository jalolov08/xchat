import React from 'react';
import {
  Modal,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import file from '../../assets/file.png';

type PickedDocument = {
  uri: string;
  type: string;
  name: string;
  size: number;
};

type TMessageModal = {
  visible: boolean;
  hideModal: () => void;
  handleSubmit: () => void;
  pickedDocument: PickedDocument;
  sending: boolean;
};

const MessageModal: React.FC<TMessageModal> = ({
  visible,
  hideModal,
  handleSubmit,
  pickedDocument,
  sending,
}) => {
  const {colors} = useScheme();

  return (
    <Modal visible={visible} transparent={true} onRequestClose={hideModal}>
      <View style={styles.modalContainer}>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          {pickedDocument?.type.startsWith('image/') ? (
            <Image source={{uri: pickedDocument.uri}} style={styles.image} />
          ) : (
            <FilePreview pickedDocument={pickedDocument} colors={colors} />
          )}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, {borderColor: colors.border ,}]}
              onPress={hideModal}>
              <Text style={[styles.buttonText , {color:colors.text}]}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {borderColor: colors.border}]}
              onPress={handleSubmit}>
              <Text style={[styles.buttonText , {color:colors.text}]}>Отправить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {sending && <Loader colors={colors} />}
    </Modal>
  );
};

const FilePreview: React.FC<{pickedDocument: PickedDocument; colors: any}> = ({
  pickedDocument,
  colors,
}) => {
  const fileSizeInMB = (size: number): string => {
    return (size / 1048576).toFixed(2);
  };
  return (
    <View style={styles.filePreviewContainer}>
      <Image source={file} style={styles.fileIcon} />
      <View>
        <Text style={[styles.fileName, {color: colors.primary}]}>
          {pickedDocument?.name}
        </Text>
        <Text style={[styles.fileSize, {color: colors.accent}]}>
          {' '}
          Size: {fileSizeInMB(pickedDocument?.size)} MB
        </Text>
      </View>
    </View>
  );
};

const Loader: React.FC<{colors: any}> = ({colors}) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '90%',
    paddingVertical: 20,
    zIndex: 100,
    borderRadius: 10,
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  filePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  fileIcon: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  fileName: {
    fontSize: 16,
  },
  fileSize: {},
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 101,
  },
});

export default MessageModal;
