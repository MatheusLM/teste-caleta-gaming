export default class LoaderScene extends Phaser.Scene{
  constructor() {
    super({
      key: "LoaderScene"
    })
  }

  preload(){
    const gameWidth = this.sys.canvas.width;
    const gameHeight = this.sys.canvas.height;
    const LoadBar = this.add.graphics()

    this.load.on('progress', (progress) => {
      LoadBar.clear()
      LoadBar.fillStyle(0xffffff)
      LoadBar.fillRect(0, 0, gameWidth*progress, 24)
    })

    this.load.on("complete", () => {
      this.scene.start("GameScene")
    })

    this.load.image("gameBackground", "../assets/images/bg.png")
    this.load.image("winLine", "../assets/images/winline.png")
    this.load.image("gameFrame", "../assets/images/frame.png")

    this.load.image('buttonIdle', '../assets/images/buttons/play_button_0.png')
    this.load.image('buttonPressed', '../assets/images/buttons/play_button_1.png')
    this.load.image('buttonHover', '../assets/images/buttons/play_button_2.png')
    this.load.image('buttonDisabled', '../assets/images/buttons/play_button_3.png')
    
    this.load.image("symbolApple", "../assets/images/symbols/apple.png")
    this.load.image("symbolBanana", "../assets/images/symbols/banana.png")
    this.load.image("symbolBar", "../assets/images/symbols/bar.png")
    this.load.image("symbolCherry", "../assets/images/symbols/cherry.png")
    this.load.image("symbolGrape", "../assets/images/symbols/grape.png")
    this.load.image("symbolLemon", "../assets/images/symbols/lemon.png")
    this.load.image("symbolOrange", "../assets/images/symbols/orange.png")
    this.load.image("symbolWatermellon", "../assets/images/symbols/watermellon.png")
  }
  create(){}
  update(){}
}