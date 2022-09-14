class Form{
  constructor(){
    this.title = createImg("assets/title.png")
    this.input = createInput("").attribute("placeholder","Enter Name")
    this.play = createButton("PLAY")
    this.greeting = createElement("h1")
    this.reset = createImg("assets/reset.png")
  }

  hide(){
    this.input.hide()
    this.play.hide()
    this.greeting.hide()
  }

  display(){
    this.title.position(175, 50)
    this.title.size(1000, 100)
    this.input.position(width/2 - 200, height/2 - 100)
    this.input.style("backgroundColor","transparent")
    this.input.size(300, 25)
    this.play.position(width/2 - 150, height/2)
    this.play.size(200, 50)
    this.greeting.position(width/2 - 200, height/2 - 50)
    this.reset.position(width - 200, 50)
    this.reset.size(50,50)
    this.reset.mousePressed(()=>{
      db.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        carsAtEnd:0
      })
      location.reload()
    })
    this.play.mousePressed(()=>{
      this.greeting.html("Welcome! " + this.input.value() + ", Wait For Other Players")
      this.input.hide()
      this.play.hide()
      playerCount = playerCount + 1
      player.idx = playerCount
      player.name = this.input.value()
      player.addPlayer()
      player.updateCount(playerCount)
      player.getInfo()
    })
  }
}