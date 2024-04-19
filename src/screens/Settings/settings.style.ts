import {StyleSheet} from 'react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';

export const styles = () => {
  const {colors , dark} = useScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      color: colors.accent,
      fontWeight: '600',
    },
    header: {
      flexDirection: 'row',
      marginTop: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      padding: 16,
    },
    userCont: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    photo: {
      width: 60,
      height: 60,
      borderRadius: 60,
      marginRight: 10,
      backgroundColor:'gray'
    },
    name: {
      color: colors.text,
      fontSize: 24,
      fontWeight: '600',
    },
    phone: {
      color: colors.placeHolder,
      fontSize: 17,
      fontWeight: '500',
    },
    settingsCont: {
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    settingsText: {
      fontSize: 17,
      color: colors.text,
      fontWeight: '400',
    },
    
  });
};
