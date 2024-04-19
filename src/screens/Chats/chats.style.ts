import {StyleSheet} from 'react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';

export const styles = () => {
  const {colors} = useScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      color: colors.accent,
      fontWeight: '600',
      marginTop: 16,
    },
    chatCont: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    chatPhoto: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: 'gray',
    },
    chatName: {
      fontSize: 17,
      color: colors.text,
      fontWeight: '500',
    },
    chatLastMessage: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '300',
    },
  });
};
