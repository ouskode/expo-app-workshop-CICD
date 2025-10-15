import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Base de données des questions du QCM
const quizData = [
  { question: "Quelle est la capitale de l'Australie ?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswerIndex: 2 },
  { question: "Qui a peint la Joconde ?", options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Léonard de Vinci"], correctAnswerIndex: 3 },
  { question: "Quel est le plus grand océan du monde ?", options: ["Atlantique", "Indien", "Arctique", "Pacifique"], correctAnswerIndex: 3 },
  { question: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?", options: ["1965", "1969", "1972", "1958"], correctAnswerIndex: 1 },
  { question: "Quel est le livre le plus vendu au monde ?", options: ["Le Seigneur des Anneaux", "Don Quichotte", "La Bible", "Harry Potter"], correctAnswerIndex: 2 },
  { question: "Combien de dents un adulte a-t-il normalement ?", options: ["28", "30", "32", "34"], correctAnswerIndex: 2 },
  { question: "Quelle planète est connue comme la 'Planète Rouge' ?", options: ["Vénus", "Mars", "Jupiter", "Saturne"], correctAnswerIndex: 1 },
  { question: "Qui a écrit 'Les Misérables' ?", options: ["Émile Zola", "Gustave Flaubert", "Victor Hugo", "Stendhal"], correctAnswerIndex: 2 },
  { question: "Quel est le plus long fleuve du monde ?", options: ["Le Nil", "L'Amazone", "Le Yangtsé", "Le Mississippi"], correctAnswerIndex: 1 },
  { question: "Quelle est la monnaie officielle du Japon ?", options: ["Yuan", "Won", "Yen", "Baht"], correctAnswerIndex: 2 },
  { question: "Qui a découvert la pénicilline ?", options: ["Marie Curie", "Louis Pasteur", "Alexander Fleming", "Isaac Newton"], correctAnswerIndex: 2 },
  { question: "Dans quel pays se trouve le Taj Mahal ?", options: ["Pakistan", "Népal", "Inde", "Bangladesh"], correctAnswerIndex: 2 },
  { question: "Quel est l'élément chimique le plus abondant dans l'univers ?", options: ["Oxygène", "Hélium", "Carbone", "Hydrogène"], correctAnswerIndex: 3 },
  { question: "Combien de côtés a un hexagone ?", options: ["5", "6", "7", "8"], correctAnswerIndex: 1 },
  { question: "Qui est le réalisateur du film 'Le Parrain' ?", options: ["Martin Scorsese", "Steven Spielberg", "Francis Ford Coppola", "Quentin Tarantino"], correctAnswerIndex: 2 },
  { question: "Quelle est la plus haute montagne du monde ?", options: ["K2", "Mont Everest", "Kangchenjunga", "Lhotse"], correctAnswerIndex: 1 },
  { question: "Quel animal est le symbole de la sagesse dans la culture occidentale ?", options: ["Le serpent", "Le lion", "L'aigle", "La chouette"], correctAnswerIndex: 3 },
  { question: "Qui a inventé l'imprimerie ?", options: ["Johannes Gutenberg", "Galilée", "Marco Polo", "Thomas Edison"], correctAnswerIndex: 0 },
  { question: "Quelle est la formule chimique de l'eau ?", options: ["CO2", "O2", "H2O", "NaCl"], correctAnswerIndex: 2 },
  { question: "Combien de joueurs composent une équipe de football sur le terrain ?", options: ["9", "10", "11", "12"], correctAnswerIndex: 2 },
];

export default function QuizScreen() {
  // États pour gérer la logique du QCM
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Gère la sélection d'une réponse
  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  // Passe à la question suivante ou termine le QCM
  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswerIndex) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };
  
  // Réinitialise le QCM pour recommencer
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsQuizFinished(false);
  };

  // Affichage des résultats
  if (isQuizFinished) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.resultsTitle}>Quiz Terminé !</ThemedText>
        <ThemedText type="subtitle" style={styles.resultsSubtitle}>
          Votre score est de {score} / {quizData.length}
        </ThemedText>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <ThemedText style={styles.buttonText}>Recommencer</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }
  
  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ThemedView style={styles.header}>
                <ThemedText type="subtitle">Question {currentQuestionIndex + 1} / {quizData.length}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.questionContainer}>
                <ThemedText type="title" style={styles.questionText}>{currentQuestion.question}</ThemedText>
            </ThemedView>
            
            {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                key={index}
                style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.selectedOption,
                ]}
                onPress={() => handleSelectAnswer(index)}
                >
                <ThemedText style={styles.optionText}>{option}</ThemedText>
                </TouchableOpacity>
            ))}
            
            <TouchableOpacity
                style={[styles.nextButton, selectedAnswer === null && styles.disabledButton]}
                onPress={handleNextQuestion}
                disabled={selectedAnswer === null}
            >
                <ThemedText style={styles.buttonText}>
                    {currentQuestionIndex === quizData.length - 1 ? 'Terminer' : 'Suivant'}
                </ThemedText>
            </TouchableOpacity>
        </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  questionContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  questionText: {
    textAlign: 'center',
    fontSize: 22,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedOption: {
    borderColor: '#87CEEB',
    backgroundColor: 'rgba(135, 206, 235, 0.3)',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 18,
  },
  nextButton: {
    width: '100%',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Styles pour les résultats
  resultsTitle: {
    marginBottom: 15,
  },
  resultsSubtitle: {
    fontSize: 24,
    marginBottom: 30,
  },
  restartButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
});