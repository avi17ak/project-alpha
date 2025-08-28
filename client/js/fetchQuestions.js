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
        headers: { Authorization: localStorage.getItem("token") },
      };

      const resp = await fetch(
        `http://localhost:3000/questions/subject/${category}`,
        options
      );

      console.log("Response status:", resp.status);
      if (!resp.ok) throw new Error(`API request failed (${resp.status})`);

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
      console.error("⚠️ Tried to render undefined question at index:", currentIndex);
      return;
    }

    questionContainer.textContent = q.question ?? "⚠️ Missing question text";
    difficultyContainer.textContent = `Difficulty: ${q.difficulty ?? "N/A"}`;

    const options = [q.answer, q.optionone, q.optiontwo, q.optionthree].filter(Boolean);

    if (options.length === 0) {
      console.error("⚠️ No options found for question:", q);
      contentContainer.innerHTML = "<p>No options available</p>";
      return;
    }

    options.sort(() => Math.random() - 0.5);

    contentContainer.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn", "btn-outline-primary", "btn", "m-1");
      btn.textContent = opt;

      btn.addEventListener("click", () => {
        contentContainer.querySelectorAll("button").forEach((b) => {b.disabled = true;});
        checkAnswer(opt, q.answer, btn);
      });

      contentContainer.appendChild(btn);
    });
  }

  function checkAnswer(selected, correct, btn) {
    userResults.push({
      index: currentIndex,
      question: questions[currentIndex]?.question ?? "",
      selected,
      correct,
      isCorrect: selected === correct,
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

  function showResults() {
    try {
      const payload = { category, score, total: questions.length, userResults };
      localStorage.setItem("quizResults", JSON.stringify(payload));
    } catch (e) {
      console.error("Could not save quiz results to localStorage:", e);
    }
    const resultsPath = window.location.pathname.replace("mainQuestions.html", "results.html");
    window.location.href = resultsPath.includes("results.html") ? resultsPath : "/client/pages/results.html";
  }
});
