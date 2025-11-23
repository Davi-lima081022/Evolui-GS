import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ImageBackground,
  Image,
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await api.post('/api/auth/login', {
        email: email,
        senha: password,
      });

      console.log("LOGIN RESPONSE:", response.data);
      if (response.data?.token) {
        await AsyncStorage.setItem('token', response.data.token);
        console.log("TOKEN SALVO:", response.data.token);
      }

      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Career');

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err);

      if (err.response?.status === 403) {
        Alert.alert('Erro', 'Senha incorreta ou usuário não encontrado.');
      } else if (err.response?.status === 404) {
        Alert.alert('Erro', 'Usuário não encontrado.');
      } else if (err.response?.status === 400) {
        Alert.alert('Erro', 'Credenciais inválidas.');
      } else {
        Alert.alert('Erro', 'Não foi possível fazer login.');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Login.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Bem-vindo 👋</Text>
        <Text style={styles.subtitle}>Faça seu login para continuar</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="rgba(255,255,255,0.55)"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 45 }]}
              placeholder="Digite sua senha"
              placeholderTextColor="rgba(255,255,255,0.55)"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

        </View>
        <LinearGradient
          colors={['#1E90FF', '#007AFF']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity onPress={handleLogin} style={styles.buttonInner}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>
            Não tem conta? <Text style={{ fontWeight: 'bold' }}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    width: '70%',
    height: '70%',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: '#dcdcdc',
    marginBottom: 30,
  },

  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },

  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    padding: Platform.OS === 'ios' ? 15 : 12,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },

  passwordWrapper: {
    width: '100%',
    justifyContent: 'center',
  },

  iconButton: {
    position: 'absolute',
    right: 12,
    top: '30%',
    transform: [{ translateY: -12 }],
  },

  button: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 15,
  },

  buttonInner: {
    alignItems: 'center',
    paddingVertical: 14,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  linkText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 10,
  },
});
