import React from 'react';
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

export default function TrainingScreen({ route }) {
  const { selectedProfessions } = route.params;

  // 🔥 TODOS OS TREINAMENTOS PARA TODAS AS PROFISSÕES  
  const allTrainings = [
    // ================= ENGENHEIRO DE SOFTWARE =================
    {
      title: 'Arquitetura de Sistemas',
      desc: 'Aprenda padrões, camadas, microsserviços e boas práticas.',
      link: 'https://www.alura.com.br/curso-online-arquitetura-software',
      professions: ['Engenheiro de Software']
    },
    {
      title: 'Git e Versionamento Profissional',
      desc: 'Domine Git, branches, PRs, merge e GitHub Flow.',
      link: 'https://www.coursera.org/learn/introduction-git-github',
      professions: ['Engenheiro de Software', 'Desenvolvedor Mobile', 'Técnico em Informática']
    },

    // ================= DESENVOLVEDOR MOBILE =================
    {
      title: 'React Native do Zero ao Avançado',
      desc: 'Crie apps reais para Android e iOS.',
      link: 'https://www.udemy.com/course/react-native-completo/',
      professions: ['Desenvolvedor Mobile']
    },
    {
      title: 'Publicação de Apps',
      desc: 'Aprenda a publicar apps na Play Store e App Store.',
      link: 'https://www.udemy.com/course/react-native-publicar-app/',
      professions: ['Desenvolvedor Mobile']
    },

    // ================= ANALISTA DE DADOS =================
    {
      title: 'Power BI Completo',
      desc: 'Dashboards, ETL, relatórios profissionais.',
      link: 'https://www.coursera.org/learn/power-bi',
      professions: ['Analista de Dados']
    },
    {
      title: 'Python para Data Science',
      desc: 'Análise, pandas, numpy, machine learning.',
      link: 'https://www.coursera.org/learn/python-data-analysis',
      professions: ['Analista de Dados']
    },

    // ================= DESIGNER UX/UI =================
    {
      title: 'UX Research e Prototipação',
      desc: 'Figma, entrevistas, testes de usabilidade.',
      link: 'https://www.alura.com.br/curso-online-ux-research',
      professions: ['Designer UX/UI']
    },

    // ================= GERENTE DE PROJETOS =================
    {
      title: 'Scrum e Métodos Ágeis',
      desc: 'Aprenda Scrum na prática e conduza squads.',
      link: 'https://www.coursera.org/learn/scrum-introducao',
      professions: ['Gerente de Projetos']
    },
    {
      title: 'Comunicação Eficaz',
      desc: 'Fale com clareza em reuniões e apresentações.',
      link: 'https://www.udemy.com/course/comunicacao-eficaz/',
      professions: ['Gerente de Projetos', 'Consultor de Vendas', 'Marketing Digital']
    },

    // ================= ENGENHEIRO CIVIL =================
    {
      title: 'Gerenciamento de Obras',
      desc: 'Planejamento, execução e controle de obras.',
      link: 'https://www.udemy.com/course/gerenciamento-de-obras/',
      professions: ['Engenheiro Civil']
    },

    // ================= MÉDICO & ENFERMEIRO =================
    {
      title: 'Primeiros Socorros Profissional',
      desc: 'Técnicas de atendimento e emergência.',
      link: 'https://www.coursera.org/learn/first-aid',
      professions: ['Médico', 'Enfermeiro']
    },

    // ================= PROFESSOR =================
    {
      title: 'Didática e Metodologias Ativas',
      desc: 'Crie aulas dinâmicas e envolventes.',
      link: 'https://www.alura.com.br/curso-online-didatica',
      professions: ['Professor']
    },

    // ================= ADVOGADO =================
    {
      title: 'Oratória para Advogados',
      desc: 'Domine argumentação e comunicação jurídica.',
      link: 'https://www.udemy.com/course/oratoria-para-advogados/',
      professions: ['Advogado']
    },

    // ================= ELETRICISTA =================
    {
      title: 'Eletricidade Residencial',
      desc: 'Prática e normas de instalação elétrica.',
      link: 'https://www.senai.br/curso/eletricidade-residencial',
      professions: ['Eletricista']
    },

    // ================= MECÂNICO =================
    {
      title: 'Mecânica Automotiva',
      desc: 'Domine manutenção e diagnóstico de veículos.',
      link: 'https://www.udemy.com/course/mecanica-automotiva/',
      professions: ['Mecânico']
    },

    // ================= ARQUITETO =================
    {
      title: 'Revit e Modelagem 3D',
      desc: 'Domine projetos BIM com Revit.',
      link: 'https://www.udemy.com/course/revit-completo/',
      professions: ['Arquiteto']
    },

    // ================= ANALISTA FINANCEIRO =================
    {
      title: 'Excel Financeiro Avançado',
      desc: 'Domine fórmulas, dashboards e automações.',
      link: 'https://www.coursera.org/learn/excel-advanced',
      professions: ['Analista Financeiro']
    },

    // ================= TÉCNICO EM INFORMÁTICA =================
    {
      title: 'Manutenção de Computadores',
      desc: 'Diagnóstico, reparos e configurações.',
      link: 'https://www.udemy.com/course/manutencao-de-computadores/',
      professions: ['Técnico em Informática']
    },

    // ================= CONSULTOR DE VENDAS =================
    {
      title: 'Técnicas de Vendas e Persuasão',
      desc: 'Aprenda negociação, rapport e fechamento.',
      link: 'https://www.udemy.com/course/tecnicas-de-vendas/',
      professions: ['Consultor de Vendas']
    },

    // ================= MARKETING DIGITAL =================
    {
      title: 'Marketing Digital Completo',
      desc: 'Tráfego, social media, SEO e campanhas.',
      link: 'https://www.udemy.com/course/marketing-digital-para-iniciantes/',
      professions: ['Marketing Digital']
    },

    // ================= PSICÓLOGO =================
    {
      title: 'Psicologia Aplicada',
      desc: 'Técnicas profissionais da área.',
      link: 'https://www.coursera.org/learn/psicologia-aplicada',
      professions: ['Psicólogo']
    },
  ];

  // 🔍 Filtragem baseada nas profissões selecionadas
  const trainings = allTrainings.filter(training =>
    training.professions.some(prof => selectedProfessions.includes(prof))
  );

  const handleOpenLink = (url) => {
    Linking.openURL(url);
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
          <Text style={styles.subtitle}>
            Desenvolva suas habilidades com conteúdos práticos
          </Text>

          {trainings.length === 0 ? (
            <Text style={styles.noContent}>
              Nenhum treinamento disponível para essa profissão.
            </Text>
          ) : (
            trainings.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.card} 
                activeOpacity={0.85}
                onPress={() => handleOpenLink(item.link)}
              >
                <LinearGradient
                  colors={['#4F46E5', '#6366F1']}
                  style={styles.iconContainer}
                >
                  <Ionicons name="construct-outline" size={26} color="#fff" />
                </LinearGradient>

                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.desc}</Text>
                </View>

                <Ionicons name="open-outline" size={22} color="#fff" />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center' },
  container: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 30, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#E5E5E5', textAlign: 'center', marginBottom: 35 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  cardDescription: { fontSize: 14, color: '#DADADA', marginTop: 4 },
  noContent: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 30 }
});
