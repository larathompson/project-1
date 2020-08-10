# project-1

# Project 1 - Snake

# Overview

This is the first project that I completed on the software enginnering immersive course at GA, London. The aim of the task was to interact with the DOM, incorporating the CSS, HTML and JavaScipt skills we had learnt to create a grid-based game. The game had to be completed independently over the course of a week.

Given the list of archaic games, I chose to build Snake. The neon design and music chosen aims to make the game feel fun and exciting when played. 

You can play the game [here](https://larathompson.github.io/project-1/), or find the GitHub repository [here](https://github.com/larathompson/project-1). 



## Brief: 

Snake is a single-player game where the player earns points by guiding the snake to eat food randomly placed on the game board. Each item of food the snake eats the longer it grows. The game is over if the snake hits the edge of the board, or itself. To make things even more challenging, the snake increases speed as its gets longer!

The aim of the game is to stay alive as long as possible.

Requirements

* The snake should be able to eat food to grow bigger
* The game should end when the snake hits the wall or itself
* Snake speeds up as it eats more

## Technologies Used

- HTML
- Javascript
- CSS
- CSS Animations
- Google Fonts
- DOM
- Downloaded Sounds
- Git and GitHub

# Approach

Firstly, I defined all variables that I would be using in the Javascript. Most variables defined used the 'document.querySelector' in order to get them from the index.html file. I also set some variables to Boolean values, this meant that later on in the game, I could ensure the game was only started once. I also used 'let' when defining some variables as this meant that later, I was able to reassign them. Additionally, I chose to store the direction that the snake was moving in an object - this meant that I could easily identify which way the snake was moving and meant that only certain event listeneners were activated depending on which way the snake was moving (eg. you can only press the left/right arrow key when the snake is moving up/down). 


# Game Set-Up
Initially, I used a font which I imported from Google Fonts and used Neon Glow CSS effects. To make the effect stand out, I used white text with a shadow and an animation (animation: neonGlow 0.2s infinite alternate) in order to make it look like it was pulsating on the page. 

I also wanted to build of the theme of snake and so designed squares which were animated to move around the page whilst the user was choosing to play the game. In order to get the squares to follow each other , I made 'divs' for each of the squares and gave them the same animation, however, they each had a slightly different duration. If I were to do this project again, I would use a more efficient method to design this animation. (MAYBE I COULD USE THE METHOD THAT I MADE THE GRID IN AND THEN USE THE CSS ANIMATIONS TO FOCUS ON THE NTH CHILD ETC TO GIVE EACH ONE A DIFFERENT ANIMATION)



In order to get the start game/play again page, I used the DOM. The 'play button' had an event listener and when clicked by the user, the game music started playing, the grid transitioned into appearing, the lives and points board appeared, the moving squares animation disappeared and the boolean value of playing changed from false to true (this meant that the play button could not be clicked twice). 

In order to make the grid, I used a 'for' loop - this was more efficient than making each of the divs individually in HTML. For each of the divs I added the class of 'cell' - this styled the grid so that each cell had a white dashed border and was 10% of the grid in height and width (10 x 10 grid). 



for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    grid.appendChild(div)
    cells.push(div)
  }

At the start of the game, the location of the snake was represented by an array which located the snake centrally on the board (let snakePositions = [44, 45, 46]). In future, I would use a different formula to position the snakes so that they would be positioned centrally no matter what the the size of the board was. These snake positions are updated in response to the event listeners on the arrow keys. The location of food is randomely generated on the board using the following function: 

function showRandomFood() {
      foodPosition = Math.floor(Math.random() * cells.length)
      while (snakePositions.indexOf(foodPosition) !== -1) {
        foodPosition = Math.floor(Math.random() * cells.length)
      }

      cells[foodPosition].classList.add('food')
    }

    The function above randomely selected a cell from the 100 cells on the grid. I used a while loop to ensure that the food position was only getting set while the snake position was not the same as the food position - if it was, a new food position had to be generated and only then, could the classList of food be added (this set the cell to green). I thought that the while loop was the best option for this as it meant that if food was continoulsy generated within the snake positions, it would continue to generate new numbers until the position was outside of the snake. 


  # Playing the game

  In order to control the snake, the arrow keys are pressed. Each of these keys have event listeneners on and different functions are run depending on the direction that the snake is initiailly moving, the location on the board and the number of lives that the player has. For each key, the following functions can happen (I will use the 'up' arrow key as an example):

  if (event.key === 'ArrowUp' && (currentDirection !== direction.UP) && (currentDirection !== direction.DOWN)) {
          clearInterval(snakeInterval)
          snakeInterval = setInterval(() => {
            if (snakeHead < width && liveCount === 1) {
              endGame()
              clearInterval(snakeInterval)

              return

  This click event is only activated if the snake is currently moving left or right. When activted, the previous interval is cleared (this means that the previous snake movements are cleared and prevents multiple set intervals running simulatenously). 


# Arrow up results in end of game 
  If the user hits the wall by pressing the up arrow (snakeHead < width && liveCount === 1)) and they only had one life, the game is ended. 

  The endGame() function takes the user to results page. Here, the DOM is used to hide the grid and show the user the number of points they scored, whilst giving them the option to play again. The points are displayed by using the DOM to change the inner.HTML of the points (the user scores +100 points for every bit of food eaten). The boolean value of 'playing' is also reassigned to be false. This means that the player is given the option to play again. The other variables that were reassigned during the previous game are also reset in order to return the game to its default settings eg. speed, snake Positions, lives and points. 

  # Arrow up results in loss of life 

  If the user hits the wall by pressing the up arrow and they have more than one life. They lose a life, return to the default speed and the snake position gets set to the default position (this makes use of the render game function). 

  As shown below, the liveReset() function revoves one of the players 3 lives and updates the live count in the inner.HTML of the live count display box. Every time the user loses a life, the snake game is reset so that the user starts again from the middle of the board. The direction is also set to its default value (none), and the music which signifies a collision is played. 

  function liveReset() {
      liveCount -= 1
      lives.innerHTML = 'Lives: ' + liveCount
      snakePositions = [44, 45, 46]
      snakeHead = snakePositions[snakePositions.length - 1]
      currentDirection = direction.NONE
      clearInterval(snakeInterval)
      playLostMusic()
    }

# Arrow up results in snake moving up
  If the user safely clicks the arrow up button whilst travelling left or right, the snake moves around the corner in order to transition from moving horizontally to moving vertically:

  function snakeUp() {
      snakeHead = snakePositions[snakePositions.length - 1] - width
      snakePositions.shift()
      snakePositions.push(snakeHead)

      renderGame()
    }

In the function above, the snakeHead is defined as the final value in the snake positions array - width (this pushes the snake head to its corresponding position in the row above). The first element in the array is then removed (shift) and the new snake position is pushed into the array. This movement happens with every speed interval and the snake moves around the corner into a vertical position unless another arrow key is pressed. Again, the renderGame() function is used as this allows the snake Positions to be updated over time. 

Additionally, the growSnake() function is called. This detects whether the snake collides with the food and if so, will play the sound assocaited with this collision, grow the snake by one square, add 100 to the points score and update it accordingly, increase the speed of the snake and also regenerate another piece of food randomely on the board. 

# Set intervals 

All of these functions run with set intervals which run in accordance to the speed. The set interval is cleared at the beginning of each function to stop the previous function running. The set interval is initially set to 800ms and every time food is eaten, the speed increases by 20% of the speed and when a life is lost, the speed resets to its default value. 

# Music

I chose to add sounds to my game which I found online, downloaded and linked to the document. In order to ensure that when the game was played again, the song started from the beginning, I used the introMusic.currentTime = 0. 

# What went well

This project gave me the opportunity to combine everything I had learnt in the first 3 weeks of this course into one project. I became more confident at learning how to debug my code by testing code using console.log, using CSS animations and working with the DOM to provide interactive webpages that respond to the user. 

  # Improvements: 

 


  - adding the food to the snake
  - a box popping up which tells the plaeyers to move the keys to start
  - a default move right direction





  

