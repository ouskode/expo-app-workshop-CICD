// .eslintrc.js
module.exports = {
  // Indique que c'est le fichier de configuration racine
  root: true,

  // Étend les configurations de base. L'ordre est important :
  // les dernières règles peuvent surcharger les précédentes.
  extends: [
    'airbnb',         // Règles de style de code d'Airbnb
    'airbnb/hooks',   // Règles spécifiques aux React Hooks d'Airbnb
    'expo',           // Règles de base pour les projets Expo/React Native (a la priorité)
  ],

  // Ajoute les patterns de fichiers/dossiers à ignorer
  ignorePatterns: [
    'dist/*',         // Ignore le dossier 'dist' que vous aviez défini
    'node_modules/',
    '.expo/',
    '*.config.js',
  ],

  // Définit les environnements globaux
  env: {
    'jest': true,     // Active les variables globales de Jest pour les tests
    'browser': true,  // Pour les API du navigateur
    'es2021': true,   // Pour les fonctionnalités modernes de JavaScript
    'node': true,
  },

  // Configure l'analyseur pour qu'il comprenne la syntaxe de React Native
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['module:metro-react-native-babel-preset'],
    },
    ecmaFeatures: {
      jsx: true,
    },
  },

  // Permet d'ajouter ou de modifier des règles spécifiques
  rules: {
    // Permet d'utiliser JSX dans les fichiers .js et .jsx
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],

    // N'oblige plus à importer React dans chaque fichier (inutile avec React 17+)
    'react/react-in-jsx-scope': 'off',

    // Peut être utile pour éviter les conflits de formatage si vous utilisez Prettier
    'prettier/prettier': 'off',
  },
};