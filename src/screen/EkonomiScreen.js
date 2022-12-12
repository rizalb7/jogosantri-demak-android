import {createStackNavigator} from '@react-navigation/stack';
import {Ekonomi} from '../components';

const Stack = createStackNavigator();

export const EkonomiScreen = ({props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EkonomiScreen"
        component={Ekonomi}
        options={{
          headerShown: true,
          headerTitle: 'Ekonomi Mikro Pesantren Kab Demak',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
