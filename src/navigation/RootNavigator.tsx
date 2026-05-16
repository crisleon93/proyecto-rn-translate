import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { useSavedStore } from '../stores/savedStore';
import { HomeStackParamList, RootTabParamList } from './types';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SavedScreen from '../screens/SavedScreen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: 'Proyectos' }}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={{ title: 'Detalle del Proyecto' }}
      />
    </HomeStack.Navigator>
  );
}

export default function RootNavigator() {
  // Selector específico del store Zustand
  const savedCount = useSavedStore((state) => state.savedProjects.length);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'list' : 'list-outline';
            } else {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#61DAFB',
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            borderTopColor: COLORS.primaryLight,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{ title: 'Proyectos' }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            title: 'Guardados',
            tabBarBadge: savedCount > 0 ? savedCount : undefined,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}