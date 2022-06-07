function printHighscores() {
    // Get scores from history or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("scores")) || [];
  
    // Display scores in descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // create li tag for each score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // Displays scores to the page
      var olEl = document.getElementById("scores");
      olEl.appendChild(liTag);
    });
  }
  
//   Clears the scores
  function clearHighscores() {
    window.localStorage.removeItem("scores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // run function when page loads
  printHighscores();
  