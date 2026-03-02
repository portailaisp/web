// js/app.js – Script principal de l’application AISP 2.0
// Gestion des modules, menu, langue, formulaire cotisations, tableau, etc.

// Données de test (simulation – à remplacer plus tard par fetch réel)
let cotisations = [
  { id: 1, membre: "Paul Kamdem", mois: "Janvier", montant: 5000, statut: "Payé", date: "2026-01-15", description: "Cotisation mensuelle + reçu Mobile Money" },
  { id: 2, membre: "Marie Ngono", mois: "Janvier", montant: 5000, statut: "En attente", date: "2026-01-20", description: "En cours de paiement" },
  { id: 3, membre: "Jean Dupont", mois: "Février", montant: 6000, statut: "Payé", date: "2026-02-05", description: "Cotisation + don solidarité" },
  { id: 4, membre: "Sophie Essomba", mois: "Mars", montant: 5000, statut: "En attente", date: "2026-03-01", description: "Paiement prévu fin mois" }
];

// Afficher/masquer les modules
function showModule(moduleId) {
  // Masquer tous les modules
  document.querySelectorAll('.module').forEach(mod => mod.classList.add('hidden'));
  
  // Afficher le module demandé
  const target = document.getElementById(moduleId);
  if (target) {
    target.classList.remove('hidden');
  }

  // Fermer le menu mobile si ouvert
  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.add('hidden');
  }

  // Charger les données spécifiques au module
  if (moduleId === 'comptes') {
    afficherCotisations();
  }
}

// Menu mobile (hamburger)
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('hidden');
}

// Simulation de déconnexion
function logout() {
  alert("Déconnexion simulée. À implémenter avec vrai système d’auth plus tard.");
  // Plus tard : localStorage.removeItem('user'); window.location.reload();
}

// Simulation de connexion (test simple)
function login() {
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  if (!email || !password) {
    alert("Veuillez remplir email et mot de passe.");
    return;
  }

  // Simulation : mot de passe fixe pour test (à remplacer par vrai auth)
  if (password === "aisp2026") {
    alert("Connexion réussie ! (simulation – rôle : Administrateur)");
    // Plus tard : stocker rôle dans localStorage
  } else {
    alert("Email ou mot de passe incorrect.");
  }
}

// Afficher le tableau des cotisations
function afficherCotisations() {
  const tbody = document.getElementById('cotisations-body');
  if (!tbody) return;

  tbody.innerHTML = ''; // Vider avant de remplir

  cotisations.forEach((cot, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-3 border-b">${index + 1}</td>
      <td class="p-3 border-b">${cot.membre}</td>
      <td class="p-3 border-b">${cot.mois}</td>
      <td class="p-3 border-b">${cot.montant.toLocaleString()} FCFA</td>
      <td class="p-3 border-b ${cot.statut === 'Payé' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}">${cot.statut}</td>
      <td class="p-3 border-b">${cot.date}</td>
      <td class="p-3 border-b">${cot.description || '-'}</td>
    `;
    tbody.appendChild(row);
  });
}

// Gestion du formulaire d’ajout cotisation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cotisation');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const membre = document.getElementById('membre').value.trim();
      const mois = document.getElementById('mois').value;
      const montant = parseInt(document.getElementById('montant').value);
      const statut = document.getElementById('statut').value;
      const description = document.getElementById('description').value.trim();

      if (!membre || !mois || isNaN(montant) || montant <= 0) {
        alert("Veuillez remplir correctement les champs obligatoires.");
        return;
      }

      // Ajout à la liste (simulation)
      cotisations.push({
        id: cotisations.length + 1,
        membre,
        mois,
        montant,
        statut,
        date: new Date().toISOString().split('T')[0],
        description
      });

      // Rafraîchir tableau
      afficherCotisations();

      // Réinitialiser formulaire
      form.reset();
      alert("Cotisation ajoutée avec succès ! (simulation pour l’instant)");
    });
  }

  // Afficher tableau quand on ouvre le module Comptes
  document.addEventListener('showModule', (e) => {
    if (e.detail && e.detail.moduleId === 'comptes') {
      afficherCotisations();
    }
  });

  // Export PDF basique du tableau cotisations
  function exporterCotisationsPDF() {
    const content = document.getElementById('table-cotisations').outerHTML;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <html>
          <head><title>Liste Cotisations AISP</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Liste des Cotisations - AISP</h1>
            ${content}
          </body>
        </html>
      `);
      win.document.close();
      win.print();
    } else {
      alert("Impossible d’ouvrir la fenêtre d’impression. Autorisez les pop-ups.");
    }
  }

  // Associer le bouton export PDF
  const btnPDF = document.querySelector('button[onclick="exporterCotisationsPDF()"]');
  if (btnPDF) {
    btnPDF.addEventListener('click', exporterCotisationsPDF);
  }
});
