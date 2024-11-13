import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SupplierPage from './src/presentation/pages/SupplierPage.tsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SupplierPage" component={SupplierPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
