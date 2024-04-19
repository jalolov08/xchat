import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient'; // добавлен импорт LinearGradient
import ChatStack from '../ChatStack/chat.stack';
import Icon, {Icons} from '../../ui/Icon/icon.ui';
import ContactStack from '../ContactStack/contact.stack';
import SettingsStack from '../SettingsStack/settings.stack';
import {useScheme} from '../../contexts/ThemeContext/theme.context';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const {colors, dark} = useScheme();
  const tabConfigs = [
    {
      name: 'ContactsStack',
      component: ContactStack,
      icon: 'address-book',
    },
    {
      name: 'ChatsStack',
      component: ChatStack,
      icon: 'comments',
    },
    {
      name: 'SettingsStack',
      component: SettingsStack,
      icon: 'gear',
    },
  ];
  const visibleRoutes = ['Chat', 'AboutContact', 'EditContact'];

  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (visibleRoutes.includes(routeName)) {
      return 'none';
    } else {
      return 'flex';
    }
  };

  const gradientColors = useMemo(() => {
    return dark === true
      ? ['#0C1D1E', '#0A1213']
      : [colors.background, colors.background];
  }, [dark, colors]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      {tabConfigs.map(tabConfig => (
        <Tab.Screen
          key={tabConfig.name}
          name={tabConfig.name}
          component={tabConfig.component}
          options={({route}) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({focused, size}) => (
              <Icon
                type={Icons.FontAwesome}
                name={tabConfig.icon}
                color={focused ? colors.accent : colors.placeHolder}
              />
            ),
            tabBarStyle: {
              height: 70,
              paddingHorizontal: 70,
              display: getTabBarVisibility(route),
            },
            tabBarBackground: () => (
              <LinearGradient
                colors={gradientColors}
                style={{
                  flex: 1,
                }}
              />
            ),
          })}
        />
      ))}
    </Tab.Navigator>
  );
}
