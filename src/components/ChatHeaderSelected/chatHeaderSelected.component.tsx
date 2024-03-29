import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import useSelect from '../../zustand/useSelect';
import {useDeleteMessages} from '../../hooks/useDeleteMessages';

const ChatHeaderSelected = () => {
  const {colors} = useScheme();
  const {clearSelection} = useSelect();
  const {deleteMessages, error} = useDeleteMessages();
  const styles = StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      padding: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => clearSelection()}>
        <Icon
          type={Icons.Ionicons}
          name="close-outline"
          color={colors.text}
          size={28}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          deleteMessages(), clearSelection();
        }}>
        <Icon
          type={Icons.Ionicons}
          name="trash-outline"
          color={'red'}
          size={28}
        />
      </Pressable>
    </View>
  );
};

export default ChatHeaderSelected;
