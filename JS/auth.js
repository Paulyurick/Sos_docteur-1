// Basculement entre Malade et Urgentiste
function switchRole() {
    const roleRadio = document.querySelector('input[name="userRole"]:checked');
    if (!roleRadio) return;
    
    const selectedRole = roleRadio.value;

    const patientFields = document.getElementById('fields-patient');
    const doctorFields = document.getElementById('fields-doctor');
    const labelPatient = document.getElementById('label-patient');
    const labelDoctor = document.getElementById('label-doctor');

    if (selectedRole === 'doctor') {
        doctorFields.style.display = 'block';
        patientFields.style.display = 'none';
        labelDoctor.classList.add('active');
        labelPatient.classList.remove('active');
    } else {
        patientFields.style.display = 'block';
        doctorFields.style.display = 'none';
        labelPatient.classList.add('active');
        labelDoctor.classList.remove('active');
    }
}

// Gestion de la modale des numéros d'urgence
function openEmergencyModal() {
    document.getElementById('emergency-modal').classList.add('active');
}

function closeEmergencyModal(event) {
    // Ferme si on clique sur le bouton de fermeture ou en dehors de la carte
    if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('modal-close')) {
        document.getElementById('emergency-modal').classList.remove('active');
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    switchRole();
});

// 1. Basculement entre les champs Malade et Urgentiste
function switchRole() {
    const roleRadio = document.querySelector('input[name="userRole"]:checked');
    if (!roleRadio) return;
    
    const selectedRole = roleRadio.value;

    const patientFields = document.getElementById('fields-patient');
    const doctorFields = document.getElementById('fields-doctor');
    const labelPatient = document.getElementById('label-patient');
    const labelDoctor = document.getElementById('label-doctor');

    if (selectedRole === 'doctor') {
        doctorFields.style.display = 'block';
        patientFields.style.display = 'none';
        labelDoctor.classList.add('active');
        labelPatient.classList.remove('active');
    } else {
        patientFields.style.display = 'block';
        doctorFields.style.display = 'none';
        labelPatient.classList.add('active');
        labelDoctor.classList.remove('active');
    }
}

// 2. Ouvertures / Fermetures de la modale des numéros d'urgence
function openEmergencyModal() {
    const modal = document.getElementById('emergency-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeEmergencyModal(event) {
    if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('modal-close')) {
        const modal = document.getElementById('emergency-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
}

// 3. Initialisation et gestion de la redirection lors de la création du compte
document.addEventListener('DOMContentLoaded', () => {
    // Initialise le bon affichage au chargement
    switchRole();

    // Écoute la soumission du formulaire d'inscription
    const form = document.querySelector('.auth-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement brutal de la page
            
            const selectedRole = document.querySelector('input[name="userRole"]:checked').value;

            if (selectedRole === 'patient') {
                // Récupère le prénom du malade
                const firstName = document.getElementById('fname').value;
                // Enregistre le prénom temporairement dans le navigateur
                localStorage.setItem('patientFname', firstName || 'Patient');
                
                // Redirige vers la page d'accueil malade
                window.location.href = 'patient-home.html';
            } else {
                alert("Compte Urgentiste créé avec succès !");
            }
        });
    }
});

function openEmergencyModal() {
    // 1. Vérification de la géolocalisation
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Si la géolocalisation réussit
                alert("🚨 ALERTE ENVOYÉE !\n\nVotre position a été transmise. Les centres hospitaliers et urgentistes les plus proches de votre secteur ont été localisés et prévenus.");
            },
            (error) => {
                // Si le malade refuse la géolocalisation ou si elle échoue
                alert("🚨 ALERTE SOS DÉCLENCHÉE !\n\nLes services d'urgence les plus proches ont été alertés. Veuillez activer la géolocalisation de votre téléphone pour une intervention plus précise.");
            }
        );
    } else {
        // Si le navigateur ne gère pas la géolocalisation
        alert("🚨 ALERTE SOS DÉCLENCHÉE !\n\nVotre signalement d'urgence a été transmis aux centres hospitaliers les plus proches.");
    }
}

// ==========================================
// REDIRECTION VERS LE DASHBOARD URGENTISTE
// ==========================================
const authForm = document.querySelector('form'); // ciblage du formulaire d'authentification

if (authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Bloque le rechargement automatique de la page

        // Vérifie quel rôle est sélectionné
        const selectedRole = document.querySelector('input[name="userRole"]:checked')?.value;

        if (selectedRole === 'doctor') {
            // Récupère et sauvegarde le prénom/nom du médecin si renseigné
            const doctorName = document.getElementById('fname')?.value || 'Docteur';
            localStorage.setItem('doctorName', doctorName);

            // Redirection vers la page du dashboard Urgentiste
            window.location.href = 'dashbord.html';
        } else {
            // Sauvegarde le prénom du patient
            const patientFname = document.getElementById('fname')?.value || 'Patient';
            localStorage.setItem('patientFname', patientFname);

            // Redirection vers la page Patient
            window.location.href = 'patient-home.html';
        }
    });
}