function setupGame() {

  const grid = document.querySelector('.grid')
  const width = 10
  const cells = []
  const snakePositions = [44, 45, 46]
  const playButton = document.querySelector('#start')
  let foodPosition

  let snakeHead = snakePositions[snakePositions.length - 1]
  const final2difference = snakePositions[1] - snakePositions[0]
  // let direction = 'right'
  let snakeInterval
  let speed = 1000
  let playing = false

  //make the grid 10 x 10 
  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    grid.appendChild(div)
    cells.push(div)
  }


  playButton.addEventListener('click', () => {
    if (playing) return
    playing = true

    // set up the snake to be 2 squares in starting position (this works)
    snakePositions.forEach((snakePosition) => {
      cells[snakePosition].classList.add('snake')
    })

    showRandomFood()


    //EVENT LISTENERS
    document.addEventListener('keydown', (event) => {


      if (event.key === 'ArrowUp') {
        clearInterval(snakeInterval)
        snakeInterval = setInterval(() => {
          if (snakeHead < width) {
            return alert('You lost!')
          }
          snakeUp()
          growSnake()
        }, speed)


      } else if (event.key === 'ArrowDown') {
        clearInterval(snakeInterval)
        snakeInterval = setInterval(() => {
          if (snakeHead > cells.length - width) {
            alert('You lost!')
          }
          snakeDown()
          growSnake()
        }, speed)


      } else if (event.key === 'ArrowRight') {
        clearInterval(snakeInterval)
        snakeInterval = setInterval(() => {
          if ((snakeHead + 1) % 10 === 0) {
            alert('You lost!')
          }
          snakeRight()
          growSnake()
        }, speed)


      } else if (event.key === 'ArrowLeft') {
        clearInterval(snakeInterval)
        snakeInterval = setInterval(() => {
          if (snakeHead % 10 === 0) {
            alert('You lost!')
          }
          snakeLeft()
          growSnake()
        }, speed)
      }
    })

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
      console.log('food pos' + foodPosition)
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
      if (snakeHead === foodPosition) {
        cells[foodPosition].classList.remove('food')
        snakePositions.unshift((snakePositions[0] - final2difference))
        renderGame()
        // speed -= 500
        showRandomFood()
      }
    }
    growSnake()














  })


}




window.addEventListener('DOMContentLoaded', setupGame)