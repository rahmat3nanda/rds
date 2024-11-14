import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SupplierPage from './SupplierPage';
import InventoryPage from './InventoryPage';

const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Supplier" component={SupplierPage} />
      <Tab.Screen name="Inventory" component={InventoryPage} />
    </Tab.Navigator>
  );
};

export default HomePage;
