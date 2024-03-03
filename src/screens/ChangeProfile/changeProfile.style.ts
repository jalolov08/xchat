import {StyleSheet} from 'react-native';
import {darkColors} from '../../constants/darkColors.constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
    padding: 16,
  },
  image: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: darkColors.border,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: darkColors.placeHolder,
  },
  input: {
    fontSize: 19,
    fontWeight: '400',
    color: darkColors.text,
    borderBottomColor: darkColors.border,
    borderBottomWidth: 1,
  },
});
