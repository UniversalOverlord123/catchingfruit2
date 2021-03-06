class Game{
    constructor(){
       this.scoredisplay = createElement("h2");
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players = [player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();

                if(allPlayers !== undefined){
                 image(back_img, 0, 0, 1000, 800);
                 var x;
                 var y = 200;
                 var index = 0;

                    for(var plr in allPlayers){
                    
                    index = index + 1;

                     x = 500-allPlayers[plr].distance;
                     y = 500;
                     
                     players[index-1].x = x;
                     players[index-1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                      }
                    }
                }
                
                
                 

                if (keyIsDown(RIGHT_ARROW)) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW)) {
                    player.distance += 10
                    player.update();
                }
            
                   if(frameCount % 100 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                  
                     var rand = Math.round(random(1,5));
                       switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                       }
                       fruitGroup.add(fruits);
                    }
                       if(fruitGroup.isTouching(player1)){
                          fruitGroup.destroyEach();
                          player.score += 1;
                          player.update();
                       }
   
                       if(fruitGroup.isTouching(player2)){       
                          fruitGroup.destroyEach();
                          player.score += 1;
                          player.update();
                       }
                       this.scoredisplay.html("Your Score: " + player.score);
                       this.scoredisplay.position(800, 80);
                       this.scoredisplay.style('font-size', '40px');
                       this.scoredisplay.style('color', 'skyblue');
                
         drawSprites();         
    }
   
    end(){
       console.log("Game Ended");
    }
}