// fetchQuestions.js

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

  if (!category) {
    questionContainer.textContent = "No category selected.";
    return;
  }

  fetchQuestionData(category);

  // --- Fetch all questions ---
  async function fetchQuestionData(category) {
    try {
      console.log("📡 Fetching questions for category:", category);

      const resp = await fetch(
        `http://localhost:3000/questions/subject/${category}`
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

    //Need array to shuffle options on page
    const options = [q.answer, q.optionone, q.optiontwo, q.optionthree].filter(
      Boolean
    );

    if (options.length === 0) {
      console.warn("⚠️ No options found for question:", q);
      contentContainer.innerHTML = "<p>No options available</p>";
      return;
    }

    // Shuffle
    options.sort(() => Math.random() - 0.5);

    // Render
    contentContainer.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn", "btn", "btn-outline-primary", "m-1");
      btn.textContent = opt;

      btn.addEventListener("click", () => {
        checkAnswer(opt, q.answer);
      });

      contentContainer.appendChild(btn);
    });
  }

  function checkAnswer(selected, correct) {
    if (selected === correct) {
      score++;
      console.log("✅ Correct! Score:", score);
    } else {
      console.log("❌ Wrong. Correct answer was:", correct);
    }

    currentIndex++;
    if (currentIndex < questions.length) {
      renderQuestion(questions[currentIndex]);
    } else {
      showResults();
    }
  }

  //Results at end of quiz n
  function showResults() {
    questionContainer.textContent = "🎉 Quiz Finished!";
    difficultyContainer.textContent = "";
    contentContainer.innerHTML = `<p>Your final score is: ${score} / ${questions.length}</p>`;
  }
});
