# 📱 Guide d'Utilisation - Société Générale Banking App

## 🎯 Vue d'Ensemble

Cette application bancaire simule l'expérience complète d'une banque en ligne avec le design et l'identité visuelle de la Société Générale.

---

## 🔐 Page de Connexion (`index.html`)

### Design
- **Côté gauche** : Fond dégradé rouge-noir SG avec logo et illustration sécurité
- **Côté droit** : Formulaire de connexion moderne

### Éléments
- ✅ Logo officiel Société Générale (carrés rouge et noir)
- 📝 Champs : Identifiant et Code secret
- 👁️ Bouton d'affichage/masquage du mot de passe
- ☑️ Case "Se souvenir de moi"
- 🔗 Lien "Mot de passe oublié"
- 📋 Comptes de démonstration affichés

### Comptes de Test

```
┌─────────────────────────────────────┐
│  Compte Normal                      │
│  Identifiant: user123               │
│  Mot de passe: password             │
│  → Accès au dashboard complet       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Compte Bloqué                      │
│  Identifiant: blocked               │
│  Mot de passe: password             │
│  → Page de déblocage                │
└─────────────────────────────────────┘
```

---

## 📊 Dashboard Principal (`dashboard.html`)

### Structure

```
┌──────────┬─────────────────────────────────────────┐
│          │  Header (Bienvenue + Notifications)     │
│ Sidebar  ├─────────────────────────────────────────┤
│          │  Mes Comptes (3 cartes)                 │
│  - Home  │  ┌──────┐ ┌──────┐ ┌──────┐            │
│  - Mes   │  │Courant│ │Livret│ │ Gold │            │
│  Comptes │  └──────┘ └──────┘ └──────┘            │
│  - Vire  ├─────────────────────────────────────────┤
│  ments   │  Mes Cartes Bancaires (Visuel)         │
│  - Budget│  ┌────────────────┐ ┌────────────────┐ │
│  - Éparg │  │  Carte Gold    │ │ Carte Classic  │ │
│  ne      │  │  VISA          │ │  Mastercard    │ │
│  - Param │  └────────────────┘ └────────────────┘ │
│  - Décnx ├─────────────────────────────────────────┤
│          │  Historique des Opérations             │
│          │  [Filtres: Tout|Virements|Prélèv|Cartes]│
│          │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│          │  📥 Virement reçu      +250,00 €       │
│          │  🛒 Carrefour Market   -67,32 €        │
│          │  ⛽ Total Energies     -45,00 €        │
│          │  🏢 Salaire           +2,800,00 €      │
│          │  ...                                    │
└──────────┴─────────────────────────────────────────┘
```

### Sections Principales

#### 1️⃣ Mes Comptes (3 cartes)

**Compte Courant** (Rouge)
- Solde disponible: 3 450,87 €
- Numéro: •••• 4521
- Boutons: Virement | Recharger

**Livret A** (Vert)
- Épargne: 12 890,00 €
- Numéro: •••• 7832
- Boutons: Retirer | Déposer

**Carte Gold** (Jaune)
- Plafond disponible: 4 200,00 €
- Numéro: •••• 9156
- Boutons: Bloquer | Détails

#### 2️⃣ Cartes Bancaires Visuelles

**Carte Gold (Or)**
- Design: Dégradé doré
- Réseau: VISA
- Numéro affiché: 4532 8821 6547 9156
- Puce EMV visible
- Titulaire: JEAN DUPONT
- Expiration: 12/28

**Carte Classic (Rouge-Noir)**
- Design: Dégradé SG rouge-noir
- Réseau: Mastercard
- Numéro affiché: 4532 8821 6547 4521
- Puce EMV visible
- Titulaire: JEAN DUPONT
- Expiration: 06/27

#### 3️⃣ Historique des Opérations

**Types d'opérations affichées:**
- 📥 Virements reçus (vert) → +montant
- 🛒 Achats carte (rouge) → -montant
- ⛽ Paiements essence (rouge) → -montant
- 🏢 Salaires (vert) → +montant
- 🏠 Loyers (rouge) → -montant
- 📞 Abonnements (rouge) → -montant
- ⚡ Factures (rouge) → -montant

**Fonctionnalités:**
- Filtrage par catégorie (Tout, Virements, Prélèvements, Cartes)
- Click sur une transaction → Détails
- Bouton "Charger plus d'opérations"

---

## 🚫 Page Compte Bloqué (`blocked.html`)

### Structure

```
┌─────────────────────────────────────────────┐
│          Société Générale Logo              │
│                                             │
│                 ⚠️                │
│                                             │
│      Compte temporairement bloqué          │
│                                             │
│  Votre compte a été temporairement         │
│  suspendu pour des raisons de sécurité     │
│                                             │
│  ╔══════════════════════════════════════╗  │
│  ║ 👤 Compte: •••• 4521   
      Montant deblocage : **********              ║           ║  │
│  ║         ║  │
│  ╚══════════════════════════════════════╝  │
│                                             │
│  ┌──────────┐ ┌──────────┐  
│  │ 📞 Appel │ │🏢 Agence │  
│  │ Service  │ │  Proche 
              Rendez vous dans une de nos agences  │
│  └─ Numéro: **09 69 36 96 96**
     Disponibilité: 24h/24 - 7j/7─────────┘ └──────────┘ └
│                                                    │
│                                             │
└─────────────────────────────────────────────┘
```

### Options de Déblocage

#### Option 1: Contact Téléphonique 📞
- Numéro: **09 69 36 96 96**
- Disponibilité: 24h/24 - 7j/7
- Click sur le numéro → Copie automatique

#### Option 2: Agence 🏢
- Bouton "Trouver une agence"
- Affiche les 3 agences les plus proches
- Horaires d'ouverture
- Distances

#### Option 3: Déblocage en ligne 🔓
- Bouton "Débloquer maintenant"
- Ouvre un modal avec formulaire:
  - Date de naissance
  - Nom de jeune fille de la mère
  - Code de vérification SMS
- Validation → Confirmation d'envoi

---

## 🎨 Identité Visuelle

### Couleurs Principales
```css
Rouge SG:     #E60028  ████████
Noir SG:      #000000  ████████
Gris clair:   #f5f7fa  ████████
Blanc:        #ffffff  ████████
```

### Logo Société Générale
```
┌──┬──┐
│██│  │  Rouge (#E60028) + Noir (#000000)
└──┴──┘
  SG
```

### Typographie
- Famille: Inter, Segoe UI
- Poids: 300 à 800
- Tailles: 12px à 32px

---

## ⚡ Fonctionnalités Interactives

### 🔐 Page Login
1. ✅ Validation en temps réel
2. ✅ Messages d'erreur animés
3. ✅ Animation "shake" si erreur
4. ✅ Toggle visibilité mot de passe
5. ✅ Mémorisation identifiant

### 📊 Dashboard
1. ✅ Navigation sidebar active
2. ✅ Filtrage transactions dynamique
3. ✅ Notifications toast
4. ✅ Modal détails carte
5. ✅ Animation hover sur cartes
6. ✅ Blocage/déblocage carte
7. ✅ Click transaction → Détails

### 🚫 Page Bloqué
1. ✅ Animation icône avertissement
2. ✅ Modal déblocage
3. ✅ Formulaire validation
4. ✅ Message confirmation
5. ✅ Copie numéro téléphone

---

## 📱 Responsive Design

### Desktop (> 1024px)
- Sidebar complète visible
- Grille 3 colonnes pour comptes
- Cartes bancaires côte à côte

### Tablette (768px - 1024px)
- Sidebar compacte (icônes seuls)
- Grille 2 colonnes
- Cartes bancaires scrollables

### Mobile (< 768px)
- Sidebar masquée
- Grille 1 colonne
- Cartes bancaires empilées
- Boutons pleine largeur

---

## 🔒 Gestion de Session

### SessionStorage (durée session)
```javascript
accountStatus: 'active' | 'blocked'
username: string
userFullName: string
```

### LocalStorage (persistant)
```javascript
rememberedUser: string (si "Se souvenir" coché)
```

### Sécurité
- Vérification session à chaque page
- Redirection auto si non connecté
- Clear session à la déconnexion

---

## 🎯 Scénarios d'Usage

### Scénario 1: Consultation Normale ✅
1. Login avec `user123` / `password`
2. Voir dashboard avec soldes
3. Consulter cartes bancaires
4. Filtrer historique "Virements"
5. Click sur transaction → Voir détails
6. Click sur notification
7. Se déconnecter

### Scénario 2: Compte Bloqué 🔒
1. Login avec `blocked` / `password`
2. Redirection automatique page bloqué
3. Voir informations du blocage
4. Click "Débloquer maintenant"
5. Remplir formulaire de sécurité
6. Recevoir confirmation d'envoi
7. Ou appeler le service client

### Scénario 3: Gestion de Carte 💳
1. Login normal
2. Voir carte Gold
3. Click "Bloquer"
4. Confirmation → Carte bloquée
5. Click "Débloquer"
6. Carte débloquée
7. Click "Détails" → Voir infos complètes

---

## 🚀 Fonctionnalités Avancées

### Animations CSS
- Transitions fluides (0.3s ease)
- Hover effects sur tous les boutons
- Slide in/out pour notifications
- Pulse sur icône avertissement
- Shake sur erreur de login

### Notifications Toast
- Position: Top-right
- Types: Success (vert), Info (bleu)
- Auto-dismiss après 3 secondes
- Animation slide-in/out

### Filtrage Dynamique
- Temps réel sans rechargement
- 4 catégories disponibles
- Cache/Affiche transactions
- Bouton actif avec style différent

---

## 💡 Conseils d'Utilisation

### Pour Tester
1. Ouvrir `index.html` dans un navigateur moderne
2. Tester les 2 types de comptes
3. Explorer toutes les fonctionnalités
4. Tester sur différentes tailles d'écran

### Pour Développer
1. Modifier les styles dans `styles/`
2. Ajouter logique dans `scripts/`
3. Tester sur Chrome, Firefox, Safari
4. Vérifier responsive avec DevTools

### Performance
- Pas de dépendances lourdes
- Font Awesome via CDN
- CSS optimisé
- JavaScript vanilla (rapide)

---

## 🎓 Technologies Utilisées

### Frontend
- HTML5 sémantique
- CSS3 (Flexbox, Grid, Animations)
- JavaScript ES6+ (Vanilla)

### Bibliothèques
- Font Awesome 6 (icônes uniquement)

### Stockage
- SessionStorage (session)
- LocalStorage (persistance)

### APIs Web
- Clipboard API (copie numéro)
- Date API (dates transactions)
- Storage API (sessions)

---

## 📞 Support

Pour toute question sur l'utilisation de cette application de démonstration, consultez le README.md ou examinez le code source commenté.

---

**Bonne exploration de l'application Société Générale ! 🏦**
