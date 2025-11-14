import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ObjectivesScreen({ navigation, route }) {
  // Recebendo dados da CareerScreen
  const { selectedProfessions, skills } = route.params;

  const objectives = [
    'Conhecer sobre novas tecnologias',
    'Aprender a usar, na prática',
    'Desenvolver novas habilidades',
    'Autoconhecimento',
  ];

  const [selected, setSelected] = useState([]);

  const toggleSelection = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((obj) => obj !== item) : [...prev, item]
    );
  };

  const canProceed = selected.length > 0;

  const handleNext = () => {
    if (!canProceed) return;
    navigation.navigate('KnowledgeTrack', {
      selectedProfessions,
      skills,
      selectedObjectives: selected,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/Objectives.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
        style={styles.overlay}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🎯 Meus Objetivos Pessoais</Text>
          <Text style={styles.subtitle}>Selecione seus objetivos abaixo:</Text>

          {objectives.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, selected.includes(item) && styles.selectedOption]}
              onPress={() => toggleSelection(item)}
            >
              <Ionicons
                name={selected.includes(item) ? 'checkbox' : 'square-outline'}
                size={28}
                color={selected.includes(item) ? '#1E90FF' : '#ccc'}
              />
              <Text
                style={[
                  styles.optionText,
                  selected.includes(item) && { color: '#fff', fontWeight: '600' },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.nextButton, !canProceed && styles.disabledButton]}
            onPress={handleNext}
            disabled={!canProceed}
          >
            <Text style={styles.nextText}>Próximo ➜</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: { fontSize: 17, color: '#ddd', marginBottom: 30, textAlign: 'center' },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  selectedOption: { borderColor: '#1E90FF', backgroundColor: 'rgba(30,144,255,0.35)' },
  optionText: { fontSize: 16, marginLeft: 10, color: '#eee' },
  nextButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  disabledButton: { backgroundColor: '#6BA8E6', opacity: 0.7 },
  nextText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
