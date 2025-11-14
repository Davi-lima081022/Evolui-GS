import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LecturesScreen() {
  const lectures = [
    { title: 'Inovação no Mercado Atual', desc: 'Descubra como adaptar sua empresa às novas tendências tecnológicas.' },
    { title: 'Sustentabilidade Empresarial', desc: 'Entenda o papel das empresas na preservação ambiental e no desenvolvimento sustentável.' },
    { title: 'Inteligência Emocional no Trabalho', desc: 'Aprenda a lidar com emoções e melhorar relacionamentos profissionais.' },
    { title: 'Transformação Digital', desc: 'Saiba como usar a tecnologia para otimizar processos e impulsionar resultados.' },
  ];

  const handlePress = (title) => {
    Alert.alert('Palestra Selecionada', `Você escolheu a palestra: ${title}`);
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
          <Text style={styles.subtitle}>
            Participe de palestras inspiradoras e amplie sua visão de mercado
          </Text>

          {lectures.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card} 
              activeOpacity={0.85}
              onPress={() => handlePress(item.title)}
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

              <Ionicons name="arrow-forward-outline" size={22} color="#fff" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E5E5',
    textAlign: 'center',
    marginBottom: 35,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardDescription: {
    fontSize: 14,
    color: '#DADADA',
    marginTop: 4,
  },
});
