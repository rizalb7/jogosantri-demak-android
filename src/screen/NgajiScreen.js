import {createStackNavigator} from '@react-navigation/stack';
import {Ngaji} from '../components';

const Stack = createStackNavigator();

export const NgajiScreen = ({props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NgajiScreen"
        component={Ngaji}
        options={{
          headerShown: true,
          headerTitle: 'Pengajian Online Kab Demak',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
