import {StyleSheet} from 'react-native';
import {darkColors} from '../../constants/darkColors.constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: darkColors.background,
  },
  title: {
    fontSize: 24,
    color: darkColors.text,
    fontWeight: '600',
    marginTop: 16,
  },

  contact: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: darkColors.border,
    borderBottomWidth: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  fullName: {
    fontSize: 17,
    color: darkColors.text,
    fontWeight: '500',
  },
});
