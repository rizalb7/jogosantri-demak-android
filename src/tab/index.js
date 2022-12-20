import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  HomeScreen,
  EventScreen,
  NgajiScreen,
  DaftarSantriScreen,
  EkonomiScreen,
  PesantrenScreen,
} from '../screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
              return (
                <Icon
                  name={iconName}
                  size={30}
                  color={color}
                  style={{marginTop: 2}}
                />
              );
            } else if (route.name === 'PesantrenTab') {
              return (
                <Image
                  style={{width: 32, height: 32, marginTop: 3}}
                  source={require('../../android/app/src/main/assets/icon/icon-pesantren.png')}
                />
              );
            } else if (route.name === 'EventTab') {
              return (
                <Image
                  style={{width: 32, height: 32, marginTop: 3}}
                  source={require('../../android/app/src/main/assets/icon/icon-event.png')}
                />
              );
            } else if (route.name === 'NgajiTab') {
              return (
                <Image
                  style={{width: 32, height: 32, marginTop: 3}}
                  source={require('../../android/app/src/main/assets/icon/icon-ngaji.png')}
                />
              );
            } else if (route.name === 'EkonomiTab') {
              return (
                <Image
                  style={{width: 32, height: 32, marginTop: 3}}
                  source={require('../../android/app/src/main/assets/icon/icon-ekonomi.png')}
                />
              );
            } else if (route.name === 'DaftarSantriTab') {
              iconName = focused ? 'person-add' : 'person-add-outline';
              return (
                <Icon
                  name={iconName}
                  size={30}
                  color={color}
                  style={{marginTop: 3}}
                />
              );
            }
          },
          tabBarActiveTintColor: 'darkcyan',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
              marginBottom: 1,
            },
          }}
        />
        <Tab.Screen
          name="PesantrenTab"
          component={PesantrenScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Pesantren',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
              marginBottom: 1,
            },
            unmountOnBlur: true,
          }}
          listeners={({navigation}) => ({
            blur: () => navigation.setParams({screen: undefined}),
          })}
        />
        <Tab.Screen
          name="EventTab"
          component={EventScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Event',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
              marginBottom: 1,
            },
            unmountOnBlur: true,
          }}
          listeners={({navigation}) => ({
            blur: () => navigation.setParams({screen: undefined}),
          })}
        />
        <Tab.Screen
          name="NgajiTab"
          component={NgajiScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Ngaji',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
              marginBottom: 1,
            },
            unmountOnBlur: true,
          }}
          listeners={({navigation}) => ({
            blur: () => navigation.setParams({screen: undefined}),
          })}
        />
        <Tab.Screen
          name="EkonomiTab"
          component={EkonomiScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Ekonomi',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
              marginBottom: 1,
            },
            unmountOnBlur: true,
          }}
          listeners={({navigation}) => ({
            blur: () => navigation.setParams({screen: undefined}),
          })}
        />
        <Tab.Screen
          name="DaftarSantriTab"
          component={DaftarSantriScreen}
          options={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabel: 'Santri Baru',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
              marginBottom: 1,
            },
            unmountOnBlur: true,
          }}
          listeners={({navigation}) => ({
            blur: () => navigation.setParams({screen: undefined}),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
