import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground, 
  Linking 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

export default function TalksScreen({ route }) {
  const { selectedProfessions = [] } = route.params || {};
  const [completedTalks, setCompletedTalks] = useState([]);

  const STORAGE_KEY = `LECTURES_DONE_${selectedProfessions.join("_") || "ALL"}`;

  const allTalks = [

    // ---------------- ENG. SOFTWARE ----------------
    { title: 'O Futuro da Engenharia de Software', link: 'https://youtu.be/bbLPpYgl7MI', professions: ['Engenheiro de Software'] },
    { title: 'Como se Tornar Engenheiro de Software', link: 'https://youtu.be/I4Gx5jVZcWw', professions: ['Engenheiro de Software'] },
    { title: 'Arquitetura Moderna', link: 'https://youtu.be/3oV9wzE6tDA', professions: ['Engenheiro de Software'] },

    // ---------------- DESENVOLVEDOR MOBILE ----------------
    { title: 'Tendências em Desenvolvimento Mobile', link: 'https://youtu.be/VfGW0Qiy2I0', professions: ['Desenvolvedor Mobile'] },
    { title: 'Como Iniciar no Mobile', link: 'https://youtu.be/bUeWZ9G4pDA', professions: ['Desenvolvedor Mobile'] },
    { title: 'React Native Completo', link: 'https://youtu.be/0-S5a0eXPoc', professions: ['Desenvolvedor Mobile'] },

    // ---------------- ANALISTA DE DADOS ----------------
    { title: 'Introdução a Data Science', link: 'https://youtu.be/ua-CiDNNj30', professions: ['Analista de Dados'] },
    { title: 'Carreira em Data Analytics', link: 'https://youtu.be/o6M7A7wB7i8', professions: ['Analista de Dados'] },
    { title: 'Python p/ Análise de Dados', link: 'https://youtu.be/KzqSDN3mW0Q', professions: ['Analista de Dados'] },

    // ---------------- UX/UI DESIGNER ----------------
    { title: 'UX Design do Zero', link: 'https://youtu.be/uxf0--uiX0I', professions: ['Designer UX/UI'] },
    { title: 'Como Entrar em UX/UI', link: 'https://youtu.be/Uu5q3G9FdZw', professions: ['Designer UX/UI'] },
    { title: 'Design Thinking', link: 'https://youtu.be/6N7Iz-LxB0c', professions: ['Designer UX/UI'] },

    // ---------------- GERENTE DE PROJETOS ----------------
    { title: 'Gestão Moderna de Projetos', link: 'https://youtu.be/HhP3d_r-bBM', professions: ['Gerente de Projetos'] },
    { title: 'Scrum na Prática', link: 'https://youtu.be/9TycLR0TqFA', professions: ['Gerente de Projetos'] },
    { title: 'Alta Performance em Times', link: 'https://youtu.be/WX8LJ2RjJls', professions: ['Gerente de Projetos'] },

    // ---------------- MARKETING DIGITAL ----------------
    { title: 'Marketing Digital Hoje', link: 'https://youtu.be/9uPpZ-R55X4', professions: ['Marketing Digital'] },
    { title: 'Início no Marketing Digital', link: 'https://youtu.be/3ZJj9W-bwR4', professions: ['Marketing Digital'] },
    { title: 'Funil de Vendas Digital', link: 'https://youtu.be/S6xgWwCYV6A', professions: ['Marketing Digital'] },

    // ---------------- ENG. CIVIL ----------------
    { title: 'Como Funcionam Obras Civis', link: 'https://youtu.be/p1_GVyTV84o', professions: ['Engenheiro Civil'] },
    { title: 'Carreira na Engenharia Civil', link: 'https://youtu.be/2nz2tN6D-kI', professions: ['Engenheiro Civil'] },
    { title: 'Fundamentos de Estruturas', link: 'https://youtu.be/VEE0n1SpxsY', professions: ['Engenheiro Civil'] },

    // ---------------- ADVOGADO ----------------
    { title: 'Direito para Iniciantes', link: 'https://youtu.be/kwx9RSPaDPk', professions: ['Advogado'] },
    { title: 'Carreira em Advocacia', link: 'https://youtu.be/l4D-b3cR7TA', professions: ['Advogado'] },
    { title: 'Como Funciona o Direito', link: 'https://youtu.be/VDt8O8i0P_0', professions: ['Advogado'] },

    // ---------------- MÉDICO ----------------
    { title: 'Como é Ser Médico na Prática', link: 'https://youtu.be/Cs6tqBYkPdw', professions: ['Médico'] },
    { title: 'Rotina da Medicina', link: 'https://youtu.be/sKFQNR7LJqE', professions: ['Médico'] },
    { title: 'Profissão Médico', link: 'https://youtu.be/oqKUV5Rfb2A', professions: ['Médico'] },

    // ---------------- ENFERMEIRO ----------------
    { title: 'Carreira na Enfermagem', link: 'https://youtu.be/y2BSSMSmc5I', professions: ['Enfermeiro'] },
    { title: 'Primeiros Socorros Profissional', link: 'https://youtu.be/jKx1WUf_2Nc', professions: ['Enfermeiro'] },
    { title: 'Rotina de Enfermagem', link: 'https://youtu.be/8ZfkWdxzTrI', professions: ['Enfermeiro'] },

    // ---------------- PROFESSOR ----------------
    { title: 'Desafios da Educação Moderna', link: 'https://youtu.be/3R7Gzdh0dXg', professions: ['Professor'] },
    { title: 'Como Ensinar Melhor', link: 'https://youtu.be/AFnB8PrjjWA', professions: ['Professor'] },
    { title: 'Psicologia da Aprendizagem', link: 'https://youtu.be/oT3d5abm-F0', professions: ['Professor'] },

    // ---------------- ELETRICISTA ----------------
    { title: 'Eletricidade Básica', link: 'https://youtu.be/0O3p8Y-VZ-g', professions: ['Eletricista'] },
    { title: 'Carreira de Eletricista', link: 'https://youtu.be/fy3IuN8jY9s', professions: ['Eletricista'] },
    { title: 'Instalações Elétricas', link: 'https://youtu.be/_nbWvDbB88E', professions: ['Eletricista'] },

    // ---------------- MECÂNICO ----------------
    { title: 'Introdução à Mecânica Automotiva', link: 'https://youtu.be/IUe6QIGJK0I', professions: ['Mecânico'] },
    { title: 'Carreira de Mecânico', link: 'https://youtu.be/-BdZBSVhQ2I', professions: ['Mecânico'] },
    { title: 'Como funciona um motor', link: 'https://youtu.be/z2yMBjO6-hY', professions: ['Mecânico'] },

    // ---------------- ARQUITETO ----------------
    { title: 'Introdução à Arquitetura', link: 'https://youtu.be/dnq2EaYLRh8', professions: ['Arquiteto'] },
    { title: 'Carreira em Arquitetura', link: 'https://youtu.be/ERKcU9jwELo', professions: ['Arquiteto'] },
    { title: 'Design Arquitetônico', link: 'https://youtu.be/FfJ-PH1WHaU', professions: ['Arquiteto'] },

    // ---------------- ANALISTA FINANCEIRO ----------------
    { title: 'Finanças para Iniciantes', link: 'https://youtu.be/0vI0q5cDIeE', professions: ['Analista Financeiro'] },
    { title: 'Análise Financeira do Zero', link: 'https://youtu.be/7vZfLT1XVOo', professions: ['Analista Financeiro'] },
    { title: 'Mercado Financeiro Explicado', link: 'https://youtu.be/lFsWna5xZXc', professions: ['Analista Financeiro'] },

    // ---------------- TÉCNICO EM INFORMÁTICA ----------------
    { title: 'Manutenção de Computadores', link: 'https://youtu.be/7TTNf0-tVIs', professions: ['Técnico em Informática'] },
    { title: 'Carreira como Técnico', link: 'https://youtu.be/X0nQ2bjIOs8', professions: ['Técnico em Informática'] },
    { title: 'Redes e Infraestrutura', link: 'https://youtu.be/ALo2lL2cS8A', professions: ['Técnico em Informática'] },

    // ---------------- CONSULTOR DE VENDAS ----------------
    { title: 'Como Vender Melhor', link: 'https://youtu.be/3J1MbSLgIA4', professions: ['Consultor de Vendas'] },
    { title: 'Técnicas de Fechamento', link: 'https://youtu.be/yK9hqwYg7PE', professions: ['Consultor de Vendas'] },
    { title: 'Negociação Profissional', link: 'https://youtu.be/Vlr3Yz1CEPk', professions: ['Consultor de Vendas'] },

    // ---------------- PSICÓLOGO ----------------
    { title: 'Fundamentos da Psicologia', link: 'https://youtu.be/KhpQHmycrQg', professions: ['Psicólogo'] },
    { title: 'Carreira em Psicologia', link: 'https://youtu.be/eGc4V1H_ELY', professions: ['Psicólogo'] },
    { title: 'Neurociência e Comportamento', link: 'https://youtu.be/ywWQ8P5N44I', professions: ['Psicólogo'] },
  ];

  const talks = allTalks.filter(t =>
    t.professions.some(p => selectedProfessions.includes(p))
  );
  useFocusEffect(
    useCallback(() => {
      const loadCompleted = async () => {
        try {
          const saved = await AsyncStorage.getItem(STORAGE_KEY);
          setCompletedTalks(saved ? JSON.parse(saved) : []);
        } catch (e) {
          console.log("Erro ao carregar", e);
        }
      };
      loadCompleted();
    }, [STORAGE_KEY])
  );

  const toggleComplete = async (title) => {
    try {
      const updated =
        completedTalks.includes(title)
          ? completedTalks.filter(t => t !== title)
          : [...completedTalks, title];

      setCompletedTalks(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log("Erro ao salvar", e);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/Knowledge.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient 
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.85)']}
        style={styles.overlay}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Palestras</Text>
          <Text style={styles.subtitle}>Assista conteúdos profissionais</Text>

          {talks.length === 0 ? (
            <Text style={styles.noContent}>Nenhuma palestra disponível para essa profissão.</Text>
          ) : (
            talks.map((item, index) => {
              const
                isDone = completedTalks.includes(item.title);

              return (
                <View key={index} style={styles.card}>
                  <LinearGradient colors={['#4F46E5', '#6366F1']} style={styles.iconContainer}>
                    <Ionicons name="microphone-outline" size={26} color="#fff" />
                  </LinearGradient>

                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>

                    <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.linkButton}>
                      <Text style={styles.linkText}>Assistir Palestra</Text>
                      <Ionicons name="open-outline" size={18} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => toggleComplete(item.title)}
                      style={[styles.completeButton, isDone && styles.completeButtonDone]}
                    >
                      <Text style={styles.completeText}>
                        {isDone ? "Concluída ✔" : "Marcar como Concluída"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 30, fontWeight: '900', color: '#fff', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#ddd', textAlign: 'center', marginBottom: 35 },
  card: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  linkButton: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  linkText: { color: '#A5B4FC', fontSize: 14, marginRight: 6 },
  completeButton: { marginTop: 15, padding: 12, borderRadius: 12, backgroundColor: '#4F46E5', alignItems: 'center' },
  completeButtonDone: { backgroundColor: 'green' },
  completeText: { color: '#fff', fontWeight: '700' },
  noContent: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 30 },
});
