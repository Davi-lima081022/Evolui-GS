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

export default function LecturesScreen({ route }) {
  const { selectedProfessions } = route.params;

  // PALESTRAS COM LINKS REAIS + PROFISSÕES ASSOCIADAS
  const allLectures = [
    {
      title: 'Inovação no Mercado Atual',
      desc: 'Como novas tecnologias moldam o futuro das empresas.',
      link: 'https://www.youtube.com/watch?v=KJjvXc1M5v4',
      professions: ['Engenheiro de Software', 'Gerente de Projetos', 'Marketing Digital']
    },
    {
      title: 'Sustentabilidade Empresarial',
      desc: 'Estratégias para empresas reduzirem impacto ambiental.',
      link: 'https://www.youtube.com/watch?v=z7r6xZ3MzbI',
      professions: ['Engenheiro Civil', 'Arquiteto', 'Analista Financeiro']
    },
    {
      title: 'Inteligência Emocional no Trabalho',
      desc: 'Domine suas emoções e fortaleça relacionamentos.',
      link: 'https://www.youtube.com/watch?v=Y7wG0R4pY6E',
      professions: ['Psicólogo', 'Professor', 'Médico', 'Enfermeiro']
    },
    {
      title: 'Transformação Digital',
      desc: 'Como empresas evoluem com tecnologia.',
      link: 'https://www.youtube.com/watch?v=2kJpKxk0JqY',
      professions: ['Desenvolvedor Mobile', 'Técnico em Informática', 'Marketing Digital']
    },
    {
      title: 'Liderança Moderna',
      desc: 'Os novos modelos de liderança no século XXI.',
      link: 'https://www.youtube.com/watch?v=ReRcHdeUG9Y',
      professions: ['Gerente de Projetos', 'Analista Financeiro', 'Consultor de Vendas']
    },
    {
      title: 'Criatividade e Solução de Problemas',
      desc: 'Como pensar fora da caixa de maneira prática.',
      link: 'https://www.youtube.com/watch?v=fU6n0YjD374',
      professions: ['Designer UX/UI', 'Engenheiro de Software', 'Arquiteto']
    },
    {
      title: 'Comunicação Persuasiva',
      desc: 'Aprenda a falar de forma clara, assertiva e influente.',
      link: 'https://www.youtube.com/watch?v=bW8KjD_0IYQ',
      professions: ['Consultor de Vendas', 'Advogado', 'Professor']
    }
  ];

  // FILTRAGEM PELAS PROFISSÕES SELECIONADAS
  const lectures = allLectures.filter(lecture =>
    lecture.professions.some(prof => selectedProfessions.includes(prof))
  );

  const handleOpenLink = (url) => Linking.openURL(url);

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
          <Text style={styles.subtitle}>
            Conteúdos incríveis, selecionados para sua área
          </Text>

          {lectures.length === 0 ? (
            <Text style={styles.noContent}>
              Nenhuma palestra disponível para as profissões selecionadas.
            </Text>
          ) : (
            lectures.map((item, index) => (
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
                  <Ionicons name="mic-outline" size={26} color="#fff" />
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
  title: { fontSize: 30, fontWeight: '900', color: '#FFF', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#E5E5E5', textAlign: 'center', marginBottom: 35 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  cardDescription: { fontSize: 14, color: '#DADADA', marginTop: 4 },
  noContent: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 20 }
});
