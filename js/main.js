import LoaderScene from "./loaderScene.js"
import GameScene from "./gameScene.js"

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "slot-game",
  scene: [
    LoaderScene,
    GameScene
  ]
}

const game = new Phaser.Game(config)