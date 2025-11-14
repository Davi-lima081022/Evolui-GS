import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Telas
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import CareerScreen from './src/screen/CareerScreen';
import ObjectivesScreen from './src/screen/ObjectivesScreen';
import KnowledgeTrackScreen from './src/screen/KnowledgeTrackScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import TrainingScreen from './src/screen/TrainingScreen';
import CoursesScreen from './src/screen/CoursesScreen';
import ProgressScreen from './src/screen/ProgressScreen';
import TalksScreen from './src/screen/TalksScreen';
import AboutScreen from './src/screen/AboutScreen';

const Stack = createNativeStackNavigator();

const CustomHeader = ({ navigation, back }) => (
  <View
    style={{
      height: 90,
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 10,
    }}
  >
    {back && (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          left: 15,
          bottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons name="chevron-back" size={22} color="#ffffff" />
        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>
          Voltar
        </Text>
      </TouchableOpacity>
    )}

    <TouchableOpacity
      onPress={() => navigation.navigate('About')}
      style={{
        position: 'absolute',
        right: 15,
        bottom: 12,
      }}
    >
      <Ionicons name="information-circle-outline" size={26} color="#ffffff" />
    </TouchableOpacity>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          header: ({ navigation, back }) => (
            <CustomHeader navigation={navigation} back={back} />
          ),
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Career" component={CareerScreen} options={{ title: 'Minha Carreira' }} />
        <Stack.Screen name="Objectives" component={ObjectivesScreen} options={{ title: 'Objetivos Pessoais' }} />

        <Stack.Screen name="KnowledgeTrack" component={KnowledgeTrackScreen} options={{ title: '' }} />
        <Stack.Screen name="Training" component={TrainingScreen} options={{ title: '' }} />
        <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: '' }} />
        <Stack.Screen name="Progress" component={ProgressScreen} options={{ title: '' }} />
        <Stack.Screen name="Talks" component={TalksScreen} options={{ title: '' }} />

        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Sobre o App' }}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Configurações' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
