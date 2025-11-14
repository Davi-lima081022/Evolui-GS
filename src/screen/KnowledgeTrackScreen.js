import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function KnowledgeTrackScreen({ navigation, route }) {
  // Dados vindos da tela anterior
  const { selectedProfessions, skills, selectedObjectives } = route.params;

  // Conteúdos da trilha (ATUALIZADO)
  const contents = [
    { 
      title: 'Cursos', 
      description: 'Aprofunde seus conhecimentos com cursos teóricos e práticos.', 
      icon: 'book-outline', 
      route: 'Courses' 
    },
    { 
      title: 'Treinamentos', 
      description: 'Desenvolva habilidades práticas para tarefas específicas.', 
      icon: 'construct-outline', 
      route: 'Training' 
    },
    { 
      title: 'Palestras', 
      description: 'Participe de palestras com especialistas e líderes do setor.', 
      icon: 'mic-outline', 
      route: 'Talks' 
    },
    { 
      title: 'Meus Progressos', 
      description: 'Acompanhe sua evolução e trilhas concluídas.', 
      icon: 'bar-chart-outline', 
      route: 'Progress' 
    },
  ];

  // Função de navegação
  const handleNavigation = (route) => {
    navigation.navigate(route, {
      selectedProfessions,
      skills,
      selectedObjectives
    });
  };

  return (
    <ImageBackground 
      source={require('../../assets/Knowledge.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient 
        colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.85)']}
        style={styles.overlay}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Trilha do Conhecimento</Text>
          <Text style={styles.subtitle}>Explore conteúdos e desenvolva suas habilidades</Text>

          {contents.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card} 
              activeOpacity={0.85}
              onPress={() => handleNavigation(item.route)}
            >
              <LinearGradient 
                colors={['#4F46E5', '#6366F1']}
                style={styles.iconContainer}
              >
                <Ionicons name={item.icon} size={26} color="#fff" />
              </LinearGradient>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>

              <Ionicons name="chevron-forward-outline" size={22} color="#fff" />
            </TouchableOpacity>
          ))}
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
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8
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
  cardDescription: { fontSize: 14, color: '#DADADA', marginTop: 4 },
});
