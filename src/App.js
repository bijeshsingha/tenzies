import React from "react"
import './App.css';
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [highScore, setHighScore] = React.useState(localStorage.getItem("highScore") || 20000)



  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      setScore(count)
      console.log(count)
      if (count < highScore) {
        setHighScore(count)
        localStorage.setItem("highScore", count)
      }
      setCount(0)
    }

  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const [count, setCount] = React.useState(0)

  function rollDice() {
    setCount(count + 1)
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setScore(0)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))



  //console.log(localStorage.getItem("highScore"))
  const width = window.innerWidth
  const height = window.innerHeight
  return (
    <main>
      {tenzies && <Confetti
        width={width}
        height={height}
      />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div className="stats">
        <h2>Score: {score}</h2>
        <h2>High Score: {highScore > 10000 ? score : highScore}</h2>
      </div>
    </main>
  );
}

export default App;
