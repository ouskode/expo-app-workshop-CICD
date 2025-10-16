import React from 'react';
import {
  StyleSheet, ScrollView, ImageBackground, View,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useFonts, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import { ThemedView } from '@/components/themed-view';

// Thème Harry Potter - Version Parchemin
const hpTheme = {
  colors: {
    background: '#FDF8E7',
    parchment: 'rgba(0, 0, 0, 0.05)',
    text: '#3A2D1C',
    accent: '#946B2D',
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

export default function ExploreScreen() {
  const [fontsLoaded] = useFonts({
    Cinzel_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const backgroundImage = { uri: 'https://www.toptal.com/designers/subtlepatterns/uploads/light-paper-fibers.png' };

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText style={styles.pageTitle}>Les Archétypes de Sorciers</ThemedText>

        {Object.values(wizardTypes).map((wizard, index) => (
          <ThemedView key={index} style={styles.wizardCard}>
            <ThemedText style={styles.wizardTitle}>{wizard.title}</ThemedText>
            <ThemedText style={styles.wizardDescription}>{wizard.description}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontFamily: hpTheme.fonts.main,
    color: hpTheme.colors.text,
    textAlign: 'center',
    marginBottom: 40, // Augmenté pour plus d'espace
  },
  wizardCard: {
    backgroundColor: hpTheme.colors.parchment,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: hpTheme.colors.accent,
  },
  wizardTitle: {
    fontSize: 24,
    fontFamily: hpTheme.fonts.main,
    color: hpTheme.colors.accent,
    marginBottom: 15, // Augmenté pour une meilleure séparation
    textAlign: 'center',
  },
  wizardDescription: {
    fontSize: 16,
    color: hpTheme.colors.text,
    textAlign: 'justify',
    fontFamily: 'System',
    lineHeight: 22,
  },
});
