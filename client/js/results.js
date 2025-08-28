document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('results.html')) return;

  // DOM references (no HTML strings here)
  const heading = document.getElementById('results-heading');
  const scoreCard = document.getElementById('score-card');
  const scoreValue = document.getElementById('score-value');
  const totalValue = document.getElementById('total-value');
  const percentValue = document.getElementById('percent-value');
  const noResults = document.getElementById('no-results');
  const resultsList = document.getElementById('results-list');

  try {
    const raw = localStorage.getItem('quizResults');
    if (!raw) {
      noResults.classList.remove('d-none');
      scoreCard.classList.add('d-none');
      return;
    }

    const data = JSON.parse(raw);
    const { category, score, total, userResults } = data;
    heading.textContent = '🎉 Well done on completing your Quiz! 🎉';

    let percent = 0;
    if (total > 0) {
      percent = Math.round((score / total) * 100);
    } else {
      percent = 0;
    }
    if (score == null) {
      scoreValue.textContent = 0;
    } else {
      scoreValue.textContent = score;
    }
    if (total == null) {
      totalValue.textContent = 0;
    } else {
      totalValue.textContent = total;
    }
    percentValue.textContent = percent;

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

    (async function () {
      try {
        let username = null;
        try { 
          username = localStorage.getItem('username'); 
        } catch (error) {
          console.error('Failed to retrieve username from localStorage:', error);
        }

        if (!username) {
          const p = new URLSearchParams(window.location.search);
          username = p.get('username');
        }

        let correctCount = 0;
        if (typeof score === 'number') {
          correctCount = score;
        } else if (Array.isArray(userResults)) {
          for (let i = 0; i < userResults.length; i++) {
            if (userResults[i] && userResults[i].isCorrect === true) {
              correctCount = correctCount + 1;
            }
          }
        }

        let subjectCat = '';
        if (category) {
          subjectCat = String(category).toUpperCase();
        }
        const body = {
          username,
          totalquizzes: 1
        };

        if (subjectCat === 'GEO') { body.geographycorrect = correctCount; }
        else if (subjectCat === 'MUS') { body.musiccorrect = correctCount; }
        else if (subjectCat === 'HIS') { body.historycorrect = correctCount; }
        else if (subjectCat === 'SPA') { body.spanishcorrect = correctCount; }
        else {
          console.warn('Unknown subject category; skipping stats update:', subjectCat);
          return;
        }

        const opts = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') || ''
          },
          body: JSON.stringify(body)
        };

        const resp = await fetch(`http://localhost:3000/userstats/${username}`, opts);
        const dataResp = await resp.json();
        console.log('User stats updated:', resp.status, dataResp);
      } catch (err) {
        console.error('Unable to update the user stats:', err);
      }
    })();

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

  } catch (err) {
    console.error('Failed to render results:', err);
    noResults.textContent = 'Not able to display your results.';
    noResults.classList.remove('d-none');
    scoreCard.classList.add('d-none');
  }
});
