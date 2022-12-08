import {createStackNavigator} from '@react-navigation/stack';
import {Alert, Pressable, Text, View} from 'react-native';
import {Home} from '../components';
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
    </Stack.Navigator>
  );
};
