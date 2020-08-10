function setupGame() {

  const grid = document.querySelector('.grid')
  // const width = 10 ORIGINAL
  const width = 10
  const cells = []
  let snakePositions = [44, 45, 46]
  const playButton = document.querySelector('#start')
  const playAgainButton = document.querySelector('#endbutton')
  let foodPosition
  const endgame = document.querySelector('.endgame')

  let snakeHead = snakePositions[snakePositions.length - 1]
  const final2difference = snakePositions[1] - snakePositions[0]
  // let direction = 'goingRight' //need to set a default for moving snakes right
  let snakeInterval
  let speed = 800
  let playing = false
  let EventListenersActivated = false
  const points = document.querySelector('#points')
  const lives = document.querySelector('#lives')
  let pointCount = 0
  let liveCount = 3
  const header = document.querySelector('header')
  const endOfGameText = document.querySelector('h2')
  const movingSquares = document.querySelectorAll('.square')
  const introMusic = document.querySelector('#intro')
  const biteMusic = document.querySelector('#bite')
  const lostMusic = document.querySelector('#lostLife')
  const cheer = document.querySelector('#cheer')



  const direction = Object.freeze({
    NONE: 'none',
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down'
  })
  let currentDirection = direction.NONE


  grid.style.display = 'none'
  header.style.display = 'none'

  


  //make the grid 10 x 10 
  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    grid.appendChild(div)
    cells.push(div)
  }


  playButton.addEventListener('click', () => {
    introductionMusic()   
    grid.style.display = 'flex'
    header.style.display = 'flex'
    removeMovingSquares()
    playButton.style.display = 'none'



    if (playing) return
    playing = true

    // set up the snake to be 2 squares in starting position (this works)
    snakePositions.forEach((snakePosition) => {
      cells[snakePosition].classList.add('snake')
    })

    showRandomFood()

    function addEventListeners() {
      if (EventListenersActivated) return
      EventListenersActivated = true
      document.addEventListener('keydown', (event) => {


        if (event.key === 'ArrowUp' && (currentDirection !== direction.UP) && (currentDirection !== direction.DOWN)) {
          clearInterval(snakeInterval)
          snakeInterval = setInterval(() => {
            if (snakeHead < width && liveCount === 1) {
              endGame()
              clearInterval(snakeInterval)

              return
            } else if (snakeHead < width && liveCount > 1) {
              liveReset()
              renderGame()
              resetSpeed()
              clearInterval(snakeInterval)


            } else {
              snakeUp()
              growSnake()
              collision()
              currentDirection = direction.UP
            }
          }, speed)


        } else if (event.key === 'ArrowDown' && (currentDirection !== direction.UP) && (currentDirection !== direction.DOWN)) {
          clearInterval(snakeInterval)
          snakeInterval = setInterval(() => {
            if (snakeHead > cells.length - width && liveCount === 1) {
              endGame()
              clearInterval(snakeInterval)
              return
            } else if (snakeHead > cells.length - width && liveCount > 1) {
              liveReset()
              renderGame()
              resetSpeed()
              clearInterval(snakeInterval)


            } else {
              snakeDown()
              growSnake()
              collision()
              currentDirection = direction.DOWN
            }

          }, speed)


        } else if (event.key === 'ArrowRight' && (currentDirection !== direction.RIGHT) && (currentDirection !== direction.LEFT)) {
          clearInterval(snakeInterval)
          snakeInterval = setInterval(() => {
            if ((snakeHead + 1) % 10 === 0 && liveCount === 1) {
              endGame()
              clearInterval(snakeInterval)
              return
            } else if ((snakeHead + 1) % 10 === 0 && liveCount > 1) {
              liveReset()
              renderGame()
              resetSpeed()
              clearInterval(snakeInterval)

            } else {
              snakeRight()
              growSnake()
              collision()
              currentDirection = direction.RIGHT
            }

          }, speed)


        } else if (event.key === 'ArrowLeft' && (currentDirection !== direction.RIGHT) && (currentDirection !== direction.LEFT) && (currentDirection !== direction.NONE)) {
          clearInterval(snakeInterval)
          snakeInterval = setInterval(() => {
            if (snakeHead % 10 === 0 && liveCount === 1) {
              endGame()
              clearInterval(snakeInterval)
              return
            } else if (snakeHead % 10 === 0 && liveCount > 1) {
              liveReset()
              
              renderGame()
              resetSpeed()
              clearInterval(snakeInterval)

            } else {
              snakeLeft()
              growSnake()
              collision()
              currentDirection = direction.LEFT
            }

          }, speed)
        }
      })
    }
    addEventListeners()
    // ************ FUNCTIONS ************************************************

    function renderGame() {
      cells.forEach((cell) => {
        cell.classList.remove('snake')
      })

      snakePositions.forEach((snakePosition) => {
        cells[snakePosition].classList.add('snake')
      })
    }

    //SHOW RANDOM FOOD
    function showRandomFood() {
      foodPosition = Math.floor(Math.random() * cells.length)
      while (snakePositions.indexOf(foodPosition) !== -1) {
        foodPosition = Math.floor(Math.random() * cells.length)
      }

      cells[foodPosition].classList.add('food')
    }




    //MOVE SNAKE UP
    function snakeUp() {
      snakeHead = snakePositions[snakePositions.length - 1] - width
      snakePositions.shift()
      snakePositions.push(snakeHead)

      renderGame()
    }
    //MOVE SNAKE DOWN
    function snakeDown() {
      snakeHead = snakePositions[snakePositions.length - 1] + width
      snakePositions.shift()
      snakePositions.push(snakeHead)

      renderGame()
    }
    //MOVE SNAKE LEFT
    function snakeLeft() {
      snakeHead = snakePositions[snakePositions.length - 1] - 1
      snakePositions.shift()
      snakePositions.push(snakeHead)

      renderGame()
    }
    // MOVE SNAKE RIGHT
    function snakeRight() {
      snakeHead = snakePositions[snakePositions.length - 1] + 1
      snakePositions.shift()
      snakePositions.push(snakeHead)

      renderGame()
    }
    //MAKE THE SNAKE LONGER
    function growSnake() {

      if (snakePositions[snakePositions.length - 1] === foodPosition) {
        playBiteMusic()
        pointCount += 100
        points.innerHTML = 'Points: ' + pointCount
        cells[foodPosition].classList.remove('food')
        snakePositions.unshift(snakePositions[0] - 1)
        renderGame()
        increaseSpeed()
        showRandomFood()
      }
    }
    // growSnake()


    //change the speeds *********
    function increaseSpeed() {
      speed = speed * 0.8
    }

    function resetSpeed() {
      speed = 800
    }


    function collision() {
      for (let i = 0; i < snakePositions.length - 2; i++) {
        if ((snakePositions[snakePositions.length - 1]) === snakePositions[i] && liveCount === 0) {
          endGame()
          clearInterval(snakeInterval)
        } else if ((snakePositions[snakePositions.length - 1]) === snakePositions[i] && liveCount > 0) {
          liveReset()
          renderGame()
          clearInterval(snakeInterval)
        }
      }
    }


    // END GAME
    function endGame() {
      hideGridshowScore()
      introMusic.pause()
      
      playCheerMusic()

      playAgainButton.addEventListener('click', () => {

        grid.style.display = 'flex' //show grid
        header.style.display = 'block'
        playButton.style.display = 'block'
        // endgame.style.display = 'none'
        endgame.style.display = 'block'
        playAgainButton.style.display = 'none'
        endOfGameText.style.display = 'none'
        pointCount = 0
        points.innerHTML = 'Points: ' + pointCount
        liveCount = 3
        lives.innerHTML = 'Lives: ' + liveCount
        speed = 800
        snakePositions = [44, 45, 46]
        snakeHead = snakePositions[snakePositions.length - 1]
        currentDirection = direction.NONE
        playing = false
        return
      })


    }

    function liveReset() {
      liveCount -= 1
      lives.innerHTML = 'Lives: ' + liveCount
      snakePositions = [44, 45, 46]
      snakeHead = snakePositions[snakePositions.length - 1]
      currentDirection = direction.NONE
      clearInterval(snakeInterval)
      playLostMusic()
    }

    function hideGridshowScore() {
      cells.forEach((cell) => {
        cell.classList.remove('snake') //remove the snake
      })
      cells.forEach((cell) => {
        cell.classList.remove('food') //remove the food 
      })
      grid.style.display = 'none' //remove the grid
      header.style.display = 'none'
      playButton.style.display = 'none'
      endgame.style.display = 'block'
      playAgainButton.style.display = 'block'
      endOfGameText.style.display = 'block'
      document.querySelector('span').innerHTML = pointCount
    }


    function removeMovingSquares() {


      const sq1 = document.querySelector('#square1')
      sq1.style.display = 'none'

      const sq2 = document.querySelector('#square2')
      sq2.style.display = 'none'

      const sq3 = document.querySelector('#square3')
      sq3.style.display = 'none'

      const sq4 = document.querySelector('#square4')
      sq4.style.display = 'none'

      const sq5 = document.querySelector('#square5')
      sq5.style.display = 'none'


      const sq6 = document.querySelector('#square6')
      sq6.style.display = 'none'


      const sq7 = document.querySelector('#square7')
      sq7.style.display = 'none'

      const sq8 = document.querySelector('#square8')
      sq8.style.display = 'none'

      const sq9 = document.querySelector('#square9')
      sq9.style.display = 'none'

      const sq10 = document.querySelector('#square10')
      sq10.style.display = 'none'

    }//end f functuo


    function introductionMusic() {
      introMusic.currentTime = 0
      introMusic.play()
    }

    function playBiteMusic() {
      biteMusic.play()
    }

    function playLostMusic() {
      lostMusic.play()
    }

    function playCheerMusic() {
      cheer.play()
    }








  })

  


}




window.addEventListener('DOMContentLoaded', setupGame)