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

      // Regex para quebrar a data do Git
      const pattern = /(\w{3}) (\w{3}) (\d{1,2}) (\d{2}:\d{2}:\d{2}) (\d{4})/;

      const match = raw.match(pattern);

      if (match) {
        const [, , monthStr, day, time, year] = match;

        // Meses para converter para número
        const months = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3,
          May: 4, Jun: 5, Jul: 6, Aug: 7,
          Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };

        const month = months[monthStr];

        // Criar data válida
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
          
          <Text style={styles.title}>Sobre o Evolui+</Text>

          <Text style={styles.description}>
            O <Text style={styles.bold}>Evolui+</Text> é um aplicativo criado para ajudar profissionais
            no desenvolvimento contínuo, oferecendo trilhas, cursos e conteúdos
            educativos feitos para impulsionar sua carreira com praticidade e inovação.
          </Text>

          {/* Versão */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Versão do Aplicativo</Text>
            <Text style={styles.cardValue}>1.0.0</Text>
          </View>

          {/* Commit */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Commit Atual</Text>
            <Text style={styles.hash}>{commit.hash}</Text>

            <Text style={[styles.cardTitle, { marginTop: 10 }]}>Data do Commit</Text>
            <Text style={styles.cardValue}>{commit.date}</Text>
          </View>

          {/* Autor */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Desenvolvido por</Text>
            <Text style={styles.cardValue}>
              Davi Alves de Lima{"\n"}
              <Text style={styles.smallText}>
                Curso: Desenvolvimento de Software Multiplataforma
              </Text>
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
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  container: {
    padding: 24,
    paddingTop: 70,
  },

  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    color: '#E0E0E0',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },

  bold: {
    fontWeight: 'bold',
    color: '#FFF'
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 14,
    padding: 18,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#60A5FA',
  },

  cardTitle: {
    fontSize: 16,
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
    color: '#BDBDBD'
  }
});
