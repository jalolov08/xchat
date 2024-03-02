import {StyleSheet} from 'react-native';
import {lightColors} from '../../constants/lightColors.constant';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    padding: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: '600',
    color: lightColors.text,
  },
  subTitle: {
    fontSize: 16,
    color: lightColors.placeHolder,
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
    color: lightColors.placeHolder,
    fontWeight: '400',
    fontSize: 15,
    width: '90%',
  },
  nextBtn: {
    borderWidth: 1,
    borderColor: lightColors.text,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 40,
  },
  btnText: {
    fontSize: 19,
    color: lightColors.text,
    marginRight: 10,
  },
});
