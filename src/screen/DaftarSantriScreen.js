import {createStackNavigator} from '@react-navigation/stack';
import {DaftarSantri} from '../components';

const Stack = createStackNavigator();

export const DaftarSantriScreen = ({props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DaftarSantriScreen"
        component={DaftarSantri}
        options={{
          headerShown: false,
          headerTitle: 'Jogo Santri Kabupaten Demak',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
