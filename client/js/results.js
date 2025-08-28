document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('results.html')) return;

  // DOM references (no HTML strings here)
  const headingEl = document.getElementById('results-heading');
  const scoreCard = document.getElementById('score-card');
  const scoreValueEl = document.getElementById('score-value');
  const totalValueEl = document.getElementById('total-value');
  const percentValueEl = document.getElementById('percent-value');
  const noResultsEl = document.getElementById('no-results');
  const resultsList = document.getElementById('results-list');

  try {
    const raw = localStorage.getItem('quizResults');
    if (!raw) {
      noResultsEl.classList.remove('d-none');
      scoreCard.classList.add('d-none');
      return;
    }

    const data = JSON.parse(raw);
    const { category, score, total, userResults } = data;
    headingEl.textContent = '🎉 Well done on completing your Quiz! 🎉';

    let percent = 0;
    if (total > 0) {
      percent = Math.round((score / total) * 100);
    } else {
      percent = 0;
    }
    if (score == null) {
      scoreValueEl.textContent = 0;
    } else {
      scoreValueEl.textContent = score;
    }
    if (total == null) {
      totalValueEl.textContent = 0;
    } else {
      totalValueEl.textContent = total;
    }
    percentValueEl.textContent = percent;

    const OUTCOME = {
      true:  { emoji: '✅', badgeText: 'Correct',  badgeClass: 'text-bg-success' },
      false: { emoji: '❌', badgeText: 'Incorrect', badgeClass: 'text-bg-danger'  }
    };

    resultsList.innerHTML = '';

    userResults.forEach((res) => {
      let isCorrectKey;
      if (res.isCorrect) {
        isCorrectKey = "true";
      } else {
        isCorrectKey = "false";
      }
      const conf = OUTCOME[isCorrectKey];
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex flex-column align-items-start';

      const topRow = document.createElement('div');
      topRow.className = 'w-100 d-flex justify-content-between align-items-start';

      const leftSide = document.createElement('div');
      leftSide.className = 'fw-semibold';
      const emoji = document.createElement('span');
      emoji.className = 'outcome-emoji';
      emoji.textContent = conf.emoji;
      const questionText = document.createElement('span');
      questionText.className = 'question-text';

      if (res.question) {
        questionText.textContent = res.question;
      } else {
        questionText.textContent = '';
      }

      leftSide.appendChild(emoji);
      leftSide.appendChild(document.createTextNode(' '));
      leftSide.appendChild(questionText);

      const badgeElement = document.createElement('span');
      badgeElement.className = 'badge outcome-badge ' + conf.badgeClass;
      badgeElement.textContent = conf.badgeText;

      topRow.appendChild(leftSide);
      topRow.appendChild(badgeElement);

      const answersDiv = document.createElement('div');
      answersDiv.className = 'mt-1 small';

      const userAns = document.createElement('div');
      if (res.selected) {
        userAns.innerHTML = '<strong>Your answer:</strong> ' + res.selected;
      } else {
        userAns.innerHTML = '<strong>Your answer:</strong> ';
      }

      const correctAns = document.createElement('div');
      if (res.correct) {
        correctAns.innerHTML = '<strong>Correct answer:</strong> ' + res.correct;
      } else {
        correctAns.innerHTML = '<strong>Correct answer:</strong> ';
      }

      answersDiv.appendChild(userAns);
      answersDiv.appendChild(correctAns);

      li.appendChild(topRow);
      li.appendChild(answersDiv);

      resultsList.appendChild(li);
    });

    const retryBtn = document.getElementById('retry-btn');
    const homeBtn  = document.getElementById('home-btn');
    if (retryBtn) {
      if (category) {
        href = `mainQuestions.html?category=${category}`;
      }
      retryBtn.setAttribute('href', href);
    }
    if (homeBtn) {
      homeBtn.setAttribute('href', 'homepage.html');
    }

  } catch (e) {
    console.error('Failed to render results:', e);
    noResultsEl.textContent = 'Not able to display your results.';
    noResultsEl.classList.remove('d-none');
    scoreCard.classList.add('d-none');
  }
});
