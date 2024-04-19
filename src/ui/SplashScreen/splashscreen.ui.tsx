import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import lightAnimation from '../../assets/animations/light.json';
import darkAnimation from '../../assets/animations/dark.json';
import { useScheme } from '../../contexts/ThemeContext/theme.context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SplashScreenProps {
  onAnimationFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationFinish }) => {
  const { dark } = useScheme();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    AsyncStorage.getItem('theme').then(theme => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  const animationSource = dark ? darkAnimation : lightAnimation;

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <LottieView
        style={{ width: '100%', height: '100%' }}
        source={animationSource}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
        resizeMode="cover"
        speed={4}
      />
    </View>
  );
};
export default SplashScreen;
