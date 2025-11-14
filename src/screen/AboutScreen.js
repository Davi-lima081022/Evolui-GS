import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { getCommitInfo } from '../utils/commit';

export default function AboutScreen() {
  const [commit, setCommit] = useState({ hash: "Carregando...", date: "Carregando..." });

  useEffect(() => {
    getCommitInfo().then(info => setCommit(info));
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/Knowledge.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <Text style={styles.title}>Sobre o App</Text>

          <Text style={styles.text}>
            O **Evolui+** é um aplicativo desenvolvido para  ajudar profissionais
            no desenvolvimento contínuo de suas habilidades, oferecendo trilhas,
            cursos, treinamentos e conteúdos Critivos.
          </Text>

          <Text style={styles.sectionTitle}>Versão</Text>
          <Text style={styles.text}>1.0.0</Text>

          <Text style={styles.sectionTitle}>Commit de Referência</Text>
          <Text style={styles.hash}>{commit.hash}</Text>

          <Text style={styles.sectionTitle}>Data do Commit</Text>
          <Text style={styles.text}>{commit.date}</Text>

          <Text style={styles.sectionTitle}>Desenvolvido por</Text>
          <Text style={styles.text}>
            Davi Alves de Lima{"\n"}
            Aluno do curso de Desenvolvimento de Software Multiplataforma
          </Text>

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
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  container: {
    padding: 24,
    paddingTop: 70,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  text: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
    lineHeight: 22,
  },
  hash: {
    color: '#60A5FA',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '700',
  },
});
