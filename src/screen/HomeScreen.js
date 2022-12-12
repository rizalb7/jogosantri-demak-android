import {createStackNavigator} from '@react-navigation/stack';
import {Alert, Pressable, Text, View} from 'react-native';
import {Home, Masjid, Oleh, Wisata} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export const HomeScreen = ({props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          headerTitle: 'Jogo Santri Kabupaten Demak',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="WisataScreen"
        component={Wisata}
        options={{
          headerShown: true,
          headerTitle: 'Destinasi Wisata Kab Demak',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="OlehScreen"
        component={Oleh}
        options={{
          headerShown: true,
          headerTitle: 'Oleh - Oleh Kab Demak',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MasjidScreen"
        component={Masjid}
        options={{
          headerShown: true,
          headerTitle: 'Daftar Masjid Kab Demak',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
