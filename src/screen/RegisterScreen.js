import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cep, setCep] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!cpf || !birthDate || !cep || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    Alert.alert('Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/Register.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Crie sua conta </Text>

            <TextInput
              style={styles.input}
              placeholder="CPF"
              keyboardType="numeric"
              placeholderTextColor="#e0e0e0"
              value={cpf}
              onChangeText={setCpf}
            />

            <TextInput
              style={styles.input}
              placeholder="Data de nascimento (DD/MM/AAAA)"
              keyboardType="numeric"
              placeholderTextColor="#e0e0e0"
              value={birthDate}
              onChangeText={setBirthDate}
            />

            <TextInput
              style={styles.input}
              placeholder="CEP"
              keyboardType="numeric"
              placeholderTextColor="#e0e0e0"
              value={cep}
              onChangeText={setCep}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#e0e0e0"
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>
                Já tem conta?{' '}
                <Text style={styles.linkHighlight}>Faça login</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  linkText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 18,
    textAlign: 'center',
  },
  linkHighlight: {
    color: '#4da6ff',
    fontWeight: 'bold',
  },
});
