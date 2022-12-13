import {createStackNavigator} from '@react-navigation/stack';
import {Pesantren} from '../components';

const Stack = createStackNavigator();

export const PesantrenScreen = ({props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PesantrenScreen"
        component={Pesantren}
        options={{
          headerShown: true,
          headerTitle: 'Daftar Pesantren Kab Demak',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
