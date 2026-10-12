# 📝 Instructions pour le Logo Société Générale

## Option 1 : Utiliser Votre Logo (RECOMMANDÉ)

1. **Enregistrez votre logo** (l'image que vous avez fournie) sous le nom `sg-logo.png`

2. **Placez-le** dans le dossier : `assets/images/`
   ```
   appBank/
   └── assets/
       └── images/
           └── sg-logo.png  ← Mettez votre fichier ici
   ```

3. **Le logo sera automatiquement affiché** sur toutes les pages !

---

## Option 2 : Utiliser une URL en ligne

Si vous préférez utiliser un logo depuis Internet, modifiez les fichiers HTML :

### Dans `index.html`, `dashboard.html`, et `blocked.html`
Remplacez :
```html
<img src="assets/images/sg-logo.svg" alt="Société Générale" class="sg-logo-img">
```

Par :
```html
<img src="https://votre-url-du-logo.png" alt="Société Générale" class="sg-logo-img">
```

---

## Format du Logo

### Formats acceptés
- ✅ PNG (avec fond transparent)
- ✅ SVG (vectoriel)
- ✅ JPG/JPEG
- ✅ WebP

### Taille recommandée
- **Largeur** : 200-300px
- **Hauteur** : 50-80px
- **Ratio** : ~4:1 (largeur:hauteur)

---

## Vérification

Après avoir placé votre logo :

1. Rafraîchissez la page dans le navigateur (F5)
2. Le logo devrait apparaître sur :
   - ✅ Page de connexion (en haut à gauche, en blanc)
   - ✅ Dashboard (dans la sidebar, en blanc)
   - ✅ Page compte bloqué (en haut, en noir)

---

## Styles Appliqués

Le logo a des styles CSS différents selon la page :

### Page Login & Dashboard
```css
filter: brightness(0) invert(1); /* Rend le logo blanc */
height: 40-50px;
```

### Page Bloqué
```css
height: 60px; /* Logo en couleur normale */
```

---

## Problème d'Affichage ?

Si le logo ne s'affiche pas :

1. **Vérifiez le chemin** : Le fichier est bien dans `assets/images/`
2. **Vérifiez le nom** : Le fichier s'appelle exactement `sg-logo.png` ou `.svg`
3. **Rafraîchissez** : Appuyez sur Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)
4. **Ouvrez la console** : F12 > Console pour voir les erreurs

---

## Personnalisation Avancée

### Changer la taille du logo

#### Login (styles/login.css)
```css
.sg-logo-img {
    height: 50px; /* Changez cette valeur */
}
```

#### Dashboard (styles/dashboard.css)
```css
.sg-logo-img {
    height: 40px; /* Changez cette valeur */
}
```

#### Page Bloqué (styles/blocked.css)
```css
.sg-logo-img {
    height: 60px; /* Changez cette valeur */
}
```

### Changer la couleur du logo

Pour un logo blanc (sur fond sombre) :
```css
filter: brightness(0) invert(1);
```

Pour un logo en couleur normale :
```css
filter: none;
```

Pour un logo rouge :
```css
filter: brightness(0) saturate(100%) invert(13%) sepia(100%) saturate(7500%) hue-rotate(356deg);
```

---

**C'est prêt ! Placez simplement votre logo dans le dossier et profitez ! 🎨**
