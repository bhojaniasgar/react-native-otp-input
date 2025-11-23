import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image, StatusBar } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import BasicExample from './examples/BasicExample';
import CustomizedExample from './examples/CustomizedExample';
import AutoFillExample from './examples/AutoFillExample';
import SizeVariantsExample from './examples/SizeVariantsExample';
import ErrorStateExample from './examples/ErrorStateExample';
import AdvancedExample from './examples/AdvancedExample';

// Import icons
const homeIcon = require('./assets/home.png');
const paletteIcon = require('./assets/palette.png');
const boltIcon = require('./assets/bolt.png');
const rulerIcon = require('./assets/ruler.png');
const warningIcon = require('./assets/warning.png');
// const settingsIcon = require('./assets/settings.png');

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
    return (
        <SafeAreaProvider style={{
            backgroundColor: "#4A90E2"
        }}>
            <KeyboardProvider>
                <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={{
                            headerShown: false,
                            tabBarActiveTintColor: '#4A90E2',
                            tabBarInactiveTintColor: '#666666',
                            tabBarStyle: {
                                backgroundColor: '#FFFFFF',
                            },
                        }}
                    >
                        <Tab.Screen
                            name="Basic"
                            component={BasicExample}
                            options={{
                                title: 'Basic',
                                tabBarIcon: ({ focused }) => (
                                    <Image
                                        source={homeIcon}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? '#4A90E2' : '#666666'
                                        }}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name="Customized"
                            component={CustomizedExample}
                            options={{
                                title: 'Custom',
                                tabBarIcon: ({ focused }) => (
                                    <Image
                                        source={paletteIcon}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? '#4A90E2' : '#666666'
                                        }}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name="AutoFill"
                            component={AutoFillExample}
                            options={{
                                title: 'Auto-Fill',
                                tabBarIcon: ({ focused }) => (
                                    <Image
                                        source={boltIcon}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? '#4A90E2' : '#666666'
                                        }}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name="Sizes"
                            component={SizeVariantsExample}
                            options={{
                                title: 'Sizes',
                                tabBarIcon: ({ focused }) => (
                                    <Image
                                        source={rulerIcon}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? '#4A90E2' : '#666666'
                                        }}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name="Error"
                            component={ErrorStateExample}
                            options={{
                                title: 'Error',
                                tabBarIcon: ({ focused }) => (
                                    <Image
                                        source={warningIcon}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? '#4A90E2' : '#666666'
                                        }}
                                    />
                                )
                            }}
                        />
                        <Tab.Screen
                            name="Advanced"
                            component={AdvancedExample}
                            options={{
                                title: 'Advanced',
                                tabBarIcon: ({ focused }) => (
                                    <Image
                                        source={warningIcon}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? '#4A90E2' : '#666666'
                                        }}
                                    />
                                )
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </KeyboardProvider>
        </SafeAreaProvider>
    );
}

export default App;