<template>
  <div>
    <div id="board"></div>
    <div class="boardInfo">
      <div>
        Score:
        <div id="scoreBoard"></div>
      </div>
      <button id="start" @click="startGame()">Start</button>
    </div>
    <br />
    <div id="gameOver">Game Over</div>
  </div>
</template>

<script>
export default {
  name: "Snake-Frontend",
  props: {},
  data() {
    return {
      message: "",
      board : null,
      scoreBoard : null,
      startButton : null,
      gameOverSign : null,
      boardSize : 10,
      gameSpeed : 150,
      squareTypes : {
          emptySquare: 0,
          snakeSquare: 1,
          foodSquare: 2
      },
      directions : {
          ArrowUp: -10,
          ArrowDown: 10,
          ArrowRight: 1,
          ArrowLeft: -1,
      },
      snake : null ,
      score : null ,
      direction : null ,
      boardSquares : null ,
      emptySquares : null ,
      moveInterval : null ,
    }
  },
  created(){
    // this.setEnv()
    // try {
    //   const ws = new WebSocket("ws://localhost:6470/");
    //   ws.onmessage = ({data}) => {
    //     this.message =  data;
    //     console.log(this.message);
    //   }
    // } catch(err) {
    //   console.log(err);
    // }
  },
  mounted(){
    this.board = document.getElementById('board');
    this.scoreBoard = document.getElementById('scoreBoard');
    this.startButton = document.getElementById('start');
    this.gameOverSign = document.getElementById('gameOver');
  },
  methods:{
    setEnv(){
      
      // HTML Elements
      this.board = document.getElementById('board');
      this.scoreBoard = document.getElementById('scoreBoard');
      this.startButton = document.getElementById('start');
      this.gameOverSign = document.getElementById('gameOver');
    },

    drawSnake() {
        this.snake.forEach( square => this.drawSquare(square, 'snakeSquare'));
    },

    // Rellena cada cuadrado del tablero
    // @params 
    // square: posicion del cuadrado,
    // type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)
    drawSquare(square, type){
        const [ row, column ] = square.split('');
        this.boardSquares[row][column] = this.squareTypes[type];
        const squareElement = document.getElementById(square);
        squareElement.setAttribute('class', `square ${type}`);

        if(type === 'emptySquare') {
            this.emptySquares.push(square);
        } else {
            if(this.emptySquares.indexOf(square) !== -1) {
                this.emptySquares.splice(this.emptySquares.indexOf(square), 1);
            }
        }
    },

    moveSnake() {
        const newSquare = String(
            Number(this.snake[this.snake.length - 1]) + this.directions[this.direction])
            .padStart(2, '0');
        const [row, column] = newSquare.split('');


        if( newSquare < 0 || 
            newSquare > this.boardSize * this.boardSize  ||
            (this.direction === 'ArrowRight' && column == 0) ||
            (this.direction === 'ArrowLeft' && column == 9 ||
            this.boardSquares[row][column] === this.squareTypes.snakeSquare) ) {
            this.gameOver();
        } else {
            this.snake.push(newSquare);
            if(this.boardSquares[row][column] === this.squareTypes.foodSquare) {
                this.addFood();
            } else {
                const emptySquare = this.snake.shift();
                this.drawSquare(emptySquare, 'emptySquare');
            }
            this.drawSnake();
        }
    },

    addFood(){
        this.score++;
        this.updateScore();
        this.createRandomFood();
    },

    gameOver(){
        this.gameOverSign.style.display = 'block';
        this.clearInterval(this.moveInterval)
        this.startButton.disabled = false;
    },

      setDirection (newDirection) {
          this.direction = newDirection;
      },

      directionEvent(key) {
          switch (key.code) {
              case 'ArrowUp':
                  this.direction != 'ArrowDown' && this.setDirection(key.code)
                  break;
              case 'ArrowDown':
                  this.direction != 'ArrowUp' && this.setDirection(key.code)
                  break;
              case 'ArrowLeft':
                  this.direction != 'ArrowRight' && this.setDirection(key.code)
                  break;
              case 'ArrowRight':
                  this.direction != 'ArrowLeft' && this.setDirection(key.code)
                  break;
          }
      },

      createRandomFood() {
          const randomEmptySquare = this.emptySquares[Math.floor(Math.random() * this.emptySquares.length)];
          this.drawSquare(randomEmptySquare, 'foodSquare');
      },

      updateScore() {
          this.scoreBoard.innerText = this.score;
      },

      createBoard () {
          this.boardSquares.forEach( (row, rowIndex) => {
              row.forEach( (column, columnndex) => {
                  const squareValue = `${rowIndex}${columnndex}`;
                  const squareElement = document.createElement('div');
                  squareElement.setAttribute('class', 'square emptySquare');
                  squareElement.setAttribute('id', squareValue);
                  this.board.appendChild(squareElement);
                  this.emptySquares.push(squareValue);
              })
          })
      },

      setGame() {
          this.snake = ['00', '01', '02', '03'];
          this.score = this.snake.length;
          this.direction = 'ArrowRight';
          this.boardSquares = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(this.squareTypes.emptySquare));
          console.log(this.boardSquares);
          this.board.innerHTML = '';
          this.emptySquares = [];
          this.createBoard();
      },

      startGame() {
          this.setGame();
          this.gameOverSign.style.display = 'none';
          this.startButton.disabled = true;
          this.drawSnake();
          this.updateScore();
          this.createRandomFood();
          document.addEventListener('keydown', this.directionEvent);
          this.moveInterval = setInterval( () => this.moveSnake(), this.gameSpeed);
      }

    //   startButton.addEventListener('click', startGame);
   
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: "Share Tech Mono", monospace;
}

#board,
.boardInfo {
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}

#board {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

#start,
.boardInfo {
  font-size: 25px;
}

#gameOver {
  display: none;
  text-align: center;
  font-size: 20px;
  background-color: #db2d16;
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  color: white;
}

.boardInfo {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

#start {
  background-color: #1916db;
  border: none;
  color: white;
}

#scoreBoard {
  display: inline-flex;
}

.square {
  aspect-ratio: 1;
}

.emptySquare {
  background-color: #46c457;
}

.snakeSquare {
  background-color: #2446e0;
  border: 1px solid #000;
}

.foodSquare {
  background-color: #f53933;
  border: 1px solid #000;
}
</style>
