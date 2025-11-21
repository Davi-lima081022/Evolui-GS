import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ImageBackground 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ProgressScreen({ route }) {
  const selectedProfessions = route.params?.selectedProfessions || [];

  const [completedCourses, setCompletedCourses] = useState(0);
  const [completedLectures, setCompletedLectures] = useState(0);
  const [completedTrainings, setCompletedTrainings] = useState(0);

  const LECTURES_KEY = `LECTURES_DONE_${selectedProfessions.join("_") || "ALL"}`;

  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        try {
          const savedCourses = await AsyncStorage.getItem('completedCourses');
          setCompletedCourses(savedCourses ? JSON.parse(savedCourses).length : 0);

          const savedLectures = await AsyncStorage.getItem(LECTURES_KEY);
          setCompletedLectures(savedLectures ? JSON.parse(savedLectures).length : 0);

          const savedTrainings = await AsyncStorage.getItem('TRAININGS_DONE');
          setCompletedTrainings(savedTrainings ? JSON.parse(savedTrainings).length : 0);
        } catch (error) {
          console.log("Erro ao carregar progresso:", error);
        }
      };
      loadProgress();
    }, [LECTURES_KEY])
  );

  const coursePercentage = Math.min(completedCourses * 20, 100);
  const lecturePercentage = Math.min(completedLectures * 20, 100);
  const trainingPercentage = Math.min(completedTrainings * 20, 100);

  const progress = [
    { title: 'Cursos Concluídos', icon: 'checkmark-done-outline', percentage: coursePercentage },
    { title: 'Palestras Concluídas', icon: 'mic-outline', percentage: lecturePercentage },
    { title: 'Treinamentos Concluídos', icon: 'school-outline', percentage: trainingPercentage },
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
          <Text style={styles.subtitle}>Acompanhe sua evolução ao longo da sua jornada</Text>

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
                  <View style={[styles.progressBarFill, { width: `${item.percentage}%` }]} />
                </View>

                <Text style={styles.percentageText}>{item.percentage}%</Text>
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
  title: { fontSize: 30, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#E5E5E5', textAlign: 'center', marginBottom: 35 },
  card: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  progressBarBackground: { width: '100%', height: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: 10 },
  percentageText: { marginTop: 6, fontSize: 14, fontWeight: '600', color: '#EDEDED' },
});
