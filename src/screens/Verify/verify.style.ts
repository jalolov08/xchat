import {StyleSheet} from 'react-native';
import {darkColors} from '../../constants/darkColors.constant';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
    padding: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: '600',
    color: darkColors.text,
  },
  subTitle: {
    fontSize: 16,
    color: darkColors.placeHolder,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 10,
  },
  textCont: {
    marginTop: '48%',
  },
  nextBtn: {
    borderWidth: 1,
    borderColor: darkColors.accent,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 40,
  },
  btnText: {
    fontSize: 19,
    color: darkColors.accent,
    marginRight: 10,
  },
});
