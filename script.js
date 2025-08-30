document.addEventListener("DOMContentLoaded", () => {

  const sections = ["home", "question1", "question2", "question3", "results"];
  let currentIndex = 0; 

  function showCurrentSection() {
    sections.forEach((id, index) => {
        document.getElementById(id).style.display = (index === currentIndex) ? "flex" : "none";
    });
  }

  showCurrentSection();

  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
        currentIndex++;
        if (currentIndex >= sections.length) currentIndex = sections.length - 1; 
        showCurrentSection();
    });
  });

});