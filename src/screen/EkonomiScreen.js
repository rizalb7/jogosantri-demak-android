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
          headerShown: false,
          headerTitle: 'Jogo Santri Kabupaten Demak',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
