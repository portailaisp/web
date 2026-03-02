const texts = {
  fr: {
    devise: "Solidarité – Progrès – Développement",
    deconnexion: "Déconnexion",
    accueil: "Accueil",
    comptes: "Comptes & Caisses",
    utilisateurs: "Utilisateurs & Rôles",
    securite: "Sécurité",
    evenements: "Événements",
    rapports: "Rapports & États",
    "accueil-titre": "Bienvenue dans l’Arbre AISP",
    "accueil-description": "Choisissez une branche dans le menu de gauche pour commencer.",
    "comptes-titre": "Comptes des Membres & Caisses",
    "comptes-description": "Suivi des cotisations, épargne, dépenses et autres mouvements financiers.",
    "ajouter-cotisation": "Ajouter une cotisation",
    "membre": "Membre",
    "mois": "Mois",
    "montant": "Montant",
    "statut": "Statut",
    "description": "Description",
    "enregistrer": "Enregistrer",
    "annuler": "Annuler",
    "utilisateurs-titre": "Gestion des Utilisateurs & Rôles",
    "utilisateurs-description": "Super administrateurs, administrateurs, utilisateurs, membres, visiteurs et autres rôles.",
    "securite-titre": "Sécurité & Connexion",
    "securite-description": "Connectez-vous pour accéder aux zones protégées.",
    "login-titre": "Se connecter",
    "email": "Email",
    "mot-de-passe": "Mot de passe",
    "se-connecter": "Se connecter",
    "mot-de-passe-oublie": "Mot de passe oublié ?",
    "evenements-titre": "Événements & Formations",
    "evenements-description": "Calendrier des prochaines activités, formations et rencontres de l’AISP.",
    "date": "Date",
    "lieu": "Lieu",
    "inscription": "S'inscrire",
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
    "historique-cotisations": "Historique cotisations par membre",
    "recettes-depenses": "Recettes vs Dépenses (année en cours)",
    "ecart-budget": "Écart budget prévisionnel / réalisé",
    "conventions-reglementees": "Conventions réglementées",
    "alerte-continuite": "Alertes sur continuité d’exploitation",
    "risques-financiers": "Risques financiers identifiés",
    "inventaire-immobilisations": "Inventaire des immobilisations",
    "subventions-recues": "Subventions et dons reçus"
  },
  en: {
    devise: "Solidarity – Progress – Development",
    deconnexion: "Logout",
    accueil: "Home",
    comptes: "Accounts & Cash Registers",
    utilisateurs: "Users & Roles",
    securite: "Security",
    evenements: "Events",
    rapports: "Reports & Statements",
    "accueil-titre": "Welcome to the AISP Tree",
    "accueil-description": "Choose a branch from the left menu to get started.",
    "comptes-titre": "Members Accounts & Cash Registers",
    "comptes-description": "Tracking of dues, savings, expenses and other financial movements.",
    "ajouter-cotisation": "Add a contribution",
    "membre": "Member",
    "mois": "Month",
    "montant": "Amount",
    "statut": "Status",
    "description": "Description",
    "enregistrer": "Save",
    "annuler": "Cancel",
    "utilisateurs-titre": "Users & Roles Management",
    "utilisateurs-description": "Super admins, admins, users, members, visitors and other roles.",
    "securite-titre": "Security & Login",
    "securite-description": "Log in to access protected areas.",
    "login-titre": "Sign In",
    "email": "Email",
    "mot-de-passe": "Password",
    "se-connecter": "Sign In",
    "mot-de-passe-oublie": "Forgot password?",
    "evenements-titre": "Events & Training",
    "evenements-description": "Calendar of upcoming AISP activities, trainings and meetings.",
    "date": "Date",
    "lieu": "Location",
    "description": "Description",
    "inscription": "Register",
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
    "recettes-depenses": "Revenue vs Expenses (current year)",
    "ecart-budget": "Budget variance (forecast vs actual)",
    "conventions-reglementees": "Regulated agreements",
    "alerte-continuite": "Going concern alerts",
    "risques-financiers": "Identified financial risks",
    "inventaire-immobilisations": "Fixed assets inventory",
    "subventions-recues": "Grants and donations received"
  }
};

let currentLang = localStorage.getItem('aisp-lang') || 'fr';

function setLanguage(lang) {
  if (!['fr', 'en'].includes(lang)) return;

  currentLang = lang;
  localStorage.setItem('aisp-lang', lang);

  document.querySelectorAll('[data-lang-key]').forEach(el => {
    const key = el.getAttribute('data-lang-key');
    if (texts[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = texts[lang][key];
      } else {
        el.textContent = texts[lang][key];
      }
    }
  });

  const label = document.querySelector('label[for="etat-select"]');
  if (label && texts[lang]["choisir-etat"]) {
    label.textContent = texts[lang]["choisir-etat"];
  }

  const select = document.getElementById('etat-select');
  if (select) {
    Array.from(select.options).forEach(option => {
      const key = option.value;
      if (key && texts[lang][key]) {
        option.text = texts[lang][key];
      }
    });
  }

  document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
