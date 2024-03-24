import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatStack from '../ChatStack/chat.stack';
import Icon, {Icons} from '../../ui/Icon/icon.ui'; // Assuming Icon component imports icons
import ContactStack from '../ContactStack/contact.stack';
import SettingsStack from '../SettingsStack/settings.stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useScheme } from '../../contexts/ThemeContext/theme.context';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const {colors} = useScheme()
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
  const visibleRoutes = [
    'AdDetails',
    'Category',
    'SelectBrand',
    'SelectModel',
    'SelectCity',
  ];

  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (visibleRoutes.includes(routeName)) {
      return 'none';
    } else {
      return 'flex';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
          initialRouteName='Login'>
      {tabConfigs.map(tabConfig => (
        <Tab.Screen
          key={tabConfig.name}
          name={tabConfig.name}
          component={tabConfig.component}
          options={{
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
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              borderTopWidth: 1,
              paddingHorizontal: 70,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
