# 🚀 Plateforme Freelances - Backend GraphQL (NestJS + TypeORM)

## 📌 Description

Ce projet est une API GraphQL pour la gestion des profils freelances dans une plateforme destinée aux RH. Il permet de gérer la création, mise à jour, suppression et consultation des profils avec un système d'authentification JWT et des rôles (`FREELANCER`, `RH`).

---

## 🧱 Stack Technique

* **NestJS** pour la structure du backend
* **GraphQL (Apollo Server)** pour les requêtes/mutations
* **TypeORM** pour l'accès base de données (PostgreSQL recommandé)
* **JWT** pour la sécurité et l’authentification

---

## ⚙️ Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur en développement
npm run start:dev
```

Configurer un fichier `.env` avec :

```env
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgres://user:mohamed@localhost:5432/freelances_platforme
```

---

## 🔐 Authentification

* Authentification via email + mot de passe (`login`)
* Un token JWT est retourné à utiliser dans l'en-tête `Authorization: Bearer <token>`

---

## 📚 Fonctionnalités principales (GraphQL)

### ✏️ Mutations

* `createUser(input)` : Créer un utilisateur (freelance ou RH)
* `login(input)` : Se connecter et recevoir un token JWT
* `createProfile(input)` : Créer son profil freelance (authentifié)
* `updateProfile(id, input)` : RH ou propriétaire met à jour le profil
* `deleteProfile(id)` : RH ou propriétaire supprime un profil

### 📥 Queries

* `me()` : Retourne l'utilisateur connecté
* `users()` : RH peut voir tous les utilisateurs
* `user(id)` : Voir un utilisateur par ID
* `profiles()` : RH peut voir tous les profils
* `profile(id)` : Voir un profil spécifique (propriétaire ou RH)

---

## 🧪 Exemples de requêtes GraphQL

### ➕ Création utilisateur

```graphql
mutation {
  createUser(input: {
    email: "freelance@example.com",
    password: "123456",
    role: FREELANCER
  }) {
    id
    email
  }
}
```

### 🔐 Connexion

```graphql
mutation {
  login(input: {
    email: "freelance@example.com",
    password: "123456"
  })
}
```

### 📄 Création de profil

```graphql
mutation {
  createProfile(input: {
    firstName: "Sarah",
    lastName: "Doe",
    skills: ["NestJS", "TypeScript"],
    professionalLinks: ["https://github.com/sarah"]
  }) {
    id
    firstName
    lastName
  }
}
```

### 🔎 Voir tous les profils (RH)

```graphql
query {
  profiles {
    id
    firstName
    accepted
    user {
      email
    }
  }
}
```

---

## 🧠 Auteurs & Contribution

* Nom : Med Amine Riche / Kenza Naffeti / Med Aziz Selmi / Soulayman Omrani 
* GitHub : \[https://github.com/MedRiche/platforme_freelances.git]




