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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CoursesScreen({ route, navigation }) {
  const { selectedProfessions } = route.params;

  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    checkProfessionChange();
  }, []);
  const checkProfessionChange = async () => {
    try {
      const lastProfession = await AsyncStorage.getItem("lastProfessionCourse");

      if (lastProfession !== JSON.stringify(selectedProfessions)) {
        await AsyncStorage.removeItem("completedCourses");
        setCompletedCourses([]);

        await AsyncStorage.setItem(
          "lastProfessionCourse",
          JSON.stringify(selectedProfessions)
        );

      } else {
        loadCompleted();
      }

    } catch (error) {
      console.log("Erro ao verificar profissão:", error);
    }
  };

  const loadCompleted = async () => {
    try {
      const saved = await AsyncStorage.getItem("completedCourses");
      if (saved) setCompletedCourses(JSON.parse(saved));
    } catch (error) {
      console.log("Erro ao carregar progresso", error);
    }
  };

  const saveCompleted = async (updated) => {
    try {
      await AsyncStorage.setItem("completedCourses", JSON.stringify(updated));
    } catch (error) {
      console.log("Erro ao salvar progresso", error);
    }
  };
  const toggleComplete = (title) => {
    let updated;

    if (completedCourses.includes(title)) {
      updated = completedCourses.filter(c => c !== title);
    } else {
      updated = [...completedCourses, title];
    }

    setCompletedCourses(updated);
    saveCompleted(updated);
  };
  const courseLinks = {
    'Algoritmos e Lógica de Programação': 'https://youtu.be/8mei6uVttho',
    'Arquitetura de Software': 'https://youtu.be/5R3nVaKkF9U',
    'Desenvolvimento Web': 'https://youtu.be/3nYLTiY5skU',
    'Banco de Dados SQL': 'https://youtu.be/HXV3zeQKqGY',
    'DevOps e CI/CD': 'https://youtu.be/ox6xZOrxWYE',

    'React Native Básico': 'https://youtu.be/0-S5a0eXPoc',
    'UX/UI para Apps': 'https://youtu.be/TaBWhb5SPfc',
    'APIs REST na Prática': 'https://youtu.be/ghTrp1x_1As',
    'Git e GitHub': 'https://youtu.be/G2bP8kZHGss',
    'Boas Práticas de Código': 'https://youtu.be/yeu-8YH1gDU',

    'Excel Avançado': 'https://youtu.be/3CL1yDvs7w0',
    'Power BI': 'https://youtu.be/lfG3VvRZp0w',
    'SQL para Análise': 'https://youtu.be/9URM1_2S0uQ',
    'Python para Dados': 'https://youtu.be/Sjgv6C6A9Jw',
    'Storytelling com Dados': 'https://youtu.be/3k8Fz0QpZyM',

    'Fundamentos de UX': 'https://youtu.be/6WVq8yxr3y4',
    'UI Design com Figma': 'https://youtu.be/yj8LS6E7dNw',
    'Design System': 'https://youtu.be/nC0mRYeY4OA',
    'Prototipagem Rápida': 'https://youtu.be/1zMMkQ_tV6A',
    'Testes de Usabilidade': 'https://youtu.be/sy8KsxS3h28',

    'Gestão de Projetos': 'https://youtu.be/0G2VxhV_gJY',
    'Scrum e Kanban': 'https://youtu.be/k-BQK2kFVgU',
    'Liderança e Comunicação': 'https://youtu.be/oeFoKk2heMg',
    'Gestão de Riscos': 'https://youtu.be/JqjHgNsx4aE',
    'OKRs e Métricas': 'https://youtu.be/_fKHzbH5L44',

    'Material de Construção': 'https://youtu.be/6NVf3y6XQI4',
    'Leitura de Plantas': 'https://youtu.be/oYv7FpC18m8',
    'Cálculo Estrutural': 'https://youtu.be/tzVSu2-N2bU',
    'Segurança do Trabalho': 'https://youtu.be/9z7YT1Do1iE',
    'Gestão de Obras': 'https://youtu.be/CuDdGztqKqg',

    'Anatomia Básica': 'https://youtu.be/wy8YI9jYH0w',
    'Primeiros Socorros': 'https://youtu.be/s8VgnOGBeo0',
    'Ética na Medicina': 'https://youtu.be/ggoP508K_0Y',
    'Exames Laboratoriais': 'https://youtu.be/0HGIcivMu2E',
    'Farmacologia Básica': 'https://youtu.be/gKHCMsZV9Z0',

    'Didática Moderna': 'https://youtu.be/K8Q2yXkLAgA',
    'Comunicação em Sala': 'https://youtu.be/tvyEJeZVrYo',
    'Tecnologias Educacionais': 'https://youtu.be/HlB41FsNPtk',
    'Psicologia da Aprendizagem': 'https://youtu.be/cRsWw2X2gYc',
    'Gestão de Turmas': 'https://youtu.be/6QAEyy6AdZg',

    'Introdução ao Direito': 'https://youtu.be/8CqkfNNPJBk',
    'Direito Constitucional': 'https://youtu.be/UiPzM-Lnflk',
    'Direito Penal': 'https://youtu.be/6JtN65WZyXA',
    'Direito Civil': 'https://youtu.be/_o9Bfw_6Fuc',
    'Ética Jurídica': 'https://youtu.be/gYOK1nVnJH8',

    'Instalações Elétricas': 'https://youtu.be/8-FsWaq8npM',
    'Normas de Segurança NR-10': 'https://youtu.be/SGINgQxE9O4',
    'Manutenção Preventiva': 'https://youtu.be/sS-bRMyCV2o',
    'Leitura de Diagramas': 'https://youtu.be/kJzA-vJdh8Q',
    'Circuitos Básicos': 'https://youtu.be/tv-KO0UywLQ',

    'Motores e Componentes': 'https://youtu.be/DnS7KuX3sX0',
    'Sistemas de Freios': 'https://youtu.be/rkQnzp5QCYM',
    'Injeção Eletrônica': 'https://youtu.be/JhnWyJSvLzE',
    'Segurança Operacional': 'https://youtu.be/qsSVqSdz8NA',

    'Cuidados de Enfermagem': 'https://youtu.be/PnOyiUcbRlE',
    'Administração de Medicamentos': 'https://youtu.be/KRNPWVFTt1g',
    'Higiene e Segurança': 'https://youtu.be/V5wHSiWBUZc',
    'Atendimento Humanizado': 'https://youtu.be/rt16vuMJn0o',

    'Fundamentos de Arquitetura': 'https://youtu.be/y6iCEV4nWbk',
    'Design de Interiores': 'https://youtu.be/E4Hncwi1a14',
    'Modelagem 3D': 'https://youtu.be/yx3Od0ERwE0',
    'Sustentabilidade': 'https://youtu.be/_aGLX2UjsF0',
    'Leitura de Plantas': 'https://youtu.be/oYv7FpC18m8',

    'Introdução às Finanças': 'https://youtu.be/ZU2EDb7yDqA',
    'Gestão de Riscos': 'https://youtu.be/JqjHgNsx4aE',
    'Mercado Financeiro': 'https://youtu.be/2FhcO2cS7j4',
    'Análise de Demonstrativos': 'https://youtu.be/QBJSy9FHn5A',

    'Manutenção de Computadores': 'https://youtu.be/AG3Hk-UstK0',
    'Redes de Computadores': 'https://youtu.be/Nec9FfR0v9c',
    'Sistemas Operacionais': 'https://youtu.be/Jy3S2w_kvB8',
    'Segurança da Informação': 'https://youtu.be/9G8xA3F4rZw',
    'Atendimento ao Usuário': 'https://youtu.be/vWaG3VwH8r4',

    'Técnicas de Vendas': 'https://youtu.be/p5AZt0pOEtE',
    'Negociação Eficaz': 'https://youtu.be/5fy4VBFG__s',
    'Marketing Digital': 'https://youtu.be/bmwn0J9nB1k',
    'Comunicação Persuasiva': 'https://youtu.be/pF-Mh-o3A2I',
    'CRM e Relacionamento': 'https://youtu.be/_y4E9O78V6Q',

    'Gestão de Redes Sociais': 'https://youtu.be/8z6Bx9VmQ20',
    'SEO Básico': 'https://youtu.be/gH3oxu9IXHc',
    'Copywriting': 'https://youtu.be/8N9_q5uQBV4',
    'Tráfego Pago': 'https://youtu.be/3fNQCEHoSUk',
    'Funil de Vendas': 'https://youtu.be/Abq92cqCO8w',

    'Psicologia Geral': 'https://youtu.be/LPlJwNDh9zU',
    'Comportamento Humano': 'https://youtu.be/G5wC9fF6ARA',
    'Ética Profissional': 'https://youtu.be/A_uvfn0Yn0U',
    'Psicopatologia': 'https://youtu.be/NMEY0S8mV2Q',
    'Entrevista Clínica': 'https://youtu.be/zRnk0qkHoC8'
  };
  const allCourses = {
    'Engenheiro de Software': [
      'Algoritmos e Lógica de Programação',
      'Arquitetura de Software',
      'Desenvolvimento Web',
      'Banco de Dados SQL',
      'DevOps e CI/CD'
    ],

    'Desenvolvedor Mobile': [
      'React Native Básico',
      'UX/UI para Apps',
      'APIs REST na Prática',
      'Git e GitHub',
      'Boas Práticas de Código'
    ],

    'Analista de Dados': [
      'Excel Avançado',
      'Power BI',
      'SQL para Análise',
      'Python para Dados',
      'Storytelling com Dados'
    ],

    'Designer UX/UI': [
      'Fundamentos de UX',
      'UI Design com Figma',
      'Design System',
      'Prototipagem Rápida',
      'Testes de Usabilidade'
    ],

    'Gerente de Projetos': [
      'Gestão de Projetos',
      'Scrum e Kanban',
      'Liderança e Comunicação',
      'Gestão de Riscos',
      'OKRs e Métricas'
    ],

    'Engenheiro Civil': [
      'Material de Construção',
      'Leitura de Plantas',
      'Cálculo Estrutural',
      'Segurança do Trabalho',
      'Gestão de Obras'
    ],

    'Médico': [
      'Anatomia Básica',
      'Primeiros Socorros',
      'Ética na Medicina',
      'Exames Laboratoriais',
      'Farmacologia Básica'
    ],

    'Professor': [
      'Didática Moderna',
      'Comunicação em Sala',
      'Tecnologias Educacionais',
      'Psicologia da Aprendizagem',
      'Gestão de Turmas'
    ],

    'Advogado': [
      'Introdução ao Direito',
      'Direito Constitucional',
      'Direito Penal',
      'Direito Civil',
      'Ética Jurídica'
    ],

    'Eletricista': [
      'Instalações Elétricas',
      'Normas de Segurança NR-10',
      'Manutenção Preventiva',
      'Leitura de Diagramas',
      'Circuitos Básicos'
    ],

    'Mecânico': [
      'Motores e Componentes',
      'Manutenção Preventiva',
      'Sistemas de Freios',
      'Injeção Eletrônica',
      'Segurança Operacional'
    ],

    'Enfermeiro': [
      'Cuidados de Enfermagem',
      'Administração de Medicamentos',
      'Primeiros Socorros',
      'Higiene e Segurança',
      'Atendimento Humanizado'
    ],

    'Arquiteto': [
      'Fundamentos de Arquitetura',
      'Design de Interiores',
      'Modelagem 3D',
      'Sustentabilidade',
      'Leitura de Plantas'
    ],

    'Analista Financeiro': [
      'Introdução às Finanças',
      'Excel Avançado',
      'Gestão de Riscos',
      'Mercado Financeiro',
      'Análise de Demonstrativos'
    ],

    'Técnico em Informática': [
      'Manutenção de Computadores',
      'Redes de Computadores',
      'Sistemas Operacionais',
      'Segurança da Informação',
      'Atendimento ao Usuário'
    ],

    'Consultor de Vendas': [
      'Técnicas de Vendas',
      'Negociação Eficaz',
      'Marketing Digital',
      'Comunicação Persuasiva',
      'CRM e Relacionamento'
    ],

    'Marketing Digital': [
      'Gestão de Redes Sociais',
      'SEO Básico',
      'Copywriting',
      'Tráfego Pago',
      'Funil de Vendas'
    ],

    'Psicólogo': [
      'Psicologia Geral',
      'Comportamento Humano',
      'Ética Profissional',
      'Psicopatologia',
      'Entrevista Clínica'
    ]
  };
  const courses = [];
  selectedProfessions.forEach(prof => {
    if (allCourses[prof]) {
      allCourses[prof].forEach(c => {
        if (!courses.includes(c)) courses.push(c);
      });
    }
  });

  const goToProgress = () => {
    navigation.navigate("Progress", {
      selectedProfessions,
      completedCourses,
      totalCourses: courses.length
    });
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
          
          <Text style={styles.title}>Cursos</Text>
          <Text style={styles.subtitle}>
            Aprimore seus conhecimentos com cursos práticos e teóricos
          </Text>

          {courses.map((title, index) => (
            <View key={index} style={styles.card}>

              <LinearGradient
                colors={['#4F46E5', '#6366F1']}
                style={styles.iconContainer}
              >
                <Ionicons name="book-outline" size={26} color="#fff" />
              </LinearGradient>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>

                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => Linking.openURL(courseLinks[title])}
                >
                  <Text style={styles.linkText}>Acessar Curso</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.completeButton,
                    completedCourses.includes(title)
                      ? styles.completed
                      : styles.notCompleted
                  ]}
                  onPress={() => toggleComplete(title)}
                >
                  <Text style={styles.completeText}>
                    {completedCourses.includes(title)
                      ? '✔ Concluído'
                      : 'Concluir Curso'}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          ))}

          <TouchableOpacity style={styles.progressButton} onPress={goToProgress}>
            <Text style={styles.progressButtonText}>Ver Meu Progresso</Text>
          </TouchableOpacity>

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

  card: { 
    flexDirection: 'row', 
    alignItems: 'center',
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
    marginRight: 16 
  },

  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },

  linkButton: {
    marginTop: 10,
    backgroundColor: '#6366F1',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },

  linkText: {
    color: '#fff',
    fontWeight: '700'
  },

  completeButton: { 
    marginTop: 12, 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    borderRadius: 12 
  },

  completed: { backgroundColor: '#22c55e' },
  notCompleted: { backgroundColor: '#3b82f6' },

  completeText: { color: '#fff', fontWeight: '700' },

  progressButton: { 
    marginTop: 25, 
    backgroundColor: '#4F46E5', 
    paddingVertical: 14, 
    borderRadius: 14, 
    alignItems: 'center' 
  },

  progressButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700' 
  }
});
