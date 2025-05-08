# Quantum-Enhanced Deep Learning in Drug Design for Breast Cancer

Ce projet intègre le deep learning, des techniques quantiques, et des algorithmes de machine learning classiques (Random Forest, Decision Tree) pour améliorer la conception de médicaments contre le cancer du sein. Il comprend :

- 🌐 Une interface frontend avec authentification par rôle
- 🧪 Un backend Django pour la gestion des utilisateurs, rôles et prédictions
- 🧠 Des modèles ML pour prédire l'efficacité des molécules
- ⚛️ Des expérimentations pour intégrer des effets quantiques (à venir)

## 🔐 Fonctionnalités

### Frontend
- Formulaire de connexion
- Redirection selon le rôle :
  - **Pharmacien** ➝ Dashboard Pharma
  - **Chimiste** ➝ Dashboard Chemiste
  - **Admin** ➝ Dashboard Admin

### Backend (Django)
- Authentification sécurisée (Django Allauth ou JWT)
- Gestion des rôles et des sessions
- API REST pour communiquer avec le frontend
- Base de données PostgreSQL (par défaut)

### Modèles de Machine Learning
- **Random Forest** et **Decision Tree** pour prédire l'efficacité de molécules
- Données de test anonymisées (format CSV ou intégré à la base)
- Intégration future de **quantum-enhanced models**

