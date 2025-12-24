//Auuthors: Maggie Yan, Caia Soyer

//Global variables that are used by the following functions
var startingRadius = 15;   //sets starting radius to 15px
var enemyIntervalId = 1000;  //spawns enemy every second 
//array of directions defined in Enemy class
var sideArray = ['top', 'bottom', 'left', 'right'];
var thePlayer;  //Player object

/* stopGame function takes the result (win/lose) as an
 argument and returns nothing, stops all enemies and 
 prevents new ones from spawning, adds win/lose text, 
 turns off mouse movement for the player */
function stopGame(result){
  clearInterval(enemies);
  $(".enemy").stop();
  if(result === 'win'){
    $('#winOrLose').text("You win!")
  }
  else if(result === 'lose'){
    $('#winOrLose').text("Booo you lose")
  }
  $(document).off("mousemove");
}

/* launchEnemy function takes no arguments and returns
nothing, launches enemies at a specified interval by 
spawning them off-screen and moves them across the 
screen (horizontal/vertical) */
function launchEnemy() {
  var enemy = new Enemy();
  let sideNum = Math.round(Math.random() * 3);
  enemy.setSide(sideArray[sideNum]);
  enemy.start();
}

/* startGame function takes no arguments and returns 
nothing, starts the game by removing the intro text 
and button, initiating enemy spawn, and creating the 
player */
function startGame(){
    $('#intro').remove();
    $('#start').remove();
    thePlayer = new Player('blue', startingRadius);
    thePlayer.move((window.innerWidth/2), (window.innerHeight/2));
    enemies = setInterval(launchEnemy, enemyIntervalId);

    $(document).mousemove(function(e) { 
        thePlayer.move(e.clientX,e.clientY);
    });
}

/* Click event handler to start the game when the start 
button is clicked */
$('#start').click(startGame);
