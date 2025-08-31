document.addEventListener("DOMContentLoaded", () => {

  const sections = ["home", "question1", "question2", "question3", "results"];
  let currentIndex = 0; 
  
  const resultQ1 = document.querySelector("#result-q1");
  const resultQ2 = document.querySelector("#result-q2");
  const resultQ3 = document.querySelector("#result-q3");

  const answers = {
    "q1" : null,  
  }

  function getQ1Rating() {
    const selected = document.querySelector('input[name="q1_rating"]:checked');
    console.log("Note d'évaluation:", selected ? selected.value + "/5" : "None");

    return selected ? selected.value : null;
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

        if (currentIndex === 1) {
          answers.q1 = getQ1Rating();
          console.log(answers);
        }

        currentIndex++;
        if (currentIndex >= sections.length) currentIndex = sections.length - 1; 
        showCurrentSection();

    });
  });

});