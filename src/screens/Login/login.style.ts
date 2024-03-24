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
    title: {
      fontSize: 27,
      fontWeight: '600',
      color: colors.text,
    },
    subTitle: {
      fontSize: 16,
      color: colors.placeHolder,
      fontWeight: '400',
      lineHeight: 22,
      marginTop: 10,
    },
    textCont: {
      marginTop: '48%',
    },
    privacyCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    privacyText: {
      color: colors.placeHolder,
      fontWeight: '400',
      fontSize: 15,
      width: '90%',
    },
    nextBtn: {
      borderWidth: 1,
      borderColor: colors.accent,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 18,
      marginTop: 40,
    },
    btnText: {
      fontSize: 19,
      color: colors.accent,
      marginRight: 10,
    },
  });
};
