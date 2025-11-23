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

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !cpf || !birthDate || !cep || !email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const payload = {
      nomeCompleto: fullName,
      cpf: cpf,
      dataNascimento: formatDateToBackend(birthDate),
      cep: cep,
      email: email,
      senha: password,
      profissao: "ENGENHEIRO_DE_SOFTWARE",
      habilidades: ["COMUNICACAO"],
      objetivos: ["CONHECER_SOBRE_NOVAS_TECNOLOGIAS"],
    };

    console.log("PAYLOAD:", payload);

    try {
      const response = await api.post("/api/usuarios/cadastro", payload);
      console.log("API RESPONSE:", response.data);

      Alert.alert("Sucesso!", "Cadastro realizado.");
      navigation.navigate("Login");
    } catch (error) {
      console.log("ERRO API:", error.response?.data || error.message);
      Alert.alert("Erro", "Falha ao cadastrar.");
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

            <Image
              source={require("../../assets/Logo.png")}
              style={styles.logoSmall}
            />
          </View>
          <Input
            label="Nome Completo"
            placeholder="Seu nome e sobrenome"
            value={fullName}
            onChangeText={setFullName}
          />

          <Input
            label="CPF"
            placeholder="000.000.000-00"
            value={cpf}
            keyboardType="numeric"
            onChangeText={(t) => setCpf(maskCPF(t))}
          />

          <Input
            label="Data de Nascimento"
            placeholder="DD/MM/AAAA"
            value={birthDate}
            keyboardType="numeric"
            onChangeText={(t) => setBirthDate(maskDate(t))}
          />

          <Input
            label="CEP"
            placeholder="00000-000"
            value={cep}
            keyboardType="numeric"
            onChangeText={(t) => setCep(maskCEP(t))}
          />

          <Input
            label="E-mail"
            placeholder="seuemail@email.com"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <Input
            label="Senha"
            placeholder="Mínimo 6 caracteres"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

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
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    padding: 22,
    paddingTop: 70,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logoSmall: {
    width: 45,
    height: 45,
    marginLeft: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e0e0e0",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4c8cff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#add8ff",
  },
});
