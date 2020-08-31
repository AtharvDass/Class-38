var player,ground,wall1,wall2,score;

function preload(){
  player_img=loadImage('runner.jpg');
  track=loadImage('track.jpg');
  track.scale=2
}
function setup() {
  createCanvas(800,400);
  player=createSprite(330,350,80,80);
  //player.shapeColor='blue'
  player.addImage('hi',player_img);
  player.scale=0.05
  ground=createSprite(400,400,width*8,20);
  wall1=createSprite(6400,400,20,height*8);
  wall2=createSprite(10,400,20,height*8);
  coinG=createGroup();
  ob=createGroup();
  score=100;
  gameState='start';
  
  button=createButton('Play');
  button.position(player.x+130)

  button2=createButton('restart');
  button2.position(player.x);
  

   
  
  
  

  //ground.velocityX=-2;
  ground.x=ground.width/2;
    for(var i=130;i<ground.width;i=i+500){
      var heightR=random(80,175);
      var obstacle=createSprite(i,400-heightR/2,20,heightR);
      ob.add(obstacle);
   }
  
  

}

function draw() {
  background('cyan');  
  
  if(frameCount%50===0&&gameState==='play'){
    score=score-1
  }
  if(gameState==='start'){
  button.mousePressed(()=>{
   
    gameState='play'
  })
}
  if(ground.x<0){
    ground.x=ground.width/2;
  }

  if(keyDown('d')&&gameState==='play'){
    player.x=player.x+20
  }

  if(keyDown('a')&&gameState==='play'){
    player.x=player.x-20;
  }

  if(keyDown('w')&&player.y>=349&&gameState==='play'){
    player.velocityY=-18;
  }

  if(frameCount%500===0&&gameState==='play'){
    for(var o=120;o<ground.width;o=o+random(300,1000)){

      var coin =createSprite(o,random(150,200),40,40);
      coin.shapeColor='yellow';
      coinG.add(coin)
      coin.lifetime=200;
    }
  }
  if(coinG.collide(player)){
    score=score+10;
    coinG.setLifetimeEach(1);
  }

  if(player.collide(ob)||score<=0){
    gameState='end';
  }

  player.velocityY=player.velocityY+0.8
  player.collide(ground);
  player.collide(wall1);
  player.collide(wall2);
  if(gameState==='end'){
    textSize(20);
    text('You Lost Press restart',player.x,200);
    button2.mousePressed(()=>{
      gameState='start'
      player.x=330;
     
      score=100
    })
  }
  camera.position.x=player.x
  drawSprites();
  textSize(20);
  text('Health: '+score,camera.position.x-50,50);
  if(gameState==='start'){
    textSize(10);
    text('In this game you need to move using w,a and d.Your health decreses and you need to collect coins to regain helath.Coins will appear now and then.',30,200);
    text('Press play to start',300,225);
  }
  
    
}
