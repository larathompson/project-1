function setupGame() {

  //select the grid constants
  const grid = document.querySelector('.grid')
  const width = 10
  const cells = []
  const snakePositions = [44, 45, 46]
  const playButton = document.querySelector('#start')
  let foodPosition
  let snakeHead = snakePositions[snakePositions.length - 1]
  const final2difference = snakePositions[1] - snakePositions[0] //so in any direction when food meets snake, we can add snake square to end of array
  const direction = []

  //make the grid 10 x 10 (this works)
  for (let i = 0; i < width ** 2; i++) {
    // create my cell
    const div = document.createElement('div')
    // add class of cell
    div.classList.add('cell')
    // appended that cell to my actual page!
    grid.appendChild(div)
    cells.push(div)
  }

  //add event listenener to put the snake and food on grid when player presses start
  playButton.addEventListener('click', () => {

    // set up the snake to be 2 squares in starting position (this works)
    snakePositions.forEach((snakePosition) => {
      cells[snakePosition].classList.add('snake')
    })

    //render function - call this every time you want the grid cleared - clears all the squares then updates snake positions
    function renderGame() {
      cells.forEach(cell => {
        cell.classList.remove('snake')
      })

      snakePositions.forEach((snakePosition) => {
        cells[snakePosition].classList.add('snake')
      })
    }

    //get snake to move every second - THIS WORKS 
    function defaultMoveSnakes() {
      setInterval(() => {
        snakePositions.forEach((snakePosition, i) => {
          snakePositions[i] = snakePositions[i] + 1
        })
        renderGame()
      }, 1000)
    }
    // defaultMoveSnakes() NEEED TO ADD THIS  IN


    // get the food to pop up in random position (this works)
    function showRandomFood() {
      foodPosition = cells[Math.floor(Math.random() * cells.length)]
      foodPosition.classList.add('food')
    }
    showRandomFood()


    //detect collision of wall and snakeHead
    function moveOrWallCollide() {
      //event listeners to the arrow buttons
      // need to be insync with the collision eg. if the snakehead<width && arrow ley pressed is up
      document.addEventListener('keydown', (event) => {


        if (event.key === 'ArrowUp') { //put these in time loops  //and the direction is right
          if (snakeHead < width) { //when on top row, if you click up the game ends
            return alert('You lost!') //need to add and also end the game
          }
          //move nsake head up by the width and add to back of array
          //sift the rest along one (array method shift)
          //remove the first item from the array
          snakeHead = snakePositions[snakePositions.length - 1] - width
          snakePositions.shift()
          snakePositions.push(snakeHead)
          renderGame()
          


        } else if (event.key === 'ArrowDown') {
          if (snakeHead > cells.length - width) {
            alert('You lost!')
          }
          snakeHead = snakePositions[snakePositions.length - 1] + width
          snakePositions.shift()
          snakePositions.push(snakeHead)
          renderGame()







          
        } else if (event.key === 'ArrowRight') {
          if ((snakeHead + 1) % 10 === 0) {
            alert('You lost!')
          }
          console.log('move position appropriately then render game')



        } else if (event.key === 'ArrowLeft') {
          if (snakeHead % 10 === 0)
            alert('You lost!')
        }
        console.log('move position appropriately then render game')
      }
      )
    }
    moveOrWallCollide()

    function growSnake() {  //this is NOT working 
      if (snakeHead === foodPosition) {
        console.log('hello')
        cells[foodPosition].classList.remove('food')
        snakePositions.unshift((snakePositions[0] - final2difference))
        renderGame()  //putting a new snake sq at the beginng of array - this should work in all directions
        // renderGame() // this should add the snake tiles on all of the tiles
        // showRandomFood() //now replace a different bit of food
      }
    }
    // growSnake()




    function moveUp() {  //minus 10 from the index each time - THIS NEEDS TO BE DONE ONCE ITS GONE ROUND THE CORNER TO KEEP IT GOING UP UNTIL ANOTHER KEY IS CLICKED
      setInterval(() => {
        snakePositions.forEach((snakePosition, i) => {
          snakePositions[i] = snakePositions[i] - width
        })
        renderGame()
      }, 1000)
    }









  })


}




window.addEventListener('DOMContentLoaded', setupGame)