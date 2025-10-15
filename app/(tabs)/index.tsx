import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Définition des types de sorciers et de leurs descriptions
const wizardTypes = {
  scholar: {
    title: 'Érudit de Poudlard',
    description: "Votre soif de connaissance est insatiable. Sortilèges, histoire de la magie, créatures... rien ne vous échappe. Vous croyez que le savoir est la plus grande des magies.",
  },
  auror: {
    title: 'Auror Intrépide',
    description: "Vous êtes né pour l'action et la défense des autres. Courageux et déterminé, vous n'hésitez pas à vous lancer dans un duel pour protéger le monde des sorciers des forces du mal.",
  },
  magizoologist: {
    title: 'Magizoologiste Passionné',
    description: "Votre cœur bat pour les créatures magiques. Vous avez un lien profond avec la nature et ses habitants, cherchant à les comprendre, les protéger et prendre soin d'eux.",
  },
  potions: {
    title: 'Maître des Potions',
    description: "Précision, patience et subtilité sont vos maîtres mots. Vous comprenez la magie qui se cache dans les ingrédients et savez que le pouvoir d'une potion bien préparée peut surpasser celui de nombreux sortilèges.",
  }
};

// Types pour une meilleure sécurité avec TypeScript
type WizardTypeKey = keyof typeof wizardTypes;

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  answerTypes: WizardTypeKey[];
}

// Base de données des questions, maintenant avec les types de réponses
const quizData: readonly QuizQuestion[] = [
  { question: "Quel est le sortilège pour désarmer un adversaire ?", options: ["Stupéfix", "Avada Kedavra", "Expelliarmus", "Accio"], correctAnswerIndex: 2, answerTypes: ['auror', 'auror', 'auror', 'scholar'] },
  { question: "Quelle maison valorise l'ambition et la ruse ?", options: ["Gryffondor", "Poufsouffle", "Serdaigle", "Serpentard"], correctAnswerIndex: 3, answerTypes: ['auror', 'magizoologist', 'scholar', 'potions'] },
  { question: "Quel est le nom de la chouette de Harry ?", options: ["Coquecigrue", "Hedwige", "Errol", "Hermes"], correctAnswerIndex: 1, answerTypes: ['magizoologist', 'magizoologist', 'magizoologist', 'magizoologist'] },
  { question: "Qui est le 'Prince de Sang-Mêlé' ?", options: ["Tom Jedusor", "Severus Rogue", "Harry Potter", "Albus Dumbledore"], correctAnswerIndex: 1, answerTypes: ['auror', 'potions', 'auror', 'scholar'] },
  { question: "Combien d'Horcruxes Voldemort a-t-il créé intentionnellement ?", options: ["5", "6", "7", "8"], correctAnswerIndex: 1, answerTypes: ['scholar', 'scholar', 'scholar', 'scholar'] },
  { question: "Quel est le poste de Harry dans l'équipe de Quidditch ?", options: ["Batteur", "Poursuiveur", "Gardien", "Attrapeur"], correctAnswerIndex: 3, answerTypes: ['auror', 'auror', 'auror', 'auror'] },
  { question: "Quel ingrédient N'EST PAS dans la potion Polynectar ?", options: ["Corne de bicorne", "Peau de serpent", "Sang de licorne", "Sisymbre"], correctAnswerIndex: 2, answerTypes: ['potions', 'potions', 'magizoologist', 'potions'] },
  { question: "Comment s'appelle le train qui mène à Poudlard ?", options: ["Le Poudlard Express", "Le Magicobus", "L'Express pour Poudlard", "Le Chemin de Traverse Express"], correctAnswerIndex: 0, answerTypes: ['scholar', 'scholar', 'scholar', 'scholar'] },
  { question: "Qui a tué Dobby, l'elfe de maison ?", options: ["Lucius Malefoy", "Voldemort", "Bellatrix Lestrange", "Peter Pettigrow"], correctAnswerIndex: 2, answerTypes: ['auror', 'auror', 'auror', 'auror'] },
  { question: "Quel est le nom de la banque des sorciers ?", options: ["Barjow et Beurk", "Gringotts", "Fleury et Bott", "Ollivander"], correctAnswerIndex: 1, answerTypes: ['potions', 'scholar', 'scholar', 'auror'] },
  { question: "Quel sortilège permet d'ouvrir les serrures ?", options: ["Alohomora", "Wingardium Leviosa", "Lumos", "Reparo"], correctAnswerIndex: 0, answerTypes: ['scholar', 'scholar', 'scholar', 'scholar'] },
  { question: "De quelle créature provient le crin dans la baguette de Harry ?", options: ["Dragon", "Licorne", "Sombral", "Phénix"], correctAnswerIndex: 3, answerTypes: ['magizoologist', 'magizoologist', 'magizoologist', 'magizoologist'] },
  { question: "Quel est le Patronus de Luna Lovegood ?", options: ["Une loutre", "Un cerf", "Un lièvre", "Un cygne"], correctAnswerIndex: 2, answerTypes: ['magizoologist', 'magizoologist', 'magizoologist', 'magizoologist'] },
  { question: "Qui donne à Harry la Carte du Maraudeur ?", options: ["Sirius Black", "Remus Lupin", "Albus Dumbledore", "Fred et George Weasley"], correctAnswerIndex: 3, answerTypes: ['auror', 'scholar', 'scholar', 'potions'] },
  { question: "Quelle est la troisième tâche du Tournoi des Trois Sorciers ?", options: ["Combattre un dragon", "Sauver un ami du lac", "Traverser un labyrinthe", "Répondre à une énigme"], correctAnswerIndex: 2, answerTypes: ['magizoologist', 'auror', 'auror', 'scholar'] },
  { question: "Comment s'appelle le magasin des jumeaux Weasley ?", options: ["Zonko", "Weasley, Farces pour sorciers facétieux", "Le Chaudron Baveur", "Qualité Quidditch"], correctAnswerIndex: 1, answerTypes: ['potions', 'potions', 'scholar', 'auror'] },
  { question: "Quel est le nom complet de Ron Weasley ?", options: ["Ronald Bilius Weasley", "Ronald Arthur Weasley", "Ronald Gideon Weasley", "Ronald Percy Weasley"], correctAnswerIndex: 0, answerTypes: ['scholar', 'scholar', 'scholar', 'scholar'] },
  { question: "Quelle créature garde l'entrée du bureau de Dumbledore ?", options: ["Un Hippogriffe", "Un Centaure", "Une Gargouille", "Un Elfe de maison"], correctAnswerIndex: 2, answerTypes: ['magizoologist', 'magizoologist', 'auror', 'magizoologist'] },
  { question: "Quel philtre d'amour est connu pour sa couleur nacrée ?", options: ["Veritaserum", "Felix Felicis", "Amortentia", "Goutte du Mort-Vivant"], correctAnswerIndex: 2, answerTypes: ['potions', 'potions', 'potions', 'potions'] },
  { question: "Qui a écrit 'Les Animaux Fantastiques' ?", options: ["Albus Dumbledore", "Gilderoy Lockhart", "Rita Skeeter", "Norbert Dragonneau"], correctAnswerIndex: 3, answerTypes: ['scholar', 'auror', 'scholar', 'magizoologist'] },
];

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctScore, setCorrectScore] = useState(0);
  const [wizardTypeScores, setWizardTypeScores] = useState<Record<WizardTypeKey, number>>({ scholar: 0, auror: 0, magizoologist: 0, potions: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [finalResult, setFinalResult] = useState({ title: '', description: '' });

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    // Mise à jour du score de bonnes réponses
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswerIndex) {
      setCorrectScore(prev => prev + 1);
    }

    // Mise à jour des points pour le type de sorcier
    const answerType = quizData[currentQuestionIndex].answerTypes[selectedAnswer];
    setWizardTypeScores(prev => ({ ...prev, [answerType]: prev[answerType] + 1 }));

    setSelectedAnswer(null);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult();
      setIsQuizFinished(true);
    }
  };

  const calculateResult = () => {
    // On trouve le type avec le score le plus élevé
    const topType = (Object.keys(wizardTypeScores) as WizardTypeKey[]).reduce((a, b) => 
      wizardTypeScores[a] > wizardTypeScores[b] ? a : b
    );
    setFinalResult(wizardTypes[topType]);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setCorrectScore(0);
    setWizardTypeScores({ scholar: 0, auror: 0, magizoologist: 0, potions: 0 });
    setSelectedAnswer(null);
    setIsQuizFinished(false);
  };

  if (isQuizFinished) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.resultsTitle}>Vous êtes un...</ThemedText>
        <ThemedText type="subtitle" style={styles.wizardTypeTitle}>{finalResult.title}</ThemedText>
        <ThemedText style={styles.wizardDescription}>{finalResult.description}</ThemedText>
        <ThemedText style={styles.finalScore}>Score de connaissance : {correctScore} / {quizData.length}</ThemedText>
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
                style={[ styles.optionButton, selectedAnswer === index && styles.selectedOption ]}
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
                    {currentQuestionIndex === quizData.length - 1 ? 'Voir mon profil' : 'Suivant'}
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
  header: { marginBottom: 20, alignItems: 'center' },
  questionContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  questionText: { textAlign: 'center', fontSize: 22 },
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
  optionText: { textAlign: 'center', fontSize: 18 },
  nextButton: {
    width: '100%',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  disabledButton: { backgroundColor: '#555' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  // Styles pour les résultats
  resultsTitle: { marginBottom: 15 },
  wizardTypeTitle: {
    fontSize: 28,
    color: '#87CEEB',
    marginBottom: 20,
  },
  wizardDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  finalScore: {
    fontSize: 16,
    color: '#999',
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

