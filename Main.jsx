import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import các màn hình tab
import MyScreen from './screens/MyScreen';
import SettingScreen from './screens/SettingScreen';

// Bạn có thể import icon từ thư viện này hoặc bất kỳ thư viện icon nào khác
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Game') {
                iconName = focused ? 'game-controller' : 'game-controller-outline';
            } else if (route.name === 'Setting') {
                iconName = focused ? 'settings' : 'settings-outline';
            }
            // Trả về component icon
            return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'cyan',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Ẩn header mặc định của tab
        })}
    >
        <Tab.Screen name="Game" component={MyScreen} options={{ title: 'Game'}}/>
        <Tab.Screen name="Setting" component={SettingScreen} options={{ title: 'Setting'}}/>
    </Tab.Navigator>
  );
};

export default Main;