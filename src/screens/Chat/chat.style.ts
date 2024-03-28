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
      // position: 'absolute',
      // bottom: 0,
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
    replyCont: {
      width: '100%',
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      height: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      paddingHorizontal: 15,
    },
    replyText:{
      fontSize:15,
      color:colors.text,
      opacity:0.4,
      marginLeft:10
    }
  });
};
