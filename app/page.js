const letterLines = [
  "Dear Dixita,",
  "Hello beautiful soul. I wanted to say this slowly and honestly, from the softest part of my heart.",
  "I am sorry for not giving you the time you deserved. I was waiting and assuming you would come to me first, and that was my mistake.",
  "I also know I was angry because I felt unheard, but that does not change the fact that I should have handled things with more patience, care, and love.",
  "You matter to me more than my pride, and I regret the moments where I let silence speak louder than my feelings.",
  "I do not want distance to become the language between us. I want to listen better, understand better, and show up better.",
  "So this is my apology, my promise, and my heart, all in one place.",
];

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="page-shell" id="top">
      <div className="sky sky-a" aria-hidden="true" />
      <div className="sky sky-b" aria-hidden="true" />
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />

      <section className="card">
        <div className="floating-hearts" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <span
              key={index}
              className="heart"
              style={{
                left: `${(index * 7 + 9) % 96}%`,
                animationDelay: `${(index % 7) * 0.7}s`,
                fontSize: `${14 + (index % 5) * 4}px`,
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
            <p
              key={line}
              className="letter-line"
              style={{
                animationDelay: `${index * 1.05}s`,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="seal">
          <span className="seal-label">From the one who wants to do better</span>
          <span className="seal-mark">{"<3"}</span>
        </div>

        <div className="love-box">
          <p className="love-text">I love you, Dixita.</p>
          <p className="question">Do you love me back?</p>

          <div className="choice-wrap" aria-label="Love choice">
            <a className="choice yes" href="#yes-popup">
              Yes
            </a>
            <a className="choice no" href="#no-popup">
              No
            </a>
          </div>

          <p className="microcopy">Try the gentle button first. The other one is a little shy.</p>
          <p className="microcopy blink">The No button keeps wandering around.</p>
        </div>
      </section>

      <section id="yes-popup" className="popup-backdrop" aria-label="Yes popup">
        <div className="popup">
          <div className="popup-emoji">sparkles</div>
          <h2>Congratulations!!!</h2>
          <p>My heart just smiled. Thank you for saying yes, Dixita.</p>
          <a className="popup-btn" href="#top">
            Close
          </a>
        </div>
      </section>

      <section id="no-popup" className="popup-backdrop" aria-label="No popup">
        <div className="popup">
          <div className="popup-emoji">fish</div>
          <h2>Nice try</h2>
          <p>You can't say no. I know that you love me.</p>
          <a className="popup-btn" href="#top">
            Okay, okay
          </a>
        </div>
      </section>
    </main>
  );
}
