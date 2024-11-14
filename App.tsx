import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SupplierFormPage from './src/presentation/pages/SupplierFormPage.tsx';
import HomePage from './src/presentation/pages/HomePage.tsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}} // Hide header to display only bottom tabs in HomePage
        />
        <Stack.Screen
          name="SupplierFormPage"
          component={SupplierFormPage}
          options={{title: 'Supplier Form'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
