// Load the exercises data
fetch('exercises.json')
  .then(response => response.json())
  .then(data => {
    let currentExerciseIndex = 0;
    let currentHintIndex = 0;

    const exerciseContainer = document.getElementById('exercise-container');

    function loadExercise(index) {
      const exercise = data[index];
      currentHintIndex = 0;

      exerciseContainer.innerHTML = `
        <div id="question">${exercise.Uppgift}</div>
        <button id="hint-button">Visa Tips</button>
        <button id="answer-button">Visa Lösning</button>
        <div id="hints"></div>
        <div id="answer" style="display: none;">Lösning: ${exercise.Lösning}</div>
        <button id="prev-button">Föregående Uppgift</button>
        <button id="next-button">Nästa Uppgift</button>
      `;

      document.getElementById('hint-button').onclick = () => showHint(exercise.Tips);
      document.getElementById('answer-button').onclick = showAnswer;
      document.getElementById('prev-button').onclick = prevExercise;
      document.getElementById('next-button').onclick = nextExercise;
    }

    function showHint(hints) {
      if (currentHintIndex < hints.length) {
        const hintsDiv = document.getElementById('hints');
        const hint = document.createElement('div');
        hint.textContent = `Tips ${currentHintIndex + 1}: ${hints[currentHintIndex]}`;
        hintsDiv.appendChild(hint);
        currentHintIndex++;
      } else {
        alert('Inga fler tips tillgängliga.');
      }
    }

    function showAnswer() {
      document.getElementById('answer').style.display = 'block';
    }

    function prevExercise() {
      if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        loadExercise(currentExerciseIndex);
      } else {
        alert('Detta är den första uppgiften.');
      }
    }

    function nextExercise() {
      if (currentExerciseIndex < data.length - 1) {
        currentExerciseIndex++;
        loadExercise(currentExerciseIndex);
      } else {
        alert('Detta är den sista uppgiften.');
      }
    }

    // Load the first exercise
    loadExercise(currentExerciseIndex);
  })
  .catch(error => console.error('Error loading exercises:', error));
