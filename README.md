# MentalChecker

**MentalChecker** est une application web moderne d'auto-évaluation de la santé mentale, conçue pour offrir un espace simple, confidentiel et humain aux utilisateurs souhaitant faire le point sur leur bien-être psychologique.

L'application propose des outils de dépistage standardisés et des ressources d'orientation, avec un accent particulier sur l'accessibilité et la sensibilisation, notamment pour la région du Burkina Faso.

---

## Fonctionnalités principales

L'application s'articule autour de trois axes majeurs :

1.  **Évaluations Cliniques Standardisées** :
    *   **PHQ-9 (Patient Health Questionnaire)** : Un outil reconnu pour le dépistage et l'évaluation de la sévérité de la dépression chez les adultes.
    *   **GAD-7 (General Anxiety Disorder)** : Une échelle permettant d'évaluer l'anxiété généralisée.
2.  **Ressources Locales** :
    *   Un répertoire de contacts et de structures d'aide au **Burkina Faso** (CHU Yalgado Ouédraogo, Croix-Rouge, Urgences Médicales).
    *   Filtrage par catégorie : Urgence, Santé mentale, Soutien.
---

## Technologies utilisées


| Technologie | Usage |
| :--- | :--- |
| **React** | Bibliothèque frontend pour l'interface utilisateur. |
| **TypeScript** | Typage statique pour une meilleure robustesse du code. |
| **Vite** | Outil de build ultra-rapide pour le développement. |
| **Tailwind CSS** | Framework CSS pour un design responsive et moderne. |
| **Lucide React** | Bibliothèque d'icônes élégantes. |

---

## Structure du projet

```text
MentalChecker/
├── client/             # Code source du frontend
│   ├── src/
│   │   ├── components/ # Composants UI (Questionnaires, UI de base)
│   │   ├── contexts/   # Gestion de l'état global (Thème, etc.)
│   │   ├── data/       # Données statiques (Questions, Ressources)
│   │   ├── pages/      # Vues principales (Accueil)
│   │   └── App.tsx     # Point d'entrée et routage simple
├── package.json        # Dépendances et scripts
└── tsconfig.json       # Configuration TypeScript
```

---

## Installation et Développement

Pour lancer le projet localement :

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/Xcept-Health/MentalChecker.git
    cd MentalChecker
    ```
2.  **Installer les dépendances** :
    ```bash
    npm install
    ```
3.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```
4.  **Accéder à l'application** : Ouvrez votre navigateur sur `http://localhost:5173`.

---

## Avertissement Important

**MentalChecker est un outil d'information et d'auto-évaluation.** Il ne remplace en aucun cas un diagnostic médical professionnel. En cas de détresse psychologique ou d'urgence, il est impératif de consulter un professionnel de santé ou de contacter les services d'urgence mentionnés dans l'application.

---

## Licence

Ce projet est sous licence **MIT**.

