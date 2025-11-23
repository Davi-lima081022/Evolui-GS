import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  Alert
} from "react-native";
import api from "../services/api";
import { Ionicons } from "@expo/vector-icons";
const maskCPF = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
};

const maskCEP = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d{1,3})$/, "$1-$2");
};

const maskDate = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 10);
};
const formatDateToBackend = (date) => {
  if (!date.includes("/")) return date;
  const [dia, mes, ano] = date.split("/");
  return `${ano}-${mes}-${dia}`;
};
const isValidCPF = (cpf) => cpf.replace(/\D/g, "").length === 11;

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidDate = (date) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;
  const [d, m, a] = date.split("/").map(Number);
  const dt = new Date(a, m - 1, d);
  return dt && dt.getMonth() + 1 === m && dt.getDate() === d;
};

const isAdult = (birthDate) => {
  const [d, m, a] = birthDate.split("/").map(Number);
  const birth = new Date(a, m - 1, d);
  const today = new Date();
  let age = today.getFullYear() - a;

  if (today.getMonth() < m - 1 || (today.getMonth() === m - 1 && today.getDate() < d)) {
    age--;
  }

  return age >= 14;
};

const isValidCEP = (cep) => cep.replace(/\D/g, "").length === 8;

const isValidPassword = (password) => password.length >= 6;

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !cpf || !birthDate || !cep || !email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (fullName.trim().split(" ").length < 2) {
      Alert.alert("Nome inválido", "Informe nome e sobrenome.");
      return;
    }

    if (!isValidCPF(cpf)) {
      Alert.alert("CPF inválido", "O CPF deve ter 11 dígitos.");
      return;
    }

    if (!isValidDate(birthDate)) {
      Alert.alert("Data inválida", "Informe a data no formato DD/MM/AAAA.");
      return;
    }

    if (!isAdult(birthDate)) {
      Alert.alert("Idade insuficiente", "Você precisa ter pelo menos 14 anos.");
      return;
    }

    if (!isValidCEP(cep)) {
      Alert.alert("CEP inválido", "O CEP deve conter 8 números.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("E-mail inválido", "Informe um e-mail válido.");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert("Senha inválida", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    const payload = {
      nomeCompleto: fullName,
      cpf,
      dataNascimento: formatDateToBackend(birthDate),
      cep,
      email,
      senha: password,
      profissao: "ENGENHEIRO_DE_SOFTWARE",
      habilidades: ["COMUNICACAO"],
      objetivos: ["CONHECER_SOBRE_NOVAS_TECNOLOGIAS"],
    };

    try {
      await api.post("/api/usuarios/cadastro", payload);

      Alert.alert("Sucesso!", "Cadastro realizado!");
      navigation.navigate("Login");

    } catch (error) {
      console.log("ERRO API:", error.response?.data);

      const backendMessage = error.response?.data?.message?.toLowerCase() || "";
      if (backendMessage.includes("email") && backendMessage.includes("cadastrado")) {
        Alert.alert("Conta já cadastrada", "Este e-mail já possui uma conta.");
        return;
      }
      if (backendMessage.includes("cpf") && backendMessage.includes("cadastrado")) {
        Alert.alert("CPF já cadastrado", "Já existe uma conta usando este CPF.");
        return;
      }
      if (backendMessage.length > 0) {
        Alert.alert("Erro", error.response.data.message);
        return;
      }
      Alert.alert("Erro", "Falha ao cadastrar. Tente novamente.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/Register.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Criar Conta</Text>
            <Image source={require("../../assets/Logo.png")} style={styles.logoSmall} />
          </View>
          <Input label="Nome Completo" placeholder="Seu nome e sobrenome" value={fullName} onChangeText={setFullName} />

          <Input label="CPF" placeholder="000.000.000-00" value={cpf} keyboardType="numeric" onChangeText={(t) => setCpf(maskCPF(t))} />

          <Input label="Data de Nascimento" placeholder="DD/MM/AAAA" value={birthDate} keyboardType="numeric" onChangeText={(t) => setBirthDate(maskDate(t))} />

          <Input label="CEP" placeholder="00000-000" value={cep} keyboardType="numeric" onChangeText={(t) => setCep(maskCEP(t))} />

          <Input label="E-mail" placeholder="seuemail@email.com" value={email} keyboardType="email-address" onChangeText={setEmail} />
          <View style={{ marginBottom: 18 }}>
            <Text style={styles.label}>Senha</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#ccc"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={26}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Já tenho uma conta</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const Input = ({ label, ...props }) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholderTextColor="#ccc" {...props} />
  </View>
);
const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 22, paddingTop: 70 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  logoSmall: { width: 45, height: 45, marginLeft: 10 },
  title: { fontSize: 30, fontWeight: "800", color: "#fff" },
  label: { fontSize: 15, fontWeight: "600", color: "#e0e0e0", marginBottom: 6 },

  input: {
    backgroundColor: "rgba(0,0,0,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: "#fff"
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 12,
    paddingRight: 10
  },

  eyeButton: {
    paddingHorizontal: 4,
  },

  button: {
    backgroundColor: "#4c8cff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: { fontSize: 18, color: "#fff", fontWeight: "700" },

  link: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#add8ff",
  },
});
