import {StyleSheet} from 'react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';

export const styles = () => {
  const {colors} = useScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    image: {
      width: 240,
      height: 240,
      borderRadius: 120,
      borderWidth: 2,
      borderColor: colors.border,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.placeHolder,
    },
    input: {
      fontSize: 19,
      fontWeight: '400',
      color: colors.text,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
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
    },
  });
};
