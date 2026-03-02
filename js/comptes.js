// Gestion du module Comptes

// Données de test (à remplacer plus tard par Google Sheets ou Supabase)
let cotisations = [
  { id: 1, membre: "Paul Kamdem", mois: "Janvier", montant: 5000, statut: "Payé", date: "2026-01-15" },
  { id: 2, membre: "Marie Ngono", mois: "Janvier", montant: 5000, statut: "En attente", date: "2026-01-20" },
  { id: 3, membre: "Jean Dupont", mois: "Février", montant: 6000, statut: "Payé", date: "2026-02-05" },
  // Ajoute d'autres lignes ici...
];

// Fonction pour afficher le tableau
function afficherCotisations() {
  const tbody = document.getElementById('cotisations-body');
  if (!tbody) return;

  tbody.innerHTML = ''; // Vide le tableau

  cotisations.forEach((cot, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-3 border-b">${index + 1}</td>
      <td class="p-3 border-b">${cot.membre}</td>
      <td class="p-3 border-b">${cot.mois}</td>
      <td class="p-3 border-b">${cot.montant.toLocaleString()} FCFA</td>
      <td class="p-3 border-b ${cot.statut === 'Payé' ? 'text-green-600' : 'text-red-600'}">${cot.statut}</td>
      <td class="p-3 border-b">${cot.date}</td>
    `;
    tbody.appendChild(row);
  });
}

// Gestion du formulaire d'ajout
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cotisation');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const membre = document.getElementById('membre').value.trim();
      const mois = document.getElementById('mois').value;
      const montant = parseInt(document.getElementById('montant').value);
      const description = document.getElementById('description').value.trim();

      if (!membre || !mois || isNaN(montant) || montant <= 0) {
        alert("Veuillez remplir tous les champs obligatoires correctement.");
        return;
      }

      // Ajout à la liste (simulation – plus tard vers Google Sheet)
      cotisations.push({
        id: cotisations.length + 1,
        membre,
        mois,
        montant,
        statut: "En attente",
        date: new Date().toISOString().split('T')[0]
      });

      // Rafraîchir le tableau
      afficherCotisations();

      // Vider le formulaire
      form.reset();
      alert("Cotisation ajoutée avec succès ! (simulation)");
    });
  }

  // Afficher le tableau au chargement du module (optionnel)
  // Tu peux aussi l'appeler quand on affiche le module
  document.addEventListener('showModule', (e) => {
    if (e.detail.moduleId === 'comptes') {
      afficherCotisations();
    }
  });
});
