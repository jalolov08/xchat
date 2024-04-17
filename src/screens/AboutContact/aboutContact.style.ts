import {StyleSheet} from 'react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';

export const styles = () => {
  const {colors} = useScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contactCont: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    contactPhoto: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    contactName: {
      paddingRight: 40,
      fontSize: 24,
      fontWeight: '600',
      color: colors.text,
    },
    contactPhone: {
      fontSize: 17,
      color: colors.placeHolder,
    },
    optionCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    optionText: {
      fontSize: 17,
      color: colors.text,
      fontWeight: '400',
    },
  });
};
