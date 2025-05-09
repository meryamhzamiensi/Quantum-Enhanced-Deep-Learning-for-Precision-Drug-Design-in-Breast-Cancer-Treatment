# Quantum-Enhanced Deep Learning for Precision Drug Design in Breast Cancer Treatment

Ce projet a pour objectif de combiner des techniques d'apprentissage automatique classiques (Random Forest, Decision Tree, MLP) avec des modèles quantiques afin d’optimiser la conception de médicaments personnalisés contre le cancer du sein.

---

## 🧠 Objectif

Développer une plateforme intelligente permettant :
- La prédiction de l’efficacité des composés médicamenteux à l’aide de modèles hybrides (classiques + quantiques)
- Une interface de visualisation dédiée aux différents profils utilisateurs (pharmaceutiques, chimistes, administrateurs)
- L’amélioration de l'expérience utilisateur grâce à des prédictions plus précises et rapides basées sur le MLP et l'apprentissage quantique

---

## 🔧 Technologies utilisées

| Côté               | Technologies                                               |
|-------------------|------------------------------------------------------------|
| **Frontend**       | React, React Router                       |
| **Backend**        | Django, Django REST Framework              |
| **Machine Learning** | Random Forest, Decision Tree, MLP, Modèles Quantique (PennyLane) |
| **Base de données** | SQLite (par défaut avec Django)  |
| **Sécurité**        | Authentification JWT ou session, gestion des rôles       |

---

## 🌐 Fonctionnalités principales

### ✅ Frontend (React)
- Page d’accueil informative
- Formulaires de connexion et d'inscription
- Dashboards dédiés pour :
  - **Pharmaceutiques**
  - **Chimistes**
  - **Administrateurs**
- Affichage dynamique des données de prédiction et profils moléculaires

### ⚙️ Backend (Django)
- Gestion des utilisateurs et rôles
- API REST sécurisée
- Intégration des modèles ML :
  - **Random Forest**
  - **Decision Tree**
  - **Multi-Layer Perceptron (MLP)**
  - **Modèles quantiques hybrides** pour améliorer la précision prédictive
- Base de données relationnelle pour les molécules, utilisateurs, résultats


---

## 🧪 Modèles de Machine Learning

Les modèles sont construits avec **Scikit-learn**, **PyTorch** ou et intègrent :
- **Random Forest** : robuste sur les jeux de données non linéaires
- **Decision Tree** : prédictions explicables
- **MLP (Multi-Layer Perceptron)** : modèle de deep learning pour améliorer la qualité des prédictions
- **Modèles quantiques hybrides** : pour booster les performances, notamment sur les petits datasets moléculaires

---

## 🛠️ Installation et exécution

### 1. Cloner le dépôt
```bash
git clone https://github.com/meryamhzamiensi/Quantum-Enhanced-Deep-Learning-for-Precision-Drug-Design-in-Breast-Cancer-Treatment.git
cd Quantum-Enhanced-Deep-Learning-for-Precision-Drug-Design-in-Breast-Cancer-Treatment

### backend 
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate sous Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### frontend 
cd frontend
npm install
npm start


