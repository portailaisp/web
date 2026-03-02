// js/app.js – Script principal AISP 2.0

// Données de test pour Comptes
let cotisations = [
  { id: 1, membre: "Paul Kamdem", mois: "Janvier", montant: 5000, statut: "Payé", date: "2026-01-15", description: "Cotisation mensuelle + reçu Mobile Money" },
  { id: 2, membre: "Marie Ngono", mois: "Janvier", montant: 5000, statut: "En attente", date: "2026-01-20", description: "Paiement en cours" },
  { id: 3, membre: "Jean Dupont", mois: "Février", montant: 6000, statut: "Payé", date: "2026-02-05", description: "Cotisation + don solidarité" },
  { id: 4, membre: "Sophie Essomba", mois: "Mars", montant: 5000, statut: "Critique", date: "2026-03-01", description: "Retard de 2 mois" },
  { id: 5, membre: "Alain Biya", mois: "Avril", montant: 7000, statut: "Payé", date: "2026-04-10", description: "Cotisation annuelle" }
];

// Afficher/masquer modules
function showModule(moduleId) {
  document.querySelectorAll('.module').forEach(m => m.classList.add('hidden'));
  const target = document.getElementById(moduleId);
  if (target) target.classList.remove('hidden');

  if (window.innerWidth < 768) toggleSidebar();
}

// Menu mobile
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('hidden');
}

// Déconnexion (simulation)
function logout() {
  alert("Déconnexion simulée. À implémenter plus tard.");
}

// Afficher tableau cotisations
function afficherCotisations() {
  const tbody = document.getElementById('cotisations-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  cotisations.forEach((cot, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-3 border-b">${index + 1}</td>
      <td class="p-3 border-b">${cot.membre}</td>
      <td class="p-3 border-b">${cot.mois}</td>
      <td class="p-3 border-b">${cot.montant.toLocaleString()} FCFA</td>
      <td class="p-3 border-b ${cot.statut === 'Payé' ? 'text-green-600' : cot.statut === 'Critique' ? 'text-red-600' : 'text-yellow-600'}">${cot.statut}</td>
      <td class="p-3 border-b">${cot.date}</td>
      <td class="p-3 border-b">${cot.description}</td>
      <td class="p-3 border-b">
        <button onclick="editCotisation(${cot.id})" class="text-blue-600 hover:underline mr-2">Éditer</button>
        <button onclick="deleteCotisation(${cot.id})" class="text-red-600 hover:underline">Supprimer</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Gestion formulaire Comptes
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cotisation');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id = document.getElementById('edit-id').value;
      const membre = document.getElementById('membre').value.trim();
      const mois = document.getElementById('mois').value;
      const montant = parseInt(document.getElementById('montant').value);
      const statut = document.getElementById('statut').value;
      const description = document.getElementById('description').value.trim();

      if (!membre || !mois || isNaN(montant)) {
        alert("Champs obligatoires manquants.");
        return;
      }

      if (id) {
        const cot = cotisations.find(c => c.id == id);
        if (cot) {
          cot.membre = membre;
          cot.mois = mois;
          cot.montant = montant;
          cot.statut = statut;
          cot.description = description;
        }
      } else {
        cotisations.push({
          id: cotisations.length + 1,
          membre,
          mois,
          montant,
          statut,
          date: new Date().toISOString().split('T')[0],
          description
        });
      }

      afficherCotisations();
      form.reset();
      document.getElementById('edit-id').value = '';
    });
  }

  // Afficher tableau au chargement du module
  document.addEventListener('click', e => {
    if (e.target.closest('a[onclick^="showModule(\'comptes\'")')) {
      setTimeout(afficherCotisations, 100);
    }
  });
});

// Édition
function editCotisation(id) {
  const cot = cotisations.find(c => c.id == id);
  if (cot) {
    document.getElementById('edit-id').value = id;
    document.getElementById('membre').value = cot.membre;
    document.getElementById('mois').value = cot.mois;
    document.getElementById('montant').value = cot.montant;
    document.getElementById('statut').value = cot.statut;
    document.getElementById('description').value = cot.description;
  }
}

// Suppression
function deleteCotisation(id) {
  if (confirm("Supprimer cette cotisation ?")) {
    cotisations = cotisations.filter(c => c.id != id);
    afficherCotisations();
  }
}

// Export PDF simple
function exporterCotisationsPDF() {
  const content = document.getElementById('table-cotisations').outerHTML;
  const win = window.open('', '_blank');
  win.document.write(`<html><head><title>Cotisations AISP</title></head><body>${content}</body></html>`);
  win.document.close();
  win.print();
}
