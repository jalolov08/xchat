import {StyleSheet} from 'react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';
export const styles = () => {
  const {colors} = useScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
    },
    inputCont: {
      width: '100%',
      backgroundColor: colors.background,
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textInput: {
      width: '82%',
      fontSize: 17,
      color: colors.text,
      marginLeft: 10,
    },
  });
};
