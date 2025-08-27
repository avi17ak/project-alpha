// --- Logout button ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token"); // remove JWT
      alert("You have been logged out.");
      window.location.assign("index.html"); // redirect to login page
    });
  }

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("mainQuestions.html")) return;

  const questionContainer = document.querySelector(".question-container");
  const difficultyContainer = document.querySelector(".difficulty");
  const contentContainer = document.querySelector(".quiz-content");

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let userResults = [];

  if (!category) {
    questionContainer.textContent = "No category selected.";
    return;
  }

  fetchQuestionData(category);

  async function fetchQuestionData(category) {
    try {
      console.log("📡 Fetching questions for category:", category);
      const options = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      console.log(`http://localhost:3000/questions/subject/${category}`);

      const resp = await fetch(
        `http://localhost:3000/questions/subject/${category}`,
        options
      );

      console.log("Response status:", resp.status);

      if (!resp.ok) {
        throw new Error("API request failed");
      }

      const data = await resp.json();
      console.log("Raw API response:", data);

      questions = Array.isArray(data) ? data : data.data;

      if (!Array.isArray(questions) || questions.length === 0) {
        questionContainer.textContent = "No questions found for this category.";
        console.warn("⚠️ No questions found in API response");
        return;
      }

      console.log(`✅ Loaded ${questions.length} questions`);
      renderQuestion(questions[currentIndex]);
    } catch (err) {
      console.error("Error fetching question:", err);
      questionContainer.textContent = "Error loading question.";
    }
  }

  function renderQuestion(q) {
    if (!q) {
      console.error(
        "⚠️ Tried to render undefined question at index:",
        currentIndex
      );
      return;
    }

    questionContainer.textContent = q.question ?? "⚠️ Missing question text";
    difficultyContainer.textContent = `Difficulty: ${q.difficulty ?? "N/A"}`;

    const options = [q.answer, q.optionone, q.optiontwo, q.optionthree].filter(
      Boolean
    );

    if (options.length === 0) {
      console.error("⚠️ No options found for question:", q);
      contentContainer.innerHTML = "<p>No options available</p>";
      return;
    }

    options.sort(() => Math.random() - 0.5);

    contentContainer.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      const answers = document.getElementsByClassName("option-btn");

      btn.classList.add("option-btn", "btn-outline-primary", "btn", "m-1");
      // "btn", "btn-outline-primary", "m-1"
      btn.textContent = opt;

      btn.addEventListener("click", () => {
        checkAnswer(opt, q.answer, btn);
      });

      contentContainer.appendChild(btn);
    });
  }

  function checkAnswer(selected, correct, btn) {
    // record this attempt
    userResults.push({
      index: currentIndex,
      question: questions[currentIndex]?.question ?? "",
      selected,
      correct,
      isCorrect: selected === correct
    });
    if (selected === correct) {
      score++;
      console.log("✅ Correct! Score:", score);
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-success");
    } else {
      console.log("❌ Wrong. Correct answer was:", correct);
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-danger");
    }
    setTimeout(() => {
      currentIndex++;
      if (currentIndex < questions.length) {
        renderQuestion(questions[currentIndex]);
      } else {
        showResults();
      }
    }, 1000);
  }

  //Results at end of quiz n
  function showResults() {
    // Headline
    questionContainer.textContent = "🎉 Quiz Finished!";
    difficultyContainer.textContent = "";

    // Score summary
    const percent = Math.round((score / questions.length) * 100);
    const summary = document.createElement("div");
    summary.className = "results-summary mb-3";
    summary.innerHTML = `
      <h2 class="h4">Your score</h2>
      <p class="lead mb-1"><strong>${score}</strong> / ${questions.length} (${percent}%)</p>
    `;

    // Detailed breakdown
    const list = document.createElement("ol");
    list.className = "list-group list-group-numbered";

    userResults.forEach((res, i) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex flex-column align-items-start";
      const emoji = res.isCorrect ? "✅" : "❌";
      const answerLine = res.isCorrect
        ? `<span class="badge text-bg-success ms-2">Correct</span>`
        : `<span class="badge text-bg-danger ms-2">Incorrect</span>`;

      li.innerHTML = `
        <div class="w-100 d-flex justify-content-between align-items-start">
          <div class="fw-semibold">${emoji} ${res.question}</div>
          ${answerLine}
        </div>
        <div class="mt-1 small">
          <div><strong>Your answer:</strong> ${res.selected}</div>
          <div><strong>Correct answer:</strong> ${res.correct}</div>
        </div>
      `;
      list.appendChild(li);
    });

    // Action buttons
    const actions = document.createElement("div");
    actions.className = "mt-3 d-flex gap-2";
    const retryBtn = document.createElement("a");
    retryBtn.href = window.location.pathname + window.location.search;
    retryBtn.className = "btn btn-primary";
    retryBtn.textContent = "Try Again";

    const homeBtn = document.createElement("a");
    homeBtn.href = "/client/pages/index.html";
    homeBtn.className = "btn btn-outline-secondary";
    homeBtn.textContent = "Back to Home";

    actions.appendChild(retryBtn);
    actions.appendChild(homeBtn);

    // Render
    contentContainer.innerHTML = "";
    contentContainer.appendChild(summary);
    contentContainer.appendChild(list);
    contentContainer.appendChild(actions);
  }
});
