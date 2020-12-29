const lightBlue = document.getElementById('lightBlue')
const purple = document.getElementById('purple')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 10

class Game {
  constructor() {
    this.init()
    this.generateSequence()
    setTimeout(this.nextLevel, 750)
  }

  init() {
    this.nextLevel = this.nextLevel.bind(this)
    this.selectColor = this.selectColor.bind(this) // Liga this al objeto Game
    this.toggleBtnStart()
    this.level = 1
    this.colors = {
        lightBlue,
        purple,
        orange,
        green
    }
  }

  toggleBtnStart() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove('hide')
    } else {
      btnStart.classList.add('hide')
    }
  }

  // Generate random numbers between 0 and 3 to associate with each color
  generateSequence() {
    this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  nextLevel() {
    this.sublevel = 0
    this.illuminateSequence()
    this.addEventClick()
  }

  // Associate the generated number with a color on the board
  convertNumberToColor(number) {
    switch (number) {
        case 0:
            return 'lightBlue'
        case 1:
            return 'purple'
        case 2:
            return 'orange'
        case 3:
            return 'green'
    }
  }

    // Associate the generated number with a color on the board
    convertColorToNumber(color) {
      switch (color) {
          case 'lightBlue':
              return 0
          case 'purple':
              return 1
          case 'orange':
              return 2
          case 'green':
              return 3
      }
    }

  illuminateColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color), 350)
  }

  turnOffColor(color) {
      this.colors[color].classList.remove('light')
  }

  // Illuminate the sequence of colors to play
  illuminateSequence() {
      for (let i = 0; i < this.level; i++) {
        let color = this.convertNumberToColor(this.sequence[i])
        setTimeout(() => this.illuminateColor(color), 1000 * i)
      }
  }

  addEventClick() {
    // this.selectColor is binding to the object Game in init funciton instead of binding to the button.
    this.colors.lightBlue.addEventListener('click', this.selectColor)
    this.colors.purple.addEventListener('click', this.selectColor)
    this.colors.orange.addEventListener('click', this.selectColor)
    this.colors.green.addEventListener('click', this.selectColor)
  }

  removeEventClick() {
    this.colors.lightBlue.removeEventListener('click', this.selectColor)
    this.colors.purple.removeEventListener('click', this.selectColor)
    this.colors.orange.removeEventListener('click', this.selectColor)
    this.colors.green.removeEventListener('click', this.selectColor)
  }

  wonGame() {
    swal("Good job!", "You won the game!", "success")
      .then (this.init())
  }

  gameOver() {
    swal("Game Over!", "You lost, but you can try again!", "error")
      .then (() => {
        this.removeEventClick()
        this.init()
      })
  }

  selectColor(event) {
    const colorName = event.target.dataset.color
    console.log(event)
    const colorNumber = this.convertColorToNumber(colorName)
    this.illuminateColor(colorName)

    if (colorNumber === this.sequence[this.sublevel]) {
      this.sublevel++
      if (this.sublevel === this.level) {
        this.level++
        // Remove events click because this level is complete
        this.removeEventClick()
        if (this.level === (LAST_LEVEL +1)) {
          this.wonGame()
        } else {
          setTimeout(this.nextLevel, 1500)
        }
      } 
    } else {
      this.gameOver()
    }
  }
}

function start() {
  var game = new Game()
}