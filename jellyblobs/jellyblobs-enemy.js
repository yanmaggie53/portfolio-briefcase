//Authors: Maggie Yan, Caia Soyer

//Global variables that are used in the Enemy class
var minRadius = 4;  //random size >= this
var maxRadius = window['innerWidth'] / 8;  //random size <= this
var enemyDuration = 5000;  //time to cross the page

class Enemy extends Blob {

    /*Constructor takes no argument but uses color and radius 
    from Blob class but makes them randomized using the functions
    from random.js, also initializes variables that keep track of 
    collision and direction */
    constructor() {
        const color = random.color();
        const radius = random.intBetween(minRadius, maxRadius);
        super(color, radius);

        this.collided = false;
        this.direction = null;
    }

    /*collide method is invoked when a collision happens and
    records that the enemy has collided with the player, 
    invokes the player's collide method, doesn't take 
    any arguments and doesn't return anything*/
    collide() {
        if(!this.collided) {
            this.collided = true;
            thePlayer.collide(this);
        }
    }

    /*updateLocation method updates the X and Y location
    of the center from the top/left CSS values, doesn't 
    take any arguments and doesn't return anything */
    updateLocation(){
        this.x = parseInt($(this.elt).css("left"), 10) + this.getRadius();
        this.y = parseInt($(this.elt).css("top"), 10) + this.getRadius();
    }

    /*maybeCollide method check for a collision and is 
    invoked during the animation of enemy movement, the
    location is first updated, if the enemy hasn't collided 
    yet, it checks to see if there's an intersection and 
    then invokes collide method, doesn't take any agruments
    and doesn't return anything */
    maybeCollide(){
        this.updateLocation();
        if(!this.collided && this.intersects(thePlayer)) {
            this.collide();
            
        }
    }

    /*setSide method takes one argument, which is a string 
    indicating one of the directions, and sets the initial 
    X,Y coordinates of the enemy, based on the side it enters
    from, also records the side, doesn't return anything */
    setSide(side){
        if (side === "top") {
            this.setX(Math.round(Math.random() * window.innerWidth));
            this.setY(0 - this.getRadius());
            this.direction = "top";
        }
        else if (side === "right") {
            this.setX(Math.round(window.innerWidth + this.getRadius()));
            this.setY(Math.random() * window.innerHeight);
            this.direction = "right";
        }
        else if (side === "bottom") {
            this.setX(Math.round(Math.random() * window.innerWidth));
            this.setY(window.innerHeight + this.getRadius());
            this.direction = "bottom";
        }
        else if (side === "left") {
            this.setX(0 - this.getRadius());
            this.setY(Math.round(Math.random() * window.innerHeight));
            this.direction = "left";
        }
    }

    /*start method starts the jQuery animation of the enemy
    moving across the board to its final XY value based on 
    the four directions, doesn't take any arguments and 
    doesn't return anything */
    start(){
        const collisionInterval = setInterval(() => {
            this.maybeCollide();
        });
        if(this.direction == 'left'){
            $(this.elt).animate({left: window.innerWidth}, enemyDuration, () => {
                clearInterval(collisionInterval);
                this.remove();
            });
        }else if (this.direction == 'right'){
            $(this.elt).animate({left: -(window.innerWidth)}, enemyDuration, () => {
                clearInterval(collisionInterval);
                this.remove();
            });
        }else if (this.direction == 'top'){
            $(this.elt).animate({top: window.innerHeight}, enemyDuration, () => {
                clearInterval(collisionInterval);
                this.remove();
            });
        }else if((this.direction == 'bottom')){
            $(this.elt).animate({top: -(window.innerHeight)}, enemyDuration, () => {
                clearInterval(collisionInterval);
                this.remove();
            });
        }
    }

    /*remove stops the animation and removes the enemy 
    from the board */
    remove(){
        $(this.elt).stop().remove();
    }
}
