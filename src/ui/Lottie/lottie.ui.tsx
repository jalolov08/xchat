import React from 'react';
import LottieView from 'lottie-react-native';
import {ViewStyle} from 'react-native';

interface LottieProps {
  source: string;
  width: number;
  height: number;
  autoplay?: boolean;
  loop?: boolean;
  style?: ViewStyle;
}

const Lottie: React.FC<LottieProps> = ({
  source,
  width,
  height,
  autoplay = true,
  loop = true,
  style,
}) => {
  return (
    <LottieView
      source={source}
      autoPlay={autoplay}
      loop={loop}
      style={[{width, height}, style]}
    />
  );
};

export default Lottie;
