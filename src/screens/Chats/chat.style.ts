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
  chatCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBlockColor:darkColors.border,
    borderBottomWidth:1
  },
  chatPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatName:{
    fontSize:17,
    color:darkColors.text,
    fontWeight:'500'
  },
  chatLastMessage:{
    fontSize:15,
    color:darkColors.text,
    fontWeight:'300'
  }
});
