document.addEventListener("DOMContentLoaded", () => {

  const sections = ["home", "question1", "question2", "question3", "results"];
  let currentIndex = 0; 
  
  const resultQ1 = document.querySelector("#result-q1");
  const resultQ2 = document.querySelector("#result-q2");
  const resultQ3 = document.querySelector("#result-q3");

  const answers = {
    "q1" : null,  
    "q2": null,  
    "q3": []
  }

  function getQ1Rating() {
    const selected = document.querySelector('input[name="q1_rating"]:checked');
    console.log("Note d'évaluation:", selected ? selected.value + "/5" : "None");

    return selected ? selected.value : null;
  }

  function getQ2Recommendation() {
    const selected = document.querySelector('input[name="q2_recommend"]:checked');
    console.log("Recommanderiez-vous l'application:", selected ? selected.value : null);
    
    return selected ? selected.value : null;
  }

  function getQ3Features() {
      // Array.from: NodeList converti en tableau -> map() pour le parcourir
      const featuresChecked = Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(input => input.value);
      const otherFeature = document.querySelector('input[name="feature_other"]').value.trim();
      
      if (otherFeature) featuresChecked.push(otherFeature);

      console.log("Fonctionnalités sélectionnées:", featuresChecked);
      console.log("Autre fonctionnalité:", otherFeature);

      return featuresChecked;
  }

  function showCurrentSection() {
    sections.forEach((id, index) => {
        document.getElementById(id).style.display = (index === currentIndex) ? "flex" : "none";
    });
  }

  showCurrentSection();

  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const errorMessage = document.querySelector(".error-message");
      errorMessage.textContent = "";
      errorMessage.style.display = "none";

      if (currentIndex === 0) {
        currentIndex++;
        showCurrentSection();
      }

      else if (currentIndex === 1) {
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
        answers.q3 = getQ3Features();
        console.log(answers);
        
      } else {
        currentIndex++;
        if (currentIndex >= sections.length) currentIndex = sections.length - 1; 
        showCurrentSection();
      }

    });
  });

});