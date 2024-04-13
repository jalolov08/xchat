import React from 'react';
import {View} from 'react-native';
import splash from '../../assets/animations/splash.json';
import LottieView from 'lottie-react-native';
interface SplashScreenProps {
  onAnimationFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({onAnimationFinish}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <LottieView
        style={{width: '100%', height: '100%'}}
        source={splash}
        autoPlay={true}
        loop={false}
        onAnimationFinish={onAnimationFinish}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreen;
