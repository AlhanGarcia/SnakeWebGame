import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED} from './snake.js';
import {update as updateFood, draw as drawFood} from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');


// Gameloop function, it runs at a fixed rate according to the SNAKE_SPEED setting
function main(currentTime){
    if(gameOver){
        if (confirm('Game over, press OK to restart the game')){
            window.location = '/';
        }
        return;
    }
    
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    
    lastRenderTime = currentTime;
    
    // Updates all logic of the game
    update();
    // Take information from update and draw new position of snake
    draw();
}

window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateFood();
    checkDeath();
}

function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function  checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}