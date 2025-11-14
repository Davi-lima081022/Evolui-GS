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

export default function PartnersScreen() {
  const partners = [
    { 
      name: 'Senai', 
      desc: 'Cursos técnicos e profissionalizantes voltados para a indústria.',
      link: 'https://www.sp.senai.br/'
    },
    { 
      name: 'Sebrae', 
      desc: 'Capacitação e consultorias para empreendedores e pequenos negócios.',
      link: 'https://www.sebrae.com.br/'
    },
    { 
      name: 'Alura', 
      desc: 'Plataforma de cursos online em tecnologia, negócios e inovação.',
      link: 'https://www.alura.com.br/'
    },
    { 
      name: 'Udemy', 
      desc: 'Milhares de cursos online sobre as mais diversas áreas profissionais.',
      link: 'https://www.udemy.com/'
    },
  ];

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
          <Text style={styles.title}>Escolas Parceiras</Text>
          <Text style={styles.subtitle}>
            Descubra instituições que oferecem ensino de qualidade
          </Text>

          {partners.map((item, index) => (
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
                <Ionicons name="school-outline" size={26} color="#fff" />
              </LinearGradient>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.desc}</Text>
              </View>

              <Ionicons name="open-outline" size={22} color="#fff" />
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
