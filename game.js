var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(800,400, {backgroundColor: 0xfe00fe0});
gameport.appendChild(renderer.view);


stage_scale = 1;
var stage = new PIXI.Container();
stage.scale.x = stage_scale;
stage.scale.y = stage_scale;

//Useful variables and such
var player;
var trophy;
PIXI.loader
	.add("map_json", "map.json")
	.add("map.png")
	.add("assets.json")
	.load(loadScreen);




function loadScreen(){
	//Load Player
	//Load cannonball
	
	//load the map
	var tileUtil = new TileUtilities(PIXI);
	boat = tileUtil.makeTiledWorld("map_json", "map.png");
	stage.addChild(boat);
	
	var frame1 = [];
	var frame2 = [];
	/*
	for(var i=1; i<=4; i++){
		frame1.push(PIXI.Texture.fromFrame("cannonBall"+i+".png"));
	}
	*/
	frame2.push(PIXI.Texture.fromFrame("cannon1.png"));
	frame2.push(PIXI.Texture.fromFrame("cannon2.png"));
	
	player = new PIXI.extras.MovieClip(frame2); 
	player.animationSpeed = 0.1;
	player.anchor.x = 0;
	player.anchor.y = 0;
	player.position.x = 0; 
	player.position.y = 0;
	player.xSpeed = 120;
	player.ySpeed = 60;
	player.direction = "none";
	player.moving = false;
	player.play();
	stage.addChild(player);
	/*
	trophy = new PIXI.extras.MovieClip(frame1); 
	trophy.animationSpeed = 0.1;
	trophy.anchor.x = 0.5;
	trophy.anchor.y = 0.5;
	trophy.position.x = 100;
	trophy.position.y = 100;
	trophy.play();
	*/
}
function move() {
	if(player.direction == "none"){
		player.moving = false;
		console.log(player.y);
		return;
	}
	player.moving = true;
	console.log("move");
	
	if(player.direction == "right"){
		createjs.Tween.get(player).to({x: player.position.x + 117}, 500).call(move);
	}
	if (player.direction == "left"){
		createjs.Tween.get(player).to({x: player.position.x - 117}, 500).call(move);
	}
	if (player.direction == "up"){
		createjs.Tween.get(player).to({y: player.position.y - 57}, 500).call(move);
	}
	if (player.direction == "down"){
		createjs.Tween.get(player).to({y: player.position.y + 57}, 500).call(move);
	}
	console.log("New position: "+ player.position.x + ", "+ player.position.y);
	console.log("")
}
var playingField = new PIXI.Container();
var mainMenu = new PIXI.Container();
var credits = new PIXI.Container();
var manual = new PIXI.Container();
var gameOver = new PIXI.Container();


window.addEventListener("keydown", 
	function (e) {
	  e.preventDefault();
	  if (!player) return;
	  if (player.moving) return;
	  if (e.repeat == true) return;
	  
	  player.direction = "none";

	  if (e.keyCode == 87)
		player.direction = "up";
	  else if (e.keyCode == 83)
		player.direction = "down";
	  else if (e.keyCode == 65)
		player.direction = "left";
	  else if (e.keyCode == 68)
		player.direction = "right";

	  console.log(e.keyCode);
	  move();
	});

window.addEventListener("keyup", function onKeyUp(e) {
  e.preventDefault();
  if (!player) return;
  player.direction = "none";
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}

animate();
