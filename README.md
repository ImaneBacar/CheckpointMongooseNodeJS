# REST API avec Node.js, Express et Mongoose

## Contexte

J'ai réalisé ce projet dans le cadre du **Checkpoint REST API** afin de pratiquer la création d'une **API REST** et la manipulation d'une base de données avec **Mongoose**.  
L'objectif était de créer un serveur Node.js capable de gérer les opérations CRUD sur des utilisateurs ou “personnes”, et de tester les routes avec **Postman**.

---

## Installation et Configuration

1. J'ai démarré un nouveau projet Node.js avec :

```bash
npm init -y
```

2. J'ai installé les dépendances nécessaires :

```bash
npm install express mongoose dotenv
```

3. J'ai configuré les variables d'environnement dans un fichier `.env` :

```env
PORT=3000
MONGO_URI=<mon_uri_mongodb>
```

4. J'ai créé la structure de dossiers suivante :

```
config/
models/
controllers/
middleware/
routes/
server.js
.env
```

5. J'ai lancé mon serveur Express dans `server.js` et connecté ma base de données Mongoose.

---

## Structure des dossiers et fichiers

- **models/personne.js** : définit le schéma Mongoose pour les personnes.

```js
const mongoose = require("mongoose");

const personneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    favoriteFoods: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Personne", personneSchema);
```

- **controllers/personne.js** : contient les fonctions CRUD pour gérer les personnes.
- **middleware/personne.js** : middleware pour récupérer une personne par ID avant les routes `GET /:id`, `PATCH /:id` et `DELETE /:id`.
- **routes/personnes.js** : définit toutes les routes REST pour les personnes.

---

## Routes et exemples de requêtes

### 1. Récupérer toutes les personnes

```http
GET http://localhost:3000/api/personnes
```

- Renvoie un tableau JSON avec toutes les personnes de la base.
- Pas d'ID requis.

---

### 2. Récupérer une personne par ID

```http
GET http://localhost:3000/api/personnes/<id>
```

- Renvoie le document correspondant à l’ID.
- Middleware vérifie l’existence de l’ID et définit `res.personne`.

---

### 3. Créer plusieurs personnes

```http
POST http://localhost:3000/api/personnes
Content-Type: application/json

[
  {
    "name": "aita",
    "age": 22,
    "favoriteFoods": ["Tieb Dienne", "tacos"]
  },
  {
    "name": "JF",
    "age": 22,
    "favoriteFoods": ["Tieb", "panini"]
  }
]
```

- Détecte si le body est un tableau et utilise `insertMany`.
- Chaque document respecte le schéma Mongoose.

---

### 4. Supprimer une personne

```http
DELETE http://localhost:3000/api/personnes/<id>
```

- Middleware récupère la personne avant la suppression.
- Retourne un message confirmant la suppression.

---

### 5. Mettre à jour une personne

```http
PATCH http://localhost:3000/api/personnes/<id>
Content-Type: application/json

{
  "name": "aita Diagne",
  "age": 21,
  "favoriteFoods": ["Pilao", "tacos"]
}
```

- Middleware définit `res.personne`.
- Les champs `name`, `age` et `favoriteFoods` sont mis à jour uniquement s’ils sont présents dans le body.
- `favoriteFoods` est un tableau pour permettre plusieurs valeurs.

---

## Bonnes pratiques suivies

- Utilisation d’un middleware pour centraliser la récupération d’un document par ID.
- Validation des IDs MongoDB avec `mongoose.Types.ObjectId.isValid`.
- Gestion d’erreurs propre : 400 pour ID invalide, 404 pour document inexistant, 500 pour erreur serveur.
- Respect du schéma Mongoose pour chaque création ou mise à jour.
- Commentaires clairs dans le code pour expliquer chaque étape.

---

## Test avec Postman

J’ai testé toutes les routes avec Postman :

- GET toutes les personnes
- GET une personne par ID
- POST pour créer une ou plusieurs personnes
- PATCH pour mettre à jour une personne
- DELETE pour supprimer une personne

---

## Conclusion

Ce projet m’a permis de :

- Pratiquer la création d’une API REST avec **Express** et **Mongoose**.
- Gérer les routes CRUD et tester les réponses avec Postman.
- Appliquer les bonnes pratiques de middleware et gestion d’erreurs.
