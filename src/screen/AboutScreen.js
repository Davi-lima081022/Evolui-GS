import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { getCommitInfo } from '../utils/commit';

export default function AboutScreen() {
  const [commit, setCommit] = useState({
    hash: "Carregando...",
    date: "Carregando..."
  });

  useEffect(() => {
    getCommitInfo().then(info => {
      const raw = info.date;
      let formattedDate = "Data inválida";

      const pattern = /(\w{3}) (\w{3}) (\d{1,2}) (\d{2}:\d{2}:\d{2}) (\d{4})/;
      const match = raw.match(pattern);

      if (match) {
        const [, , monthStr, day, time, year] = match;

        const months = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3,
          May: 4, Jun: 5, Jul: 6, Aug: 7,
          Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };

        const month = months[monthStr];
        const parsed = new Date(year, month, day, ...time.split(":"));

        formattedDate = parsed.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      setCommit({
        hash: info.hash,
        date: formattedDate
      });
    });
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/Knowledge.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Sobre o Evoluir+</Text>

          <Text style={styles.description}>
            O <Text style={styles.bold}>Evolui+</Text> é um aplicativo criado para ajudar 
            profissionais no desenvolvimento contínuo, oferecendo trilhas, cursos e conteúdos
            educativos projetados para impulsionar sua carreira com praticidade e inovação.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Versão do Aplicativo</Text>
            <Text style={styles.cardValue}>1.0.0</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Commit Atual</Text>
            <Text style={styles.hash}>{commit.hash}</Text>

            <Text style={[styles.cardTitle, { marginTop: 12 }]}>Data do Commit</Text>
            <Text style={styles.cardValue}>{commit.date}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Desenvolvido por</Text>
            <View style={{ marginTop: 6 }}>
              <Text style={styles.cardValue}>Davi Alves de Lima — RM 556008</Text>
              <Text style={styles.cardValue}>Celina Alcântara do Carmo — RM 558090</Text>
              <Text style={styles.cardValue}>Rodrigo Alcides Bohac Ríos — RM 554826</Text>
            </View>

            <Text style={[styles.smallText, { marginTop: 14 }]}>
              Curso: Análise e Desenvolvimento de Sistemas — Mobile
            </Text>
          </View>

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
    backgroundColor: 'rgba(0,0,0,0.70)',
  },
  container: {
    padding: 26,
    paddingTop: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 0.8,
  },
  description: {
    fontSize: 16,
    color: '#E5E5E5',
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 35,
    paddingHorizontal: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderLeftWidth: 4,
    borderLeftColor: '#60A5FA',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },
  cardValue: {
    fontSize: 15,
    color: '#E0E0E0',
    marginTop: 6,
  },
  hash: {
    color: '#93C5FD',
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
  },
  smallText: {
    fontSize: 13,
    color: '#C7C7C7',
    textAlign: 'left',
  },
});
