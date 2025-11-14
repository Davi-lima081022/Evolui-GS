// src/screen/ProgressScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ImageBackground 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProgressScreen() {

  // 🔥 Aqui você pode futuramente puxar do backend ou AsyncStorage
  const progress = [
    {
      title: 'Cursos',
      icon: 'book-outline',
      percentage: 70,
    },
    {
      title: 'Treinamentos',
      icon: 'construct-outline',
      percentage: 40,
    },
    {
      title: 'Palestras',
      icon: 'mic-outline',
      percentage: 90,
    },
  ];

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
          
          <Text style={styles.title}>Meu Progresso</Text>
          <Text style={styles.subtitle}>
            Acompanhe sua evolução ao longo da sua jornada
          </Text>

          {progress.map((item, index) => (
            <View key={index} style={styles.card}>

              <LinearGradient 
                colors={['#4F46E5', '#6366F1']}
                style={styles.iconContainer}
              >
                <Ionicons name={item.icon} size={26} color="#fff" />
              </LinearGradient>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${item.percentage}%` }
                    ]}
                  />
                </View>

                <Text style={styles.percentageText}>
                  {item.percentage}%
                </Text>
              </View>
            </View>
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
  title: { fontSize: 30, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', marginBottom: 10, textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 6 },
  subtitle: { fontSize: 16, color: '#E5E5E5', textAlign: 'center', marginBottom: 35 },
  card: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', elevation: 8 },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  progressBarBackground: { width: '100%', height: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: 10 },
  percentageText: { marginTop: 6, fontSize: 14, fontWeight: '600', color: '#EDEDED' },
});
