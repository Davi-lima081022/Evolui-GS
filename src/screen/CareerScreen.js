import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';

export default function CareerScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [skills, setSkills] = useState('');
  const [showList, setShowList] = useState(false);

  const professions = [
    'Engenheiro de Software',
    'Desenvolvedor Mobile',
    'Analista de Dados',
    'Designer UX/UI',
    'Gerente de Projetos',
    'Engenheiro Civil',
    'Médico',
    'Professor',
    'Advogado',
    'Eletricista',
    'Mecânico',
    'Enfermeiro',
    'Arquiteto',
    'Analista Financeiro',
    'Técnico em Informática',
    'Consultor de Vendas',
    'Marketing Digital',
    'Psicólogo',
  ];

  const filteredProfessions = professions.filter(
    (item) =>
      item.toLowerCase().includes(inputText.toLowerCase()) &&
      !selectedProfessions.includes(item)
  );

  const handleSelectProfession = (item) => {
    setSelectedProfessions([...selectedProfessions, item]);
    setInputText('');
    setShowList(false);
  };

  const handleRemoveProfession = (item) => {
    setSelectedProfessions(selectedProfessions.filter((prof) => prof !== item));
  };

  const handleNext = () => {
    if (selectedProfessions.length === 0) {
      Alert.alert(
        'Atenção ⚠️',
        'Adicione ao menos uma profissão ou experiência antes de continuar.'
      );
      return;
    }
    // Navega para a tela de Objetivos, enviando profissões e habilidades
    navigation.navigate('Objectives', {
      selectedProfessions,
      skills,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/Career.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Monte sua História</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Profissões / Experiências</Text>

              <View style={styles.tagsContainer}>
                {selectedProfessions.map((item, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                    <TouchableOpacity onPress={() => handleRemoveProfession(item)}>
                      <Text style={styles.removeTag}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Digite uma profissão..."
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={inputText}
                onChangeText={(text) => {
                  setInputText(text);
                  setShowList(true);
                }}
                onFocus={() => setShowList(true)}
              />

              {showList && filteredProfessions.length > 0 && (
                <ScrollView style={styles.list} nestedScrollEnabled={true}>
                  {filteredProfessions.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.listItem}
                      onPress={() => handleSelectProfession(item)}
                    >
                      <Text style={styles.listText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <Text style={styles.label}>Habilidades</Text>
            <TextInput
              style={styles.input}
              placeholder="Liste suas principais habilidades..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={skills}
              onChangeText={setSkills}
            />

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextText}>Próximo ➜</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 25, paddingTop: 120 },
  title: { fontSize: 26, fontWeight: '700', color: '#FFF', textAlign: 'center', marginBottom: 35, letterSpacing: 0.5 },
  label: { fontSize: 16, fontWeight: '600', color: '#FFF', marginBottom: 10 },
  inputGroup: { marginBottom: 25 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  tag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  tagText: { color: '#FFF', fontWeight: '500', marginRight: 6 },
  removeTag: { color: '#FF6B6B', fontWeight: 'bold', fontSize: 14 },
  input: { width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', borderRadius: 12, padding: 12, color: '#FFF', backgroundColor: 'rgba(255,255,255,0.15)', fontSize: 15 },
  list: { width: '100%', maxHeight: 160, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 10, marginTop: 5 },
  listItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  listText: { fontSize: 16, color: '#333' },
  nextButton: { backgroundColor: '#FFF', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 30, elevation: 5 },
  nextText: { color: '#007AFF', fontSize: 18, fontWeight: '700' },
});
