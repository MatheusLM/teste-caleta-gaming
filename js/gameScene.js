export default class GameScene extends Phaser.Scene{
  constructor() {
    super({
      key: "GameScene"
    })
    this.symbols = [
      { name: "symbolBar", text: "Bar", payment: 100, weight: 1 },
      { name: "symbolCherry", text: "Cherry", payment: 50, weight: 2 },
      { name: "symbolLemon", text: "Lemon", payment: 25, weight: 4 },
      { name: "symbolWatermellon", text: "Watermellon", payment: 20, weight: 8 },
      { name: "symbolApple", text: "Apple", payment: 15, weight: 12 },
      { name: "symbolGrape", text: "Grape", payment: 10, weight: 16 },
      { name: "symbolOrange", text: "Orange", payment: 5, weight: 20 },
      { name: "symbolBanana", text: "Banana", payment: 1, weight: 24 },
    ]
    this.balance = 500
    this.wins = 1
    this.state = 0
    this.result = []

    this.listSymbols = []
    this.listSymbols.sort( () => .5 - Math.random() )
    this.symbols.forEach( (e) => {
      for( let i = 0; i<e.weight;i++){
        this.listSymbols.push(e.name)
      }
    })
    this.shuffleSymbols = () => this.listSymbols.sort( () => .5 - Math.random() )
    this.start = () => {
      this.shuffleSymbols()
    }
  }

  preload(){}

  create(){
    this.add.image(0, 0, "gameBackground").setOrigin(0, 0)

    const textStyleBalance = {
      color: 'black',
      fontFamily: 'arial black',
      fontSize: '18px',
      align: 'left',
      fixedWidth: 160
    }
    const textStyleWins = {
      color: 'black',
      fontFamily: 'arial black',
      fontSize: '18px',
      align: 'right',
      fixedWidth: 160
    }
    const textStyleDown = {
      color: 'black',
      fontFamily: 'arial black',
      fontSize: '18px',
      align: 'center',
      fixedWidth: 220
    }
    
    const textStyleButton = {
      color: 'white',
      fontFamily: 'arial black',
      textDecoration: 'underline',
      fontSize: '22px'
    }
    
    function makeMask(that, x){
      let containerMask = that.make.graphics();
      containerMask.fillStyle(0xffffff, 1);
      containerMask.fillRect(x, 192, 126, 217);
      return containerMask
    }
    
    let applyMask = (that, column, x) => column.mask = new Phaser.Display.Masks.GeometryMask(that, makeMask(that, x))
    
    function renderSymbols(that, column, x){
      that.shuffleSymbols()
      that.listSymbols.forEach( (i, index) => {
        column.add(that.add.image(x, -(140*index)+440, i))
      } )
      that.result.push(that.listSymbols[85])
    }
    
    function renderSymbolsContainer(that){
      that.result = []
      renderSymbols(that, that.symbolColumn1, 265)
      renderSymbols(that, that.symbolColumn2, 400)
      renderSymbols(that, that.symbolColumn3, 535)
    }
    
    this.symbolColumn1 = this.add.container();
    applyMask(this, this.symbolColumn1, 202)
    
    this.symbolColumn2 = this.add.container();
    applyMask(this, this.symbolColumn2, 337)
    
    this.symbolColumn3 = this.add.container();
    applyMask(this, this.symbolColumn3, 473)
    
    this.add.image(400, 300, "gameFrame")
    this.winLine = this.add.image(400, 300, "winLine")
    
    this.PlayButton = this.add.image(400, 520, "buttonIdle")
    this.PlayButtonText = this.add.text(373, 507, "Play", textStyleButton)
    this.PlayButton.setInteractive()
    this.PlayButton.on('pointerdown', () => start(this))

    this.DownBarText = this.add.text(290, 446, "GOOD LUCK", textStyleDown)
    this.BalanceText = this.add.text(200, 144, "Balance: 5000", textStyleBalance)
    this.WinningsText = this.add.text(445, 144, "Winnings: 0", textStyleWins)

    function start(that){
      if(that.balance > 0){
        renderSymbolsContainer(that)
        that.balance = that.balance - 1
        that.state = 1
      }else{
        that.state = 4
      }
    }

    renderSymbolsContainer(this)
  }

  update(){
    function changePosition(that, y){ that.y = that.y + y }

    function resetPosition(that){
      that.symbolColumn1.y = 0
      that.symbolColumn2.y = 0
      that.symbolColumn3.y = 0
    }

    function toggleWinLine(that, state){ that.winLine.visible=state }

    function changeButtonSkin(that, skin){ that.PlayButton.setTexture(skin) }

    function changeTextBar(that, text){ that.DownBarText.setText(text) }
    function changeTextBalance(that){ that.BalanceText.setText(`Balance: ${that.balance}`) }
    function changeTextWin(that){ that.WinningsText.setText(`Winnings: ${that.wins}`) }

    let gameState = this.state
    if(gameState == 0){
      toggleWinLine(this, false)
      changeTextBalance(this)
      changeTextBar(this, 'GOOD LUCK')
      this.input.enable(this.PlayButton)
    }else if(gameState == 1){
      this.input.disable(this.PlayButton)
      toggleWinLine(this, false)
      changeButtonSkin(this, "buttonDisabled")
      changeTextBalance(this)
      resetPosition(this)
      changeTextBar(this, 'GOOD LUCK')
      this.state = 2
    }else if(gameState == 2){
      if(this.symbolColumn3.y < 11750){
        if(this.symbolColumn1.y < 11750) changePosition(this.symbolColumn1, 120)
        if(this.symbolColumn2.y < 11750) changePosition(this.symbolColumn2, 80)
        if(this.symbolColumn3.y < 11750) changePosition(this.symbolColumn3, 60)
      }else{
        if(this.result[0] == this.result[1] && this.result[1] == this.result[2]){
          let { text: name, payment } = this.symbols.filter(obj => obj.name == this.result[0])[0]
          this.balance += payment
          this.wins += 1
          toggleWinLine(this, true)
          changeTextBar(this, `3 ${name} = ${payment}`)
          changeTextBalance(this)
          changeTextWin(this)
        }
        this.input.enable(this.PlayButton)
        this.state = 3
      }
    }else if(gameState == 3){
      changeButtonSkin(this, "buttonIdle")
    }else if(gameState == 4){
      changeTextBar(this, "INSUFICIENT COINS")
      changeButtonSkin(this, "buttonDisabled")
      this.input.disable(this.PlayButton)
    }else{
      changeTextBar(this, 'ERROR')
    }
  }
  
}