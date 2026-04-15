"use client";

import { useEffect, useMemo, useState } from "react";

const letterLines = [
  "Dear Dixita,",
  "Hello beautiful soul. I wanted to say this slowly and honestly, from the softest part of my heart.",
  "I am sorry for not giving you the time you deserved. I was waiting and assuming you would come to me first, and that was my mistake.",
  "I also know I was angry because I felt unheard, but that does not change the fact that I should have handled things with more patience, care, and love.",
  "You matter to me more than my pride, and I regret the moments where I let silence speak louder than my feelings.",
  "I do not want distance to become the language between us. I want to listen better, understand better, and show up better.",
  "So this is my apology, my promise, and my heart, all in one place.",
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function Home() {
  const [revealedLines, setRevealedLines] = useState(0);
  const [showLovePrompt, setShowLovePrompt] = useState(false);
  const [showYesPopup, setShowYesPopup] = useState(false);
  const [showNoPopup, setShowNoPopup] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 66, y: 58 });
  const [noClicks, setNoClicks] = useState(0);

  const heartBursts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: `${(index * 7 + 9) % 96}%`,
        delay: `${(index % 7) * 0.7}s`,
        size: 14 + (index % 5) * 4,
      })),
    []
  );

  useEffect(() => {
    let index = 0;
    let timeoutId;

    const revealNext = () => {
      index += 1;
      setRevealedLines(index);

      if (index < letterLines.length) {
        timeoutId = window.setTimeout(revealNext, 1150);
        return;
      }

      timeoutId = window.setTimeout(() => setShowLovePrompt(true), 1100);
    };

    timeoutId = window.setTimeout(revealNext, 800);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!showLovePrompt) return;

    const wander = () => {
      setNoButtonPos((current) => {
        const nextX = clamp(current.x + (Math.random() * 38 - 19), 8, 72);
        const nextY = clamp(current.y + (Math.random() * 34 - 17), 10, 68);
        return { x: nextX, y: nextY };
      });
    };

    const timer = window.setInterval(wander, 1800);
    return () => window.clearInterval(timer);
  }, [showLovePrompt]);

  const handleNoAttempt = () => {
    setNoClicks((value) => value + 1);
    setShowNoPopup(true);
    setNoButtonPos({
      x: clamp(16 + Math.random() * 54, 8, 72),
      y: clamp(20 + Math.random() * 44, 10, 68),
    });
  };

  return (
    <main className="page-shell">
      <div className="sky sky-a" />
      <div className="sky sky-b" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      <section className="card">
        <div className="floating-hearts" aria-hidden="true">
          {heartBursts.map((heart) => (
            <span
              key={heart.id}
              className="heart"
              style={{
                left: heart.left,
                animationDelay: heart.delay,
                fontSize: `${heart.size}px`,
              }}
            >
              {"<3"}
            </span>
          ))}
        </div>

        <p className="eyebrow">A tiny note from the heart</p>
        <h1 className="title">
          <span className="title-kicker">Hello</span>
          <span className="title-name">Dixita</span>
        </h1>
        <p className="subtitle">
          I made this as a soft little apology, wrapped in warmth, honesty, and a lot of love.
        </p>

        <div className="letter">
          {letterLines.map((line, index) => (
            <p key={line} className={`letter-line ${index < revealedLines ? "visible" : ""}`}>
              {line}
            </p>
          ))}
        </div>

        <div className="seal">
          <span className="seal-label">From the one who wants to do better</span>
          <span className="seal-mark">{"<3"}</span>
        </div>

        {showLovePrompt ? (
          <div className="love-box">
            <p className="love-text">I love you, Dixita.</p>
            <p className="question">Do you love me back?</p>

            <div className="choice-wrap">
              <button className="choice yes" type="button" onClick={() => setShowYesPopup(true)}>
                Yes
              </button>

              <button
                className="choice no"
                type="button"
                style={{ left: `${noButtonPos.x}%`, top: `${noButtonPos.y}%` }}
                onPointerEnter={handleNoAttempt}
                onPointerDown={(event) => {
                  event.preventDefault();
                  handleNoAttempt();
                }}
                onClick={handleNoAttempt}
              >
                No
              </button>
            </div>

            <p className="microcopy">Try the gentle button first. The other one is a little shy.</p>
            {noClicks > 0 ? <p className="microcopy blink">The No button is being dramatic today.</p> : null}
          </div>
        ) : (
          <div className="typing">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        )}
      </section>

      {showYesPopup ? (
        <div className="popup-backdrop" role="dialog" aria-modal="true">
          <div className="popup">
            <div className="popup-emoji">sparkles</div>
            <h2>Congratulations!!!</h2>
            <p>My heart just smiled. Thank you for saying yes, Dixita.</p>
            <button className="popup-btn" type="button" onClick={() => setShowYesPopup(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}

      {showNoPopup ? (
        <div className="popup-backdrop" role="dialog" aria-modal="true">
          <div className="popup">
            <div className="popup-emoji">fish</div>
            <h2>Nice try</h2>
            <p>You can't say no. I know that you love me.</p>
            <button className="popup-btn" type="button" onClick={() => setShowNoPopup(false)}>
              Okay, okay
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
