// js/lang.js – Gestion multilingue FR / EN pour l'arbre AISP

// Objet contenant toutes les traductions
const texts = {
  fr: {
    // Header / général
    "devise": "Solidarité – Progrès – Développement",
    "deconnexion": "Déconnexion",

    // Menu latéral
    "accueil": "Accueil",
    "comptes": "Comptes & Caisses",
    "utilisateurs": "Utilisateurs & Rôles",
    "securite": "Sécurité",
    "evenements": "Événements",

    // Module Accueil
    "accueil-titre": "Bienvenue dans l’Arbre AISP",
    "accueil-description": "Choisissez une branche dans le menu de gauche pour commencer.",

    // Module Comptes
    "comptes-titre": "Comptes des Membres & Caisses",
    "comptes-description": "Suivi des cotisations, épargne, dépenses et autres mouvements financiers.",
    "ajouter-cotisation": "Ajouter une cotisation",
    "montant": "Montant",
    "mois": "Mois",
    "statut": "Statut",
    "paye": "Payé",
    "en-attente": "En attente",

    // Module Utilisateurs & Rôles
    "utilisateurs-titre": "Gestion des Utilisateurs & Rôles",
    "utilisateurs-description": "Super administrateurs, administrateurs, utilisateurs, membres, visiteurs et autres rôles.",
    "super-admin": "Super Administrateur",
    "admin": "Administrateur",
    "utilisateur": "Utilisateur",
    "membre": "Membre",
    "visiteur": "Visiteur",

    // Module Sécurité / Login
    "securite-titre": "Sécurité & Connexion",
    "securite-description": "Connectez-vous pour accéder aux zones protégées.",
    "login-titre": "Se connecter",
    "email": "Email",
    "mot-de-passe": "Mot de passe",
    "se-connecter": "Se connecter",
    "mot-de-passe-oublie": "Mot de passe oublié ?",

    // Module Événements
    "evenements-titre": "Événements & Formations",
    "evenements-description": "Calendrier des prochaines activités, formations et rencontres de l’AISP.",
    "date": "Date",
    "lieu": "Lieu",
    "description": "Description",
    "inscription": "S'inscrire",

    // Module Rapports & États
    "rapports": "Rapports & États",
    "rapports-titre": "Rapports & États",
    "rapports-description": "Générez et exportez les états financiers et administratifs nécessaires à la transparence et au contrôle.",
    "choisir-etat": "Choisir l'état à générer :",
    "generer": "Générer",
    "exporter-pdf": "Exporter PDF",
    "exporter-excel": "Exporter Excel",
    "exporter-word": "Exporter Word",
    "rapport-vide": "Sélectionnez un état et cliquez sur \"Générer\"",
    "liste-membres": "Liste complète des membres",
    "membres-a-jour": "Membres à jour",
    "membres-endettes": "Membres endettés / en retard",
    "membres-critique": "Membres en situation critique",
    "cagnotte-emprunts": "Cagnotte disponible pour les emprunts",
    "membres-empruntables": "Membres pouvant emprunter",
    "interets-depots": "Intérêts générés par les dépôts",
    "mouvements-recents": "Mouvements financiers récents (30 jours)",
    "bilan-tresorerie": "Bilan de trésorerie simplifié",
    "historique-cotisations": "Historique cotisations par membre"
  },

  en: {
    // Header / général
    "devise": "Solidarity – Progress – Development",
    "deconnexion": "Logout",

    // Menu latéral
    "accueil": "Home",
    "comptes": "Accounts & Cash Registers",
    "utilisateurs": "Users & Roles",
    "securite": "Security",
    "evenements": "Events",
    "rapports": "Reports & Statements",

    // Module Accueil
    "accueil-titre": "Welcome to the AISP Tree",
    "accueil-description": "Choose a branch from the left menu to get started.",

    // Module Comptes
    "comptes-titre": "Members Accounts & Cash Registers",
    "comptes-description": "Tracking of dues, savings, expenses and other financial movements.",
    "ajouter-cotisation": "Add a contribution",
    "montant": "Amount",
    "mois": "Month",
    "statut": "Status",
    "paye": "Paid",
    "en-attente": "Pending",

    // Module Utilisateurs & Rôles
    "utilisateurs-titre": "Users & Roles Management",
    "utilisateurs-description": "Super admins, admins, users, members, visitors and other roles.",
    "super-admin": "Super Administrator",
    "admin": "Administrator",
    "utilisateur": "User",
    "membre": "Member",
    "visiteur": "Visitor",

    // Module Sécurité / Login
    "securite-titre": "Security & Login",
    "securite-description": "Log in to access protected areas.",
    "login-titre": "Sign In",
    "email": "Email",
    "mot-de-passe": "Password",
    "se-connecter": "Sign In",
    "mot-de-passe-oublie": "Forgot password?",

    // Module Événements
    "evenements-titre": "Events & Training",
    "evenements-description": "Calendar of upcoming AISP activities, trainings and meetings.",
    "date": "Date",
    "lieu": "Location",
    "description": "Description",
    "inscription": "Register",

    // Module Rapports & États
    "rapports": "Reports & Statements",
    "rapports-titre": "Reports & Statements",
    "rapports-description": "Generate and export financial and administrative statements required for transparency and control.",
    "choisir-etat": "Select the statement to generate:",
    "generer": "Generate",
    "exporter-pdf": "Export PDF",
    "exporter-excel": "Export Excel",
    "exporter-word": "Export Word",
    "rapport-vide": "Select a statement and click \"Generate\"",
    "liste-membres": "Full list of members",
    "membres-a-jour": "Members up to date",
    "membres-endettes": "Members in debt / overdue",
    "membres-critique": "Members in critical situation",
    "cagnotte-emprunts": "Loan fund available",
    "membres-empruntables": "Members eligible to borrow",
    "interets-depots": "Interest generated by deposits",
    "mouvements-recents": "Recent financial movements (30 days)",
    "bilan-tresorerie": "Simplified cash balance",
    "historique-cotisations": "Contribution history per member",
  }
};

// Langue actuelle (par défaut français, ou dernière préférence sauvegardée)
let currentLang = localStorage.getItem('aisp-lang') || 'fr';

// Fonction pour changer la langue
function setLanguage(lang) {
  if (!['fr', 'en'].includes(lang)) return;

  currentLang = lang;
  localStorage.setItem('aisp-lang', lang);

  // Mettre à jour tous les éléments qui ont data-lang-key
  document.querySelectorAll('[data-lang-key]').forEach(el => {
    const key = el.getAttribute('data-lang-key');
    if (texts[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = texts[lang][key];  // pour les champs de formulaire
      } else {
        el.textContent = texts[lang][key];
      }
    }
  });

  // Optionnel : mise à jour de l'attribut lang sur <html> pour accessibilité
  document.documentElement.lang = lang;
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
