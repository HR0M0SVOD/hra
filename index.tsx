import React, { useState, FormEvent } from 'react';
import { createRoot } from 'react-dom/client';

const questions = [
  { 
    question: "Můj původ je v Grónsku. Pomáhám s taháním saní a mám velmi hustou bílou srst. Mám ostré uši a oči, které vypadají jako špicové.",
    answer: "Samojed" 
  },
  { 
    question: "Mám hustou srst, která mě chrání před zimou. Původně jsem žil v Japonsku, kde jsem byl společník samurajů. Jsem velký a silný a mám kulatý a zakroucený ocas.",
    answer: "Akita-Inu"
  },
  { 
    question: "Jaká kapela hrála na 'Pekelným ostrově 2025' na stage DOTIkO dne 4. 7. 2025 jako poslední?",
    answer: "TRAKTOR"
  },
  { 
    question: "Jméno a příjmení letce ze Ševětína, který bojoval za druhé světové války u letky RAF.",
    answer: "Václav Hořejší"
  },
];

const FINAL_CODE = "2325";

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [revealedCode, setRevealedCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isSafeOpen, setIsSafeOpen] = useState(false);

  const handleAnswerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim().toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
      const newRevealedCode = [...revealedCode];
      newRevealedCode[currentQuestionIndex] = FINAL_CODE[currentQuestionIndex];
      setRevealedCode(newRevealedCode);
      
      setUserAnswer('');
      setError('');
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setIsGameComplete(true);
      }
    } else {
      setError('CHYBA');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleOpenSafe = () => {
    setIsSafeOpen(true);
  };

  return (
    <main className="app-container">
      <div className={`safe-wrapper ${isSafeOpen ? 'open' : ''}`}>
        <div className="safe-interior">
          PRO OTEVŘENÍ PRAVÉHO TREZORU POUŽIJTE KÓD "{FINAL_CODE}"
        </div>
        <div className="safe-door">
          <div className="safe-hinge"></div>
          <div className="safe-hinge"></div>
          <div className="code-display">
            {revealedCode.map((digit, index) => (
              <div key={index} className="code-digit" aria-label={`Digit ${index + 1}`}>
                {digit}
              </div>
            ))}
          </div>
          <div className="safe-handle">
            <div className="safe-handle-inner"></div>
          </div>
        </div>
      </div>
      
      {!isSafeOpen && (
        <div className="quiz-container">
          {!isGameComplete ? (
            <>
              <p className="question" id="question-text">
                {questions[currentQuestionIndex].question}
              </p>
              <form className="answer-form" onSubmit={handleAnswerSubmit}>
                <input
                  type="text"
                  className="answer-input"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Vaše odpověď..."
                  aria-labelledby="question-text"
                  required
                />
                <button type="submit" className="submit-btn">Odeslat odpověď</button>
              </form>
              <p className="error-message" role="alert">{error}</p>
            </>
          ) : (
            <button className="open-safe-btn" onClick={handleOpenSafe}>Otevři trezor</button>
          )}
        </div>
      )}
    </main>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
