import { useState } from "react";

const questions = [
  {
    question: "If 2x + 3 = 11, find x",
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    question: "What comes next: 2, 4, 8, ?",
    options: ["10", "12", "14", "16"],
    answer: "16",
  },
  {
    question: "If 5 workers take 5 days, how many days for 1 worker?",
    options: ["5", "10", "20", "25"],
    answer: "25",
  },
];

function Aptitude() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setSelected("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div style={styles.container}>
      {!showResult ? (
        <div style={styles.card}>
          <h2>Question {current + 1}</h2>
          <p>{questions[current].question}</p>

          {questions[current].options.map((opt) => (
            <label key={opt} style={styles.option}>
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selected === opt}
                onChange={(e) => setSelected(e.target.value)}
              />
              {opt}
            </label>
          ))}

          <button
            onClick={handleNext}
            disabled={!selected}
            style={styles.button}
          >
            {current + 1 === questions.length ? "Submit" : "Next"}
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <h2>Result</h2>
          <p>
            Score: {score} / {questions.length}
          </p>
          <p>Accuracy: {(score / questions.length) * 100}%</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },
  card: {
    background: "#fff",
    padding: "20px",
    width: "350px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  option: {
    display: "block",
    margin: "10px 0",
  },
  button: {
    marginTop: "15px",
    padding: "8px 16px",
    cursor: "pointer",
  },
};

export default Aptitude;
