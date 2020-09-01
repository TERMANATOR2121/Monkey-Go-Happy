var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Background
var Monkey
var Ground, InvisibleGround
var bananaGroup
var obstacleGroup
var Score
var MonkeyImages


function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  backImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
 
  BackGround = createSprite(200,200,400,400);
  BackGround.addImage(Background)
  
  Monkey = createSprite(200,200);
  Monkey.addAnimation("MonkeyImages");
  Monkey.scale=0.2;
  Monkey.collide(InvisibleGround);
  
  //display score
  stroke("Black");
  textSize(20);
  fill("Black");
  text("Score = "+ Score, 100, 50);
  
  //adjust the depth
  obstacles.depth = bananaGroup.depth = Monkey.depth;

  bananaGroup=new Group();
  obstacleGroup=new Group();
  
  invisibleground.visible = false;
}

function draw() {
  background(220);
  
 
  
    if(gameState === PLAY){
    
     Score=0;
     
     //jump when the space key is pressed
     if(keyDown("space") && Monkey.y >= 290){
     Monkey.velocityY = -18 ;
     }
          
     if (bananaGroup.y === Monkey.y && bananaGroup.x === Monkey.x){
      Score=Score=200; 
     }
     
    Monkey.depth = bananaGroup.depth;
    bananaGroup.depth = bananaGroup.depth + 1;
  
    //add gravity
    Monkey.velocityY = Monkey.velocityY + 0.8;
    
    //spawn the obstacles
    Banana();
  
    //spawn obstacles
    Obstacles();
    
      switch(score){
        case 10:player.scale=0.12;
                      break;
        case 20:player.scale=0.14;
                      break;
        case 30:player.scale=0.16;
                      break;
        case 40:player.scale=0.18;
                      break;
            default:  break;
      }
      
    //End the game when trex is touching the obstacle
    if(obstacleGroup.isTouching(Monkey)){
      Monkey.scale=0.2;
      gameState = END;
    }
    }

  else if(gameState === END) {
    
    //set velcity of each game object to 0
    Monkey.velocityY = 0;
    obstacleGroup.setVelocityEach(0);
    bananaGroup.setVelocityEach(0);
    

    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
    text("Press R to Restart", 150, 200);
    
    if (keyWentDown("R")){
    reset(); 
    }

}
Monkey.debug=true;
  bananaGroup.debud=true;
  obstacleGroup.debug=true;

  
  drawSprites();
}
  

function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  survivalTime=0;
  Monkey.destroy;
  survivalTime=0;
  text.visable=false;
}

function Banana(){
  
   if(World.frameCount % 80 === 0) {
    var Banana = createSprite(400,330,10,40);
    Banana.setAnimation("Banana");
    Banana.velocityX = -10;
    
    //assign scale and lifetime to the obstacle           
    Banana.scale = 0.08;
    Banana.lifetime = 70;
    
    //add each obstacle to the group
    bananaGroup.add(Banana);
}
}  

function Obstacles (){
  
  if (World.frameCount % 300 === 0) {
    var obstacles = createSprite(400,320,40,10);
    obstacles.y = 350;
    obstacles.setAnimation("Stone");
    obstacles.scale = 0.2;
    obstacles.velocityX = -10;
    
     //assign lifetime to the variable
    obstacles.lifetime = 134;
    
    //add each cloud to the group
    obstacleGroup.add(obstacles);
  }
  }
