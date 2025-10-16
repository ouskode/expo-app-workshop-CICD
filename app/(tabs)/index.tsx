import React, { useState } from 'react';
import {
  StyleSheet, TouchableOpacity, ScrollView, ImageBackground, View,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFonts, Cinzel_700Bold } from '@expo-google-fonts/cinzel';

// Thème Harry Potter - Version Parchemin
const hpTheme = {
  colors: {
    background: '#FDF8E7', // Teinte de parchemin clair
    parchment: 'rgba(0, 0, 0, 0.05)', // Ombre légère pour les conteneurs
    parchmentSolid: '#3A2D1C', // Texte principal (brun foncé)
    text: '#3A2D1C', // Texte principal (brun foncé)
    accent: '#946B2D', // Or un peu plus sombre pour le contraste
    primary: '#7F0909', // Rouge Gryffondor
    disabled: '#9E9E9E', // Gris pour désactivé
    buttonText: '#FDF8E7', // Texte clair pour les boutons foncés
  },
  fonts: {
    main: 'Cinzel_700Bold',
  },
};

// Définition des types de sorciers et de leurs descriptions
const wizardTypes = {
  scholar: {
    title: 'Érudit de Poudlard',
    description: 'Votre soif de connaissance est insatiable. Sortilèges, histoire de la magie, créatures... rien ne vous échappe. Vous croyez que le savoir est la plus grande des magies.',
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
  },
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
  {
    question: 'Quel est le sortilège pour désarmer un adversaire ?', options: ['Stupéfix', 'Avada Kedavra', 'Expelliarmus', 'Accio'], correctAnswerIndex: 2, answerTypes: ['auror', 'auror', 'auror', 'scholar'],
  },
  {
    question: "Quelle maison valorise l'ambition et la ruse ?", options: ['Gryffondor', 'Poufsouffle', 'Serdaigle', 'Serpentard'], correctAnswerIndex: 3, answerTypes: ['auror', 'magizoologist', 'scholar', 'potions'],
  },
  {
    question: 'Quel est le nom de la chouette de Harry ?', options: ['Coquecigrue', 'Hedwige', 'Errol', 'Hermes'], correctAnswerIndex: 1, answerTypes: ['magizoologist', 'magizoologist', 'magizoologist', 'magizoologist'],
  },
  {
    question: "Qui est le 'Prince de Sang-Mêlé' ?", options: ['Tom Jedusor', 'Severus Rogue', 'Harry Potter', 'Albus Dumbledore'], correctAnswerIndex: 1, answerTypes: ['auror', 'potions', 'auror', 'scholar'],
  },
  {
    question: "Combien d'Horcruxes Voldemort a-t-il créé intentionnellement ?", options: ['5', '6', '7', '8'], correctAnswerIndex: 1, answerTypes: ['scholar', 'scholar', 'scholar', 'scholar'],
  },
  {
    question: "Quel est le poste de Harry dans l'équipe de Quidditch ?", options: ['Batteur', 'Poursuiveur', 'Gardien', 'Attrapeur'], correctAnswerIndex: 3, answerTypes: ['auror', 'auror', 'auror', 'auror'],
  },
  {
    question: "Quel ingrédient N'EST PAS dans la potion Polynectar ?", options: ['Corne de bicorne', 'Peau de serpent', 'Sang de licorne', 'Sisymbre'], correctAnswerIndex: 2, answerTypes: ['potions', 'potions', 'magizoologist', 'potions'],
  },
  {
    question: "Comment s'appelle le train qui mène à Poudlard ?", options: ['Le Poudlard Express', 'Le Magicobus', "L'Express pour Poudlard", 'Le Chemin de Traverse Express'], correctAnswerIndex: 0, answerTypes: ['scholar', 'scholar', 'scholar', 'scholar'],
  },
  {
    question: "Qui a tué Dobby, l'elfe de maison ?", options: ['Lucius Malefoy', 'Voldemort', 'Bellatrix Lestrange', 'Peter Pettigrow'], correctAnswerIndex: 2, answerTypes: ['auror', 'auror', 'auror', 'auror'],
  },
  {
    question: 'Quel est le nom de la banque des sorciers ?', options: ['Barjow et Beurk', 'Gringotts', 'Fleury et Bott', 'Ollivander'], correctAnswerIndex: 1, answerTypes: ['potions', 'scholar', 'scholar', 'auror'],
  },
  {
    question: "Quel sortilège permet d'ouvrir les serrures ?", options: ['Alohomora', 'Wingardium Leviosa', 'Lumos', 'Reparo'], correctAnswerIndex: 0, answerTypes: ['scholar', 'scholar', 'scholar', 'scholar'],
  },
  {
    question: 'De quelle créature provient le crin dans la baguette de Harry ?', options: ['Dragon', 'Licorne', 'Sombral', 'Phénix'], correctAnswerIndex: 3, answerTypes: ['magizoologist', 'magizoologist', 'magizoologist', 'magizoologist'],
  },
  {
    question: 'Quel est le Patronus de Luna Lovegood ?', options: ['Une loutre', 'Un cerf', 'Un lièvre', 'Un cygne'], correctAnswerIndex: 2, answerTypes: ['magizoologist', 'magizoologist', 'magizoologist', 'magizoologist'],
  },
  {
    question: 'Qui donne à Harry la Carte du Maraudeur ?', options: ['Sirius Black', 'Remus Lupin', 'Albus Dumbledore', 'Fred et George Weasley'], correctAnswerIndex: 3, answerTypes: ['auror', 'scholar', 'scholar', 'potions'],
  },
  {
    question: 'Quelle est la troisième tâche du Tournoi des Trois Sorciers ?', options: ['Combattre un dragon', 'Sauver un ami du lac', 'Traverser un labyrinthe', 'Répondre à une énigme'], correctAnswerIndex: 2, answerTypes: ['magizoologist', 'auror', 'auror', 'scholar'],
  },
  {
    question: "Comment s'appelle le magasin des jumeaux Weasley ?", options: ['Zonko', 'Weasley, Farces pour sorciers facétieux', 'Le Chaudron Baveur', 'Qualité Quidditch'], correctAnswerIndex: 1, answerTypes: ['potions', 'potions', 'scholar', 'auror'],
  },
  {
    question: 'Quel est le nom complet de Ron Weasley ?', options: ['Ronald Bilius Weasley', 'Ronald Arthur Weasley', 'Ronald Gideon Weasley', 'Ronald Percy Weasley'], correctAnswerIndex: 0, answerTypes: ['scholar', 'scholar', 'scholar', 'scholar'],
  },
  {
    question: "Quelle créature garde l'entrée du bureau de Dumbledore ?", options: ['Un Hippogriffe', 'Un Centaure', 'Une Gargouille', 'Un Elfe de maison'], correctAnswerIndex: 2, answerTypes: ['magizoologist', 'magizoologist', 'auror', 'magizoologist'],
  },
  {
    question: "Quel philtre d'amour est connu pour sa couleur nacrée ?", options: ['Veritaserum', 'Felix Felicis', 'Amortentia', 'Goutte du Mort-Vivant'], correctAnswerIndex: 2, answerTypes: ['potions', 'potions', 'potions', 'potions'],
  },
  {
    question: "Qui a écrit 'Les Animaux Fantastiques' ?", options: ['Albus Dumbledore', 'Gilderoy Lockhart', 'Rita Skeeter', 'Norbert Dragonneau'], correctAnswerIndex: 3, answerTypes: ['scholar', 'auror', 'scholar', 'magizoologist'],
  },
];

export default function QuizScreen() {
  const [fontsLoaded] = useFonts({
    Cinzel_700Bold,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctScore, setCorrectScore] = useState(0);
  const [wizardTypeScores, setWizardTypeScores] = useState<Record<WizardTypeKey, number>>({
    scholar: 0, auror: 0, magizoologist: 0, potions: 0,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [finalResult, setFinalResult] = useState({ title: '', description: '' });

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswerIndex) {
      setCorrectScore((prev) => prev + 1);
    }

    const answerType = quizData[currentQuestionIndex].answerTypes[selectedAnswer];
    setWizardTypeScores((prev) => ({ ...prev, [answerType]: prev[answerType] + 1 }));

    setSelectedAnswer(null);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateResult();
      setIsQuizFinished(true);
    }
  };

  const calculateResult = () => {
    const topType = (Object.keys(wizardTypeScores) as WizardTypeKey[]).reduce((a, b) => (wizardTypeScores[a] > wizardTypeScores[b] ? a : b));
    setFinalResult(wizardTypes[topType]);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setCorrectScore(0);
    setWizardTypeScores({
      scholar: 0, auror: 0, magizoologist: 0, potions: 0,
    });
    setSelectedAnswer(null);
    setIsQuizFinished(false);
  };

  if (!fontsLoaded) {
    return null; // Affichez un écran de chargement si vous le souhaitez
  }

  const backgroundImage = { uri: 'https://www.toptal.com/designers/subtlepatterns/uploads/light-paper-fibers.png' };

  if (isQuizFinished) {
    return (
      <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
        <View style={styles.resultsContentContainer}>
          <ThemedText type="title" style={styles.resultsTitle}>Vous êtes un...</ThemedText>
          <ThemedText style={styles.wizardTypeTitle}>{finalResult.title}</ThemedText>
          <ThemedText style={styles.wizardDescription}>{finalResult.description}</ThemedText>
          <ThemedText style={styles.finalScore}>
            Score de connaissance :
            {correctScore}
            {' '}
            /
            {quizData.length}
          </ThemedText>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
            <ThemedText style={styles.buttonText}>Recommencer</ThemedText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerText}>
            Question
            {currentQuestionIndex + 1}
            {' '}
            /
            {quizData.length}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.questionContainer}>
          <ThemedText style={styles.questionText}>{currentQuestion.question}</ThemedText>
        </ThemedView>

        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selectedAnswer === index && styles.selectedOption]}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  resultsContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerText: {
    fontFamily: hpTheme.fonts.main,
    color: hpTheme.colors.text,
    fontSize: 18,
  },
  questionContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: hpTheme.colors.parchment,
    borderWidth: 1,
    borderColor: hpTheme.colors.accent,
  },
  questionText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: hpTheme.fonts.main,
    color: hpTheme.colors.text,
    lineHeight: 32,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: hpTheme.colors.text,
    backgroundColor: 'transparent',
  },
  selectedOption: {
    borderColor: hpTheme.colors.accent,
    backgroundColor: 'rgba(148, 107, 45, 0.2)',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 18,
    color: hpTheme.colors.text,
    fontFamily: hpTheme.fonts.main,
  },
  nextButton: {
    width: '100%',
    padding: 15,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: hpTheme.colors.primary,
    alignItems: 'center',
  },
  disabledButton: { backgroundColor: hpTheme.colors.disabled },
  buttonText: {
    color: hpTheme.colors.buttonText,
    fontSize: 18,
    fontFamily: hpTheme.fonts.main,
  },
  resultsTitle: {
    marginBottom: 15,
    fontFamily: hpTheme.fonts.main,
    color: hpTheme.colors.text,
  },
  wizardTypeTitle: {
    fontSize: 32,
    color: hpTheme.colors.accent,
    marginBottom: 20,
    fontFamily: hpTheme.fonts.main,
    textAlign: 'center',
    lineHeight: 40,
  },
  wizardDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
    color: hpTheme.colors.text,
    fontFamily: 'System',
    lineHeight: 24,
  },
  finalScore: {
    fontSize: 16,
    color: hpTheme.colors.text,
    marginBottom: 30,
    fontFamily: hpTheme.fonts.main,
  },
  restartButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: hpTheme.colors.primary,
    alignItems: 'center',
  },
});
