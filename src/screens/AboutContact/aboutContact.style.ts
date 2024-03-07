import {StyleSheet} from 'react-native';
import {darkColors} from '../../constants/darkColors.constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
  },
  contactCont: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: darkColors.border,
    borderBottomWidth: 1,
  },
  contactPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  contactName: {
    fontSize: 24,
    fontWeight: '600',
    color: darkColors.text,
  },
  contactPhone: {
    fontSize: 17,
    color: darkColors.placeHolder,
  },
  optionCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomColor: darkColors.border,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 17,
    color: darkColors.text,
    fontWeight: '400',
  },
});
