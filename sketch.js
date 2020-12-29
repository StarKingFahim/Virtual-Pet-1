//Create variables here
var dog;
var foodStock,foodS;

var database;
var Background,BGImg;

var dogImg,happyDogImg;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
  BGImg=loadImage("images/LR.jpg");
}

function setup() {
	canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

  foodStock=database.ref('Food')
  foodStock.on("value",readStock);


  dog=createSprite(displayWidth/2+displayWidth/4+displayWidth/8,500);
  dog.addImage("dog",dogImg);
  dog.scale=0.25;



  
}


function draw() 
{
  background(BGImg);

  if(keyWentDown(UP_ARROW))
{
  writeStock(foodS);
  dog.addImage("happyDog",happyDogImg);
 
  
}
if(keyWentDown(DOWN_ARROW))
{
  foodS=20;
}


  drawSprites();
  //add styles here
  fill("black");
  textSize(30)
  text("Press UP_ARROW Key To Feed Drago Milk!",700,450)
  text("Press DOWN_ARROW Key To Refill the milk!",700,500)
  text("Food left :"+ foodS,800,400)

}

function readStock(data){
  foodS=data.val();
  
}
function writeStock(x){

if(foodS<=0)
{
  foodS=0;
}
else
{
  foodS=foodS-1;
}


  database.ref('/').update({
    food:foodS
  })
}




function showError(){
  console.log("Error in writing to the database");
}

