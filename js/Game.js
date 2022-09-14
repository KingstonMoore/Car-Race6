class Game{
  constructor(){
    this.leaderBoard = createElement("h2")
    this.l1 = createElement("h2")
    this.l2 = createElement("h2")
    this.moving = false
  }
  start(){
    form = new Form()
    form.display()
    player = new Player()
    player.getCount()
    car1 = createSprite(width/2 - 150, height - 100)
    car1.addImage(c1Img)
    car2 = createSprite(width/2 + 150, height - 100)
    car2.addImage(c2Img)
    car1.scale= 0.07
    car2.scale = 0.07
    cars = [car1, car2]

    fuelg = new Group()
    coing = new Group()
    obg = new Group()

    this.addObject(fuelg, 10, fuelImg, 0.02)
    this.addObject(coing, 12, coinImg, 0.09)
    this.addObject(obg, 8, obImg, 0.04)
  }

addObject(group, num, img, scale){
  for (var i = 0; i<num; i++){
    var obj = createSprite(random(width/2-150, width/2 + 150), random(-height*4.5, height-200))
    obj.addImage(img)
    obj.scale = scale
    group.add(obj)
  }
}
  
  //collect gamestate value from db
  getState(){
    db.ref("gameState").on("value", data=>{
      gameState = data.val()
    })
  }
//write the gameState to the database
  updateState(count){
    db.ref("/").update({
      gameState: count
    })
  }

  play(){
    form.hide()
    form.title.size(500, 50)
    Player.getPlayers()
    player.getCarsAtEnd()
    this.leaderBoard.position(175, 100)
    this.leaderBoard.html("LEADERBOARD")
    this.l1.position(175, 150)
    this.l2.position(175, 200)
    if (players != undefined){
      background("blue")
      image(trackImg, 0, -height*5, width, height*6)
      var info = Object.values(players)
    this.l1.html(info[0].rank+"   "+info[0].name+"   "+info[0].score)
    this.l2.html(info[1].rank+"   "+info[1].name+"   "+info[1].score)
    
    push();
    fill("white")
    rect(width / 2 - 100, player.posy+400, 100, 20);
    fill("orange");
    rect(width / 2 - 100, player.posy+400, player.fuel, 20);
    pop();

    push();
    fill("white")
    rect(width / 2 - 100, player.posy+350, 100, 20);
    fill("green");
    rect(width / 2 - 100, player.posy+350, player.life, 20);
    pop();
      
      var idx = 0
      for (var i in players){
        idx = idx + 1 
        cars[idx - 1].position.x = players[i].posx
        cars[idx - 1].position.y = players[i].posy + 500
        if (idx==player.idx){
          camera.position.y = cars[idx - 1].position.y
          fill("red")
          ellipse(players[i].posx, players[i].posy + 500, 60, 60)
          cars[idx - 1].overlap(fuelg, function(a,b){
            player.fuel = 100
            b.remove()
          })
          
          cars[idx - 1].overlap(coing, function(a,b){
            player.score = player.score + 10 
            player.updateInfo()
            b.remove()
          })
          if (player.fuel>0 && this.moving===true){
            player.fuel = player.fuel-0.3
          }
          if (player.fuel<=0){
            gameState = 2
            swal({title:"no fuel!"})
          }
        }
      }
      if (player.posy<-height*6+150){
        gameState = 2
        player.rank = player.rank + 1 
        Player.updateCarsAtEnd(player.rank)
        player.updateInfo()
        swal({title: "Your Rank Is: "+player.rank})
      }
      if (keyIsDown(UP_ARROW)){
        player.posy = player.posy - 20
        player.updateInfo()
        this.moving = true
      }
      if (keyIsDown(LEFT_ARROW) && player.posx>400){
        player.posx = player.posx - 20
        player.updateInfo()
      }
      if (keyIsDown(RIGHT_ARROW) && player.posx<width-400){
        player.posx = player.posx + 20
        player.updateInfo()
      }
       drawSprites()
    }
   
  }
}