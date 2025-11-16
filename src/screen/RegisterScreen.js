import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ========================
// MÁSCARAS
// ========================

const maskCPF = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
};

const maskDate = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1')
    .slice(0, 10);
};

const maskCEP = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
};

// ========================
// VALIDAÇÕES
// ========================

const validateFullName = (name) => name && name.trim().split(" ").length >= 2;

const validateCPF = (cpf) => cpf.replace(/\D/g, '').length === 11;

const validateBirthDate = (birth) => {
  if (!birth || birth.length !== 10) return false;
  const year = parseInt(birth.split("/")[2]);
  return year <= 2007;
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const validatePassword = (password) =>
  /[A-Z]/.test(password) && /\d/.test(password) && password.length >= 6;

const validateCEP = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return !data.erro;
  } catch {
    return false;
  }
};

// =======================================
// COMPONENTE PRINCIPAL
// =======================================

export default function RegisterScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cep, setCep] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (title, msg) => {
    setModalTitle(title);
    setModalMessage(msg);
    setModalVisible(true);
  };

  const handleRegister = async () => {
    let validationErrors = {};

    if (!validateFullName(fullName))
      validationErrors.fullName = "Informe seu nome completo.";

    if (!validateCPF(cpf))
      validationErrors.cpf = "CPF inválido.";

    if (!validateBirthDate(birthDate))
      validationErrors.birthDate = "Data inválida.";

    if (!validateEmail(email))
      validationErrors.email = "E-mail inválido.";

    if (!validatePassword(password))
      validationErrors.password = "A senha deve ter número, letra maiúscula e min. 6 caracteres.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showModal("Dados inválidos", "Revise os campos destacados.");
      return;
    }

    setLoading(true);
    const cepValido = await validateCEP(cep);
    setLoading(false);

    if (!cepValido) {
      setErrors((prev) => ({ ...prev, cep: "CEP não encontrado." }));
      showModal("CEP inválido", "Não foi possível localizar este CEP.");
      return;
    }

    showModal("Cadastro concluído", "Sua conta foi criada com sucesso!");
  };

  return (
    <ImageBackground
      source={require('../../assets/Register.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Criar Conta</Text>

          <Input
            label="Nome Completo"
            placeholder="Seu nome e sobrenome"
            value={fullName}
            onChangeText={setFullName}
            error={errors.fullName}
          />

          <Input
            label="CPF"
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={cpf}
            onChangeText={(t) => setCpf(maskCPF(t))}
            error={errors.cpf}
          />

          <Input
            label="Data de Nascimento"
            placeholder="DD/MM/AAAA"
            value={birthDate}
            onChangeText={(t) => setBirthDate(maskDate(t))}
            keyboardType="numeric"
            error={errors.birthDate}
          />

          <Input
            label="CEP"
            placeholder="00000-000"
            value={cep}
            onChangeText={(t) => setCep(maskCEP(t))}
            keyboardType="numeric"
            error={errors.cep}
          />

          <Input
            label="E-mail"
            placeholder="seuemail@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Senha"
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL PREMIUM */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Ionicons
              name={modalTitle === "Cadastro concluído" ? "checkmark-circle" : "alert-circle"}
              size={60}
              color={modalTitle === "Cadastro concluído" ? "#4caf50" : "#ff4d4d"}
            />

            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                if (modalTitle === "Cadastro concluído") {
                  navigation.navigate("Login");
                }
              }}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

// =======================================
// COMPONENTE INPUT PREMIUM
// =======================================

const Input = ({ label, error, ...props }) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && { borderColor: '#ff4d4d' }]}
      placeholderTextColor="rgba(255,255,255,0.4)"
      {...props}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// =======================================
// ESTILOS PREMIUM
// =======================================

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 22,
    paddingTop: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e0e0e0',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    marginTop: 5,
    color: '#ff4d4d',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#4c8cff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '82%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 18,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 12,
  },
  modalButton: {
    backgroundColor: '#4c8cff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
