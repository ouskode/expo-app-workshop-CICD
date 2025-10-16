# Utilise une image Node.js officielle
FROM node:18-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Installe l'outil Expo CLI globalement
RUN npm install -g expo-cli

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste du code de l'application
COPY . .

# Commande par défaut (peut être utilisée pour un test simple)
CMD ["node", "--version"]