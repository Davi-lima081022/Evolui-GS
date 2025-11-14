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

export default function CoursesScreen({ route }) {
  const { selectedProfessions } = route.params; // Agora recebe corretamente

  // ✅ Cursos associados a cada profissão
  const allCourses = [
    { title: 'Gestão de Projetos', description: 'Aprenda a planejar, executar e gerenciar projetos de forma eficiente.', link: 'https://www.coursera.org/learn/gestao-de-projetos', professions: ['Gerente de Projetos', 'Analista de Dados'] },
    { title: 'Introdução à Programação', description: 'Domine os fundamentos da lógica de programação e linguagens modernas.', link: 'https://www.alura.com.br/formacao-programacao', professions: ['Engenheiro de Software', 'Desenvolvedor Mobile', 'Técnico em Informática'] },
    { title: 'Marketing Digital', description: 'Aprenda a criar estratégias de marketing e presença digital para negócios.', link: 'https://www.udemy.com/course/marketing-digital-para-iniciantes/', professions: ['Marketing Digital', 'Consultor de Vendas'] },
    { title: 'Sustentabilidade e Inovação', description: 'Descubra práticas sustentáveis e inovadoras aplicadas em empresas modernas.', link: 'https://www.escolavirtual.gov.br/curso/198', professions: ['Engenheiro Civil', 'Analista Financeiro', 'Arquiteto'] },
    { title: 'Primeiros Socorros', description: 'Treinamento essencial para profissionais da saúde e segurança.', link: 'https://www.coursera.org/learn/first-aid', professions: ['Médico', 'Enfermeiro'] },
    { title: 'Didática e Metodologia', description: 'Aprimore técnicas de ensino e gestão de sala de aula.', link: 'https://www.alura.com.br/curso-online-didatica', professions: ['Professor'] },
    { title: 'Direito Prático', description: 'Entenda práticas jurídicas essenciais para advogados.', link: 'https://www.coursera.org/learn/direito-pratico', professions: ['Advogado'] },
    { title: 'Eletricidade Residencial', description: 'Curso de prática elétrica para eletricistas.', link: 'https://www.senai.br/curso/eletricidade-residencial', professions: ['Eletricista'] },
    { title: 'Mecânica Automotiva', description: 'Aprenda manutenção e reparos em veículos.', link: 'https://www.udemy.com/course/mecanica-automotiva/', professions: ['Mecânico'] },
    { title: 'Psicologia Aplicada', description: 'Desenvolva técnicas e práticas em psicologia.', link: 'https://www.coursera.org/learn/psicologia-aplicada', professions: ['Psicólogo'] },
    { title: 'UX/UI Design', description: 'Curso completo de design de experiência e interface.', link: 'https://www.alura.com.br/formacao-ux-ui', professions: ['Designer UX/UI'] },
  ];

  const courses = allCourses.filter(course =>
    course.professions.some(prof => selectedProfessions.includes(prof))
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
          <Text style={styles.title}>Cursos</Text>
          <Text style={styles.subtitle}>
            Aprimore seus conhecimentos com cursos práticos e teóricos
          </Text>

          {courses.length === 0 ? (
            <Text style={styles.noCourses}>Nenhum curso disponível para a(s) profissão(ões) selecionada(s)</Text>
          ) : (
            courses.map((course, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.card} 
                activeOpacity={0.85}
                onPress={() => handleOpenLink(course.link)}
              >
                <LinearGradient
                  colors={['#4F46E5', '#6366F1']}
                  style={styles.iconContainer}
                >
                  <Ionicons name="book-outline" size={26} color="#fff" />
                </LinearGradient>

                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{course.title}</Text>
                  <Text style={styles.cardDescription}>{course.description}</Text>
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
  title: { fontSize: 30, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', marginBottom: 10, textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 6 },
  subtitle: { fontSize: 16, color: '#E5E5E5', textAlign: 'center', marginBottom: 35 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  cardDescription: { fontSize: 14, color: '#DADADA', marginTop: 4 },
  noCourses: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 30 }
});
