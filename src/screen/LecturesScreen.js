import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CoursesScreen() {
  const courses = [
    { title: 'Introdução à Programação', desc: 'Aprenda lógica de programação e dê os primeiros passos no mundo da tecnologia.' },
    { title: 'Excel Avançado', desc: 'Domine planilhas, gráficos e automações para o mercado corporativo.' },
    { title: 'Marketing Digital', desc: 'Aprenda estratégias para divulgar produtos e serviços nas redes sociais.' },
    { title: 'Finanças Pessoais', desc: 'Descubra como organizar seu dinheiro e investir com segurança.' },
  ];

  return (
    <ImageBackground 
      source={require('../../assets/Knowledge.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Cursos</Text>
          <Text style={styles.subtitle}>Aprofunde seus conhecimentos e desenvolva novas competências</Text>

          {courses.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} activeOpacity={0.9}>
              <Ionicons name="book-outline" size={30} color="#fff" style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: 25,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginRight: 18,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  cardDescription: {
    fontSize: 14,
    color: '#DADADA',
    marginTop: 4,
  },
});
