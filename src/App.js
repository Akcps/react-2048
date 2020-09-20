import React, { useState, useEffect } from 'react';
import './App.css';
import Container from "./component/Container"

function App() {
  const [gridValues, setGridValues] = useState([0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [score, setScore] = useState(0)
  const [result, setResult] = useState("")

  const width = 4

  useEffect(() => {
    const keyPress = (event) => {
      console.log ("Key pressed")
      console.log (event.keyCode)
      if(event.keyCode === 37) {
        keyLeft()
      } else if (event.keyCode === 38) {
        keyUp()
      } else if (event.keyCode === 39) {
        keyRight()
      } else if (event.keyCode === 40) {
        keyDown()
      }
    };
    window.addEventListener('keydown', keyPress);

    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  }, [gridValues, score])


  async function keyRight() {
    let values = await moveRight(gridValues)
    let [newValues, newScore] = await combineRow(values, score)
    await checkForWin(newValues)
    newValues = await moveRight(newValues)
    newValues = await generate(newValues)
    setGridValues(newValues)
    console.log("Latest score ", newScore)
    setScore(newScore)
  }

  async function keyLeft() {
    let values = await moveLeft(gridValues)
    let [newValues, newScore] = await combineRow(values, score)
    await checkForWin(newValues)
    newValues = await moveLeft(newValues)
    newValues = await generate(newValues)
    setGridValues(newValues)
    console.log("Latest score ", newScore)
    setScore(newScore)
  }

  async function keyUp() {
    let values = await moveUp(gridValues)
    let [newValues, newScore] = await combineColumn(values, score)
    await checkForWin(newValues)
    newValues = await moveUp(newValues)
    newValues = await generate(newValues)
    setGridValues(newValues)
    console.log("Latest score ", newScore)
    setScore(newScore)
  }

  async function keyDown() {
    let values = await moveDown(gridValues)
    let [newValues, newScore] = await combineColumn(values, score)
    await checkForWin(newValues)
    newValues = await moveDown(newValues)
    newValues = await generate(newValues)
    setGridValues(newValues)
    console.log("Latest score ", newScore)
    setScore(newScore)
  }

  async function moveRight(gridValues) {
    console.log("Move Right")
    let newGridValues = [...gridValues]
    for (let i=0; i < gridValues.length; i++) {
      if (i % 4 === 0) {
        let totalOne = gridValues[i]
        let totalTwo = gridValues[i+1]
        let totalThree = gridValues[i+2]
        let totalFour = gridValues[i+3]
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        newGridValues[i] = newRow[0]
        newGridValues[i + 1] = newRow[1]
        newGridValues[i + 2] = newRow[2]
        newGridValues[i + 3] = newRow[3]
        console.log("NEW ROW ", newRow)
      }
    }
    console.log("Done Move Right")
    console.log(newGridValues)
    return newGridValues
  }

  async function moveLeft() {
    console.log("Move Left")
    let newGridValues = [...gridValues]
    for (let i=0; i < gridValues.length; i++) {
      if (i % 4 === 0) {
        let totalOne = gridValues[i]
        let totalTwo = gridValues[i+1]
        let totalThree = gridValues[i+2]
        let totalFour = gridValues[i+3]
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        newGridValues[i] = newRow[0]
        newGridValues[i + 1] = newRow[1]
        newGridValues[i + 2] = newRow[2]
        newGridValues[i + 3] = newRow[3]
        console.log("NEW ROW ", newRow)
      }
    }
    console.log("Done Move Left")
    console.log(newGridValues)
    return newGridValues
  }

  async function moveUp(gridValues) {
    console.log("Move up")
    let newGridValues = [...gridValues]
    for (let i=0; i < width; i++) {
      
      let totalOne = gridValues[i]
      let totalTwo = gridValues[i+(width*1)]
      let totalThree = gridValues[i+(width*2)]
      let totalFour = gridValues[i+(width*3)]
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      newGridValues[i] = newColumn[0]
      newGridValues[i+(width*1)] = newColumn[1]
      newGridValues[i+(width*2)] = newColumn[2]
      newGridValues[i+(width*3)] = newColumn[3]
      console.log("NEW COLUMN ", newColumn)
      
    }
    console.log("Done Move up")
    console.log(newGridValues)
    return newGridValues
  }

  async function moveDown(gridValues) {
    console.log("Move down")
    let newGridValues = [...gridValues]

    for (let i=0; i < width; i++) {
      
      let totalOne = gridValues[i]
      let totalTwo = gridValues[i+(width*1)]
      let totalThree = gridValues[i+(width*2)]
      let totalFour = gridValues[i+(width*3)]
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      newGridValues[i] = newColumn[0]
      newGridValues[i+(width*1)] = newColumn[1]
      newGridValues[i+(width*2)] = newColumn[2]
      newGridValues[i+(width*3)] = newColumn[3]
      console.log("NEW COLUMN ", newColumn)
      
    }
    console.log("Done Move down")
    console.log(newGridValues)
    return newGridValues
  }

  async function combineRow(gridValues, score) {
    console.log("Combine Row")
    let newGridValues = [...gridValues]
    let newScore = score
    for (let i = 0; i < gridValues.length - 1; i++) {
      if (gridValues[i] === gridValues[i + 1]) {
        let combinedTotal = parseInt(gridValues[i]) + parseInt(gridValues[i + 1])
        newGridValues[i] = combinedTotal
        newGridValues[i + 1] = 0
        console.log("Old Score ", newScore)
        newScore += combinedTotal
        console.log("New Score", newScore)
      }
    }
    console.log("Done Combine Row")
    console.log(newGridValues)
    return [newGridValues, newScore]
  }

  async function combineColumn(gridValues, score) {
    console.log("Combine Column")
    console.log(gridValues)
    let newGridValues = [...gridValues]
    let newScore = score
    for (let i = 0; i < 12; i++) {
      if (gridValues[i] === gridValues[i +width]) {
        let combinedTotal = parseInt(gridValues[i]) + parseInt(gridValues[i + width])
        newGridValues[i] = combinedTotal
        newGridValues[i + 1] = 0
        console.log("Old Score ", newScore)
        newScore += combinedTotal
        console.log("New Score", newScore)
      }
    }
    console.log("Done Combine Column")
    console.log(newGridValues)
    return [newGridValues, newScore]
  }



  async function generate(gridValues) {
      console.log("Generate ")
      let newGridValues = [...gridValues]
      let randomNumber = Math.floor(Math.random() * gridValues.length)
      console.log("Random Number", randomNumber)
      let gameOver = checkForGameOver()
      if (!gameOver) {
        if (gridValues[randomNumber] === 0) {
          newGridValues[randomNumber] = 2
        } else {
          return generate(gridValues)
        }
      } else {
        setGridValues(gridValues)
        console.log("Game already over")
      }
      console.log("Returning from Generate ")
      console.log(newGridValues)
      return newGridValues
  }

  async function checkForWin() {
    console.log("checkForWin ")
    for (let i = 0; i < gridValues.length; i++) {
      if (gridValues[i] === 2048) {
        setResult('You WIN')
        console.log('You WON')
        document.removeEventListener('keydown', useEffect)
      }
    }
    console.log("Returning from check for win ")
  }

  function checkForGameOver() {
    let zeros = 0
    for (let i=0; i < gridValues.length; i++) {
      if (gridValues[i] === 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      setResult('You LOSE')
      console.log('You LOOOOOOOOST')
      document.removeEventListener('keyup', useEffect)
      return true
    }
    return false
  }


  return (
    <div className="App">
      <header className="App-header">
        <Container gridValues={gridValues} score={score} result={result}/>
      </header>
    </div>
  );
}

export default App;
