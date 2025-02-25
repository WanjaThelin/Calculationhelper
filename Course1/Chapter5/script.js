// Load the exercises data
fetch('exercises.json')
  .then(response => response.json())
  .then(data => {
    let currentExerciseIndex = 0;
    let currentHintIndex = 0;

    const exerciseContainer = document.getElementById('exercise-container');
    const exerciseListDiv = document.getElementById('exercise-list');

    // Populate the exercise list
    function populateExerciseList() {
      const list = document.createElement('ul');
      list.className = 'exercise-list';

      data.forEach((exercise, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'exercise-item';
        listItem.textContent = exercise.title ? exercise.title : `Uppgift ${index + 1}`;
        listItem.onclick = () => loadExercise(index);
        list.appendChild(listItem);
      });

      exerciseListDiv.appendChild(list);
    }

    // Load an exercise based on index
    function loadExercise(index) {
      currentExerciseIndex = index;
      const exercise = data[index];
      currentHintIndex = 0;

      exerciseContainer.innerHTML = `
        <div id="question" class="alert alert-primary">${exercise.Uppgift}</div>
        <div class="mb-3">
          <button id="hint-button" class="btn btn-warning mr-2">Visa Tips</button>
          <button id="answer-button" class="btn btn-success">Visa Lösning</button>
        </div>
        <div id="hints"></div>
        <div id="answer" class="alert alert-success mt-3" style="display: none;">Lösning: ${exercise.Lösning}</div>
        <div class="mt-4">
          <button id="prev-button" class="btn btn-outline-secondary mr-2">Föregående Uppgift</button>
          <button id="next-button" class="btn btn-outline-secondary">Nästa Uppgift</button>
        </div>
      `;

      document.getElementById('hint-button').onclick = () => showHint(exercise.Tips);
      document.getElementById('answer-button').onclick = showAnswer;
      document.getElementById('prev-button').onclick = prevExercise;
      document.getElementById('next-button').onclick = nextExercise;

      // Highlight the selected exercise in the list
      highlightSelectedExercise(index);
    }

    // Function to highlight the selected exercise
    function highlightSelectedExercise(index) {
      const exerciseItems = document.querySelectorAll('.exercise-item');
      exerciseItems.forEach((item, idx) => {
        if (idx === index) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
    }

    function showHint(hints) {
      if (currentHintIndex < hints.length) {
        const hintsDiv = document.getElementById('hints');
        const hint = document.createElement('div');
        hint.className = 'alert alert-warning';
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
        loadExercise(currentExerciseIndex - 1);
      } else {
        alert('Detta är den första uppgiften.');
      }
    }

    function nextExercise() {
      if (currentExerciseIndex < data.length - 1) {
        loadExercise(currentExerciseIndex + 1);
      } else {
        alert('Detta är den sista uppgiften.');
      }
    }

    // Populate the exercise list and load the first exercise
    populateExerciseList();
    loadExercise(currentExerciseIndex);
  })
  .catch(error => console.error('Error loading exercises:', error));
