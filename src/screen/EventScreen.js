import {createStackNavigator} from '@react-navigation/stack';
import {Event} from '../components';

const Stack = createStackNavigator();

export const EventScreen = ({props}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventScreen"
        component={Event}
        options={{
          headerShown: false,
          headerTitle: 'Jogo Santri Kabupaten Demak',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
