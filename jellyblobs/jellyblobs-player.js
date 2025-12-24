//Authors: Maggie Yan, Caia Soyer

//Global variables that are used in the Player class
var winningRadius = (window.innerHeight/4);  //bigger than this wins
var losingRadius = 4;  //smaller than this losses
var growRadius = 10;  //grow by this many pixels
var shrinkRadius = 3;  //shrink by this many pixels

class Player extends Blob {

    /*Constructor that has the same arguments as the
    Blob class and initializes the same instance 
    variables as the Blob class*/
    constructor (color, radius) {
        super(color, radius);
    
    } 

    /*Player class inherits all the behavior of Blob 
    class, so the following methods are unique to the 
    Player class */

    /*move method takes an x,y location and moves
    the DIV so that the center is in the new location,
    takes x and y as arguments and doesn't return anything*/
    move(x,y) {
        this.setX(x);
        this.setY(y);
    }

    /*grow method increases the radius by growRadius pixels,
    doesn't take any arguments and doesn't return anything */
    grow() {
        const newRadius = this.getRadius() + growRadius;
        this.setRadius(newRadius);
        this.checkLimits();
    }

    /*shrink mehtod decreases the radius by shirnkRadius pixels,
    doesn't take any arguments and doesn't return anything */
    shrink() {
        const newRadius = this.getRadius() - shrinkRadius;
        this.setRadius(newRadius);
        this.checkLimits();
    }

    /*collide method is invoked when a collision between an enemy 
    blob and player blob, it takes the enemy blob as an argument
    and either grows or shrink the player as appropriate, doesn't
    return anything */
    collide(enemy) {
        const enemyRadius = enemy.getRadius();
        if (enemyRadius < this.getRadius()) {
            this.grow();
            enemy.remove();
        }
        else {
            this.shrink();
        }
    }

    /*checkLimits method checks if the radius of the player
    blob has exceeded the win or lose thresholds and stops
    the game if so, doesn't take any arguments and doesn't 
    return anything */
    checkLimits() {
        const currentRadius = this.getRadius();
        if (currentRadius >= winningRadius) {
            console.log("win");
            stopGame("win");
        }
        else if (currentRadius <= losingRadius) {
            console.log("lose");
            stopGame("lose");
        }
    }
}
