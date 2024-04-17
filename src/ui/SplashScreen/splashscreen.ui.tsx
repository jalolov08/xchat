import React from 'react';
import {View} from 'react-native';
import lightAnimation from '../../assets/animations/light.json';
import darkAnimation from '../../assets/animations/dark.json';

import LottieView from 'lottie-react-native';
import {useScheme} from '../../contexts/ThemeContext/theme.context';

interface SplashScreenProps {
  onAnimationFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({onAnimationFinish}) => {
  const {dark} = useScheme();
  console.log(dark);

  const animationSource = dark === false ? darkAnimation : lightAnimation;

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <LottieView
        style={{width: '100%', height: '100%'}}
        source={animationSource}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
        resizeMode="cover"
      />
    </View>
  );
};
