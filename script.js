/**
 * DailyApp Feedback: questionnaire interactif
 * Gère la navigation entre les sections et la collecte des réponses utilisateur
 */
document.addEventListener("DOMContentLoaded", () => {
  const sections = ["home", "question1", "question2", "question3", "results"];
  let currentIndex = 0; 
  
  // Réf vers éléments d'affichage des résultats
  const resultQ1 = document.querySelector("#result-q1");
  const resultQ2 = document.querySelector("#result-q2");
  const resultQ3 = document.querySelector("#result-q3");

  /**
   * Objet answers  contenant toutes les réponses de l'utilisateur
   * @type {Object}
   * @property {string|null} q1 - Note de 1 à 5 pour l'évaluation globale
   * @property {string|null} q2 - Réponse "yes_q2" ou "no_q2" pour la recommandation
   * @property {Array<string>} q3 - array des fonctionnalités sélectionnées
   */
  const answers = {
    "q1" : null,  
    "q2": null,  
    "q3": []
  }

  /**
   * Récupère note sélectionnée pour la question 1 (évaluation globale)
   * @returns {string|null} La valeur de la note 1-5 ou null si aucune sélection
   */
  function getQ1Rating() {
    const selected = document.querySelector('input[name="q1_rating"]:checked');
    console.log("Note d'évaluation:", selected ? selected.value + "/5" : "None");

    return selected ? selected.value : null;
  }

  /**
   * Récupère la réponse sélectionnée pour la question 2 (recommandation)
   * @returns {string|null} "yes_q2" ou "no_q2" ou null si aucune sélection
   */
  function getQ2Recommendation() {
    const selected = document.querySelector('input[name="q2_recommend"]:checked');
    console.log("Recommanderiez-vous l'application:", selected ? selected.value : null);
    
    return selected ? selected.value : null;
  }

  /**
   * Récupère les fonctionnalités sélectionnées pour la question 3
   * + gère aussi le champ "Autre" avec validation
   * @returns {Array<string>|string} Liste des fonctionnalités ou "error_other_is_empty" en cas d'erreur
   */
  function getQ3Features() {
      // Array.from: NodeList converti en tableau -> map() pour le parcourir
      const featuresChecked = Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(input => input.value);
      const otherCheckbox = document.querySelector('input[value="other_feature"]:checked');
      const otherFeature = document.querySelector('input[name="feature_other"]'); 
      
      // Validation si "Autre" est coché mais le champ texte est vide
      if (otherCheckbox && (!otherFeature || !otherFeature.value.trim())) {
        return "error_other_is_empty";
      }
      
      // Ajouter le contenu du champ "Autre" s'il est renseigné
      if (otherFeature && otherFeature.value.trim()) {
        featuresChecked.push(otherFeature.value.trim());
      }

      console.log("Fonctionnalités sélectionnées:", featuresChecked);
      console.log("Autre fonctionnalité:", otherFeature);

      return featuresChecked;
  }

  /**
   * Efface tous les messages d'erreur affichés dans l'application
   */
  function clearErrorMessages() {
    document.querySelectorAll(".error-message").forEach(msg => {
      msg.textContent = "";
      msg.style.display = "none";
    });
  }

  /**
   * Affiche uniquement la section correspondant à currentIndex
   * Cache toutes les autres sections
   */
  function showCurrentSection() {
    sections.forEach((id, index) => {
        document.getElementById(id).style.display = (index === currentIndex) ? "flex" : "none";
    });
  }

  showCurrentSection(); // at first display home section

  /**
   * Gestionnaire d'événements pour tous les boutons "Suivant"
   * Gère la navigation, la validation et la sauvegarde des réponses
   */
  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      clearErrorMessages(); 

      if (currentIndex === 0) {
        // Navigation Page d'accueil à Q1
        currentIndex++;
        showCurrentSection();
      }

      else if (currentIndex === 1) {
        // Validation et navigation Q1 à Q2
        answers.q1 = getQ1Rating();

        if (answers.q1) {
            resultQ1.textContent = answers.q1 + "/5";
            console.log(answers);
            currentIndex++;
            showCurrentSection();
        } else {
            const currentSection = document.getElementById("question1");
            const q1ErrorMessage = currentSection.querySelector(".error-message");
            q1ErrorMessage.textContent = "Veuillez sélectionner une note avant de continuer.";
            q1ErrorMessage.style.display = "flex";
            return; 
        }

      } else if (currentIndex === 2) {
        // Validation et navigation Q2 à Q3
        answers.q2 = getQ2Recommendation();
        if (answers.q2) {
          resultQ2.textContent = answers.q2 === "yes_q2" ? "Oui" : "Non";
          console.log(answers);
          currentIndex++;
          showCurrentSection();
        } else {
          const currentSection = document.getElementById("question2");
          const q2ErrorMessage = currentSection.querySelector(".error-message");
          q2ErrorMessage.textContent = "Veuillez sélectionner une réponse avant de continuer.";
          q2ErrorMessage.style.display = "flex";
          return;
        }

      } else if (currentIndex === 3) {
        // Validation et navigation Q3 à results 
        answers.q3 = getQ3Features(); 
        if (answers.q3 === "error_other_is_empty") {
          //  "Autre" coché mais champ vide
          const currentSection = document.getElementById("question3");
          const q3ErrorMessage = currentSection.querySelector(".error-message");
          q3ErrorMessage.textContent = "Veuillez renseigner le champ 'Autre' ou décochez cette option.";
          q3ErrorMessage.style.display = "flex";
          return;

        } else if (answers.q3.length > 0) {
          // success
          resultQ3.textContent = answers.q3.join(", ");
          console.log(answers);
          currentIndex++;
          showCurrentSection();

        } else {
          //Error
          const currentSection = document.getElementById("question3");
          const q3ErrorMessage = currentSection.querySelector(".error-message");
          q3ErrorMessage.textContent = "Veuillez sélectionner au moins une fonctionnalité avant de continuer.";
          q3ErrorMessage.style.display = "flex";
        }
        
      } else {
        // Navigation par défaut 
        currentIndex++;
        if (currentIndex >= sections.length) currentIndex = sections.length - 1; 
        showCurrentSection();
      }
    });
  });

});