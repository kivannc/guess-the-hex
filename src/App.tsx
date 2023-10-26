import { useState } from "react";
import "./App.css";

type GameState = {
  colors: string[];
  selectedIndex: number;
};

type Result = "Correct" | "Wrong" | undefined;

function createRandomState(): GameState {
  return {
    colors: [...new Array(3)].map(getRandomColor),
    selectedIndex: Math.floor(Math.random() * 3),
  };
}

function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [gameState, setGameState] = useState<GameState>(createRandomState());
  const [result, setResult] = useState<Result>();
  const [score, setScore] = useState<number>(0);
  const selectedColor = gameState.colors[gameState.selectedIndex];

  function colorClicked(index: number) {
    if (index == gameState.selectedIndex) {
      setResult("Correct");
      setGameState(createRandomState);
      setScore(score + 1);
    } else {
      setResult("Wrong");
      setScore(0);
    }
  }

  return (
    <>
      <h1 className="title">Guess the hex</h1>
      <div
        className="guess-box"
        style={{ backgroundColor: selectedColor }}
      ></div>
      <div className="button-box">
        <button onClick={() => colorClicked(0)}>{gameState.colors[0]}</button>
        <button onClick={() => colorClicked(1)}>{gameState.colors[1]}</button>
        <button onClick={() => colorClicked(2)}>{gameState.colors[2]}</button>
      </div>
      <div style={{ height: "140px" }}>
        {result ? (
          <>
            <div className={result.toLocaleLowerCase()}>{result}</div>
            <div className={result.toLocaleLowerCase()}>{score}</div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
