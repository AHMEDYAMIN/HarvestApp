import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './android/app/src/Screens/Components/LoginScreen';
import MutualFundsScreen from './android/app/src/Screens/Components/MutualFundsScreen';
import store from './android/app/src/store';
import Toast from 'react-native-toast-message';
import ProtectedRoute from './android/app/src/Screens/Components/ProtectedRoute';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MutualFunds"
            options={{ headerShown: false }}
          >
            {props => (
              <ProtectedRoute {...props}>
                <MutualFundsScreen {...props} />
              </ProtectedRoute>
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
