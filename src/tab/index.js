import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '../screen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const optionTabScreen = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarLabelStyle: {
      fontSize: 11,
      marginBottom: 1,
    },
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Layanan Publik') {
              iconName = focused ? 'briefcase' : 'briefcase-outline';
            }

            // You can return any component that you like here!
            return (
              <Icon
                name={iconName}
                size={30}
                color={color}
                style={{marginTop: 2}}
              />
            );
          },
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={optionTabScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
