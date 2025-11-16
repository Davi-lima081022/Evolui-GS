import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground, 
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrainingScreen({ route }) {

  const { selectedProfessions = [] } = route.params || {};
  const [completedTrainings, setCompletedTrainings] = useState([]);

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const saved = await AsyncStorage.getItem("TRAININGS_DONE");
        if (saved) setCompletedTrainings(JSON.parse(saved));
      } catch (e) {
        console.log("Erro ao carregar TRAININGS_DONE", e);
      }
    };
    loadTrainings();
  }, []);

  // ---------- LISTA DE TREINAMENTOS ----------
  const allTrainings = [

    // TI
    { title: "Arquitetura de Sistemas", desc: "Microsserviços, padrões e camadas.", link: "https://alura.com.br", professions: ["Engenheiro de Software"] },
    { title: "Git e Versionamento Profissional", desc: "Branches, merge e GitHub Flow.", link: "https://www.coursera.org", professions: ["Engenheiro de Software", "Desenvolvedor Mobile", "Técnico em Informática"] },
    { title: "Suporte e Redes", desc: "Infraestrutura, atendimento e redes.", link: "https://www.udemy.com", professions: ["Técnico em Informática"] },
    { title: "React Native Essentials", desc: "Fundamentos para apps mobile.", link: "https://alura.com.br", professions: ["Desenvolvedor Mobile"] },
    { title: "APIs REST e JSON", desc: "Integração entre sistemas.", link: "https://youtube.com", professions: ["Desenvolvedor Mobile", "Engenheiro de Software"] },

    // Dados
    { title: "Introdução ao Data Analytics", desc: "Coleta, análise e visualização.", link: "https://www.google.com", professions: ["Analista de Dados"] },
    { title: "Power BI Profissional", desc: "Dashboards e análise de negócios.", link: "https://www.microsoft.com", professions: ["Analista de Dados", "Analista Financeiro"] },
    { title: "Fundamentos de SQL", desc: "Consultas, joins e modelagem.", link: "https://udemy.com", professions: ["Analista de Dados"] },

    // Design
    { title: "UX Research Básico", desc: "Pesquisa com usuários.", link: "https://alura.com.br", professions: ["Designer UX/UI"] },
    { title: "UI Design com Figma", desc: "Interfaces modernas.", link: "https://www.figma.com", professions: ["Designer UX/UI"] },
    { title: "Prototipação Rápida", desc: "Fluxos e interações.", link: "https://youtube.com", professions: ["Designer UX/UI"] },

    // Gestão
    { title: "Scrum e Métodos Ágeis", desc: "Organização de equipes.", link: "https://www.scrum.org", professions: ["Gerente de Projetos"] },
    { title: "Gestão de Riscos", desc: "Prevenção e controle.", link: "https://www.pmi.org", professions: ["Gerente de Projetos"] },
    { title: "Planejamento Estratégico", desc: "Objetivos e metas.", link: "https://udemy.com", professions: ["Gerente de Projetos"] },

    // Eng. Civil
    { title: "Leitura de Plantas", desc: "Desenhos técnicos.", link: "https://youtube.com", professions: ["Engenheiro Civil"] },
    { title: "Gestão de Obras", desc: "Processos e execução.", link: "https://senai.com.br", professions: ["Engenheiro Civil"] },
    { title: "Materiais de Construção", desc: "Tipos e aplicações.", link: "https://google.com", professions: ["Engenheiro Civil"] },

    // Saúde
    { title: "Atendimento Emergencial", desc: "Protocolos de urgência.", link: "https://youtube.com", professions: ["Médico", "Enfermeiro"] },
    { title: "Boas Práticas Clínicas", desc: "Segurança do paciente.", link: "https://www.gov.br", professions: ["Médico", "Enfermeiro"] },
    { title: "Primeiros Socorros", desc: "Atuação imediata.", link: "https://cruzvermelha.org", professions: ["Enfermeiro"] },

    // Educação
    { title: "Didática Moderna", desc: "Técnicas de ensino.", link: "https://youtube.com", professions: ["Professor"] },
    { title: "Tecnologia na Educação", desc: "Ferramentas digitais.", link: "https://google.com", professions: ["Professor"] },
    { title: "Psicologia da Aprendizagem", desc: "Comportamento do aluno.", link: "https://udemy.com", professions: ["Professor"] },

    // Direito
    { title: "Leis Fundamentais", desc: "Base do direito brasileiro.", link: "https://www.planalto.gov.br", professions: ["Advogado"] },
    { title: "Prática Jurídica", desc: "Rotinas de advocacia.", link: "https://youtube.com", professions: ["Advogado"] },
    { title: "Processos Civis", desc: "Procedimentos legais.", link: "https://google.com", professions: ["Advogado"] },

    // Técnico
    { title: "Instalações Elétricas", desc: "Segurança e execução.", link: "https://senai.com.br", professions: ["Eletricista"] },
    { title: "Manutenção de Motores", desc: "Diagnóstico e reparo.", link: "https://youtube.com", professions: ["Mecânico"] },
    { title: "Plantas e Estruturas", desc: "Fundamentos arquitetônicos.", link: "https://alura.com.br", professions: ["Arquiteto"] },

    // Negócios
    { title: "Negociação e Vendas", desc: "Técnicas comerciais.", link: "https://google.com", professions: ["Consultor de Vendas"] },
    { title: "Marketing Digital Básico", desc: "Estratégias e campanhas.", link: "https://udemy.com", professions: ["Marketing Digital"] },
    { title: "Finanças Pessoais e Corporativas", desc: "Cálculos e análises.", link: "https://youtube.com", professions: ["Analista Financeiro"] },

    // Psicologia
    { title: "Introdução à Psicologia Clínica", desc: "Fundamentos e práticas.", link: "https://google.com", professions: ["Psicólogo"] },
    { title: "Comunicação Terapêutica", desc: "Relação com pacientes.", link: "https://youtube.com", professions: ["Psicólogo"] },
    { title: "Entrevista Psicológica", desc: "Técnicas de avaliação.", link: "https://udemy.com", professions: ["Psicólogo"] },
  ];
  const trainings = allTrainings.filter(t =>
    t.professions.some(p => selectedProfessions.includes(p))
  );
  const toggleTraining = async (title) => {
    let updated = [...completedTrainings];

    if (updated.includes(title)) {
      updated = updated.filter(t => t !== title);
    } else {
      updated.push(title);
    }

    await AsyncStorage.setItem("TRAININGS_DONE", JSON.stringify(updated));
    setCompletedTrainings(updated);
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
          
          <Text style={styles.title}>Treinamentos</Text>
          <Text style={styles.subtitle}>Conteúdos técnicos recomendados</Text>

          {trainings.length === 0 ? (
            <Text style={styles.noContent}>Nenhum treinamento disponível para essa profissão.</Text>
          ) : (
            trainings.map((item, index) => {
              const isDone = completedTrainings.includes(item.title);

              return (
                <View key={index} style={styles.card}>

                  <LinearGradient
                    colors={['#4F46E5', '#6366F1']}
                    style={styles.iconContainer}
                  >
                    <Ionicons name="school-outline" size={26} color="#fff" />
                  </LinearGradient>

                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDescription}>{item.desc}</Text>

                    <TouchableOpacity 
                      onPress={() => Linking.openURL(item.link)}
                      style={styles.linkButton}
                    >
                      <Text style={styles.linkText}>Acessar Conteúdo</Text>
                      <Ionicons name="open-outline" size={18} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => toggleTraining(item.title)}
                      style={[
                        styles.completeButton, 
                        isDone && styles.completeButtonDone
                      ]}
                    >
                      <Text style={styles.completeText}>
                        {isDone ? "Concluído ✔" : "Concluir Treinamento"}
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

  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },

  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  cardDescription: { fontSize: 14, color: '#ccc', marginTop: 4 },

  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  linkText: { color: '#A5B4FC', fontSize: 14, marginRight: 6 },

  completeButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center'
  },
  completeButtonDone: {
    backgroundColor: 'green'
  },
  completeText: {
    color: '#fff',
    fontWeight: '700'
  },

  noContent: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 30 },
});
