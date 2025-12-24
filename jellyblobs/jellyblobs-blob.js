//Authors: Maggie Yan, Caia Soyer

/*isNum function that checks that its argument is a 
number, so that the intersection code doesn't fail, 
takes a value as the argument and returns if it's a
number  */
function isNum(val) {
    if( typeof val === 'number' ) {
        return val;
    } else {
        throw new Error('value is not a number');
    }
}

class Blob {

    /*Constructor that has two arguments, color and 
    radius, and initializes instance variables that 
    keep track of blob color, radius, the x and y 
    location of their center, and the DOM element
    that corresponds to the blob */
    constructor (color, radius) {
        this.color = color;
        this.radius = radius;
        this.x = 0;
        this.y = 0;
        this.elt = document.querySelector(".circle");
        this.setDOM();
        this.setColor(color);
        this.setRadius(radius);
        this.addToGame();
    }

    /*The following methods will also be used in 
    subclasses*/

    /*addToGame method adds the blob to some container
    (usually the body), doesn't take any arguments and
    doesn't return anything */
    addToGame() {
        $(document.body).append(this.elt);
    }
    
    /*setDOM methodcreates a DOM element and stores it 
    in an instance variable, doesn't take any arguments
    and doesn't return anything */
    setDOM() {
        this.elt = document.createElement("div");
        this.elt.className = "circle";
        $(this.elt).css({position: "absolute"});
        this.updateDOMPosition();
    }

    /*setColor method sets the color instance variable
    and also updates the DOM element's background-color
    property, takes color as an argument and doesn't 
    return anything*/
    setColor(color) {
        this.color = color;
        if (this.elt) {
            $(this.elt).css("background-color", color);
        }
    }

    /*setRadius method sets the radius and updates the 
    DOM element's width, height, left and top properties, 
    takes radius as an argument and doesn't return anything */
    setRadius(radius) {
        this.radius = radius;
        if (this.elt) {
            const diameter = radius * 2;
            $(this.elt).css({
                width: `${diameter}px`,
                height: `${diameter}px`
            });
            this.updateDOMPosition();
        }
    }

    /*getColor method doesn't take any arguments and returns
    the current color*/
    getColor() {
        return this.color;
    }

    /*getDOM method doesn't take any arguments and returns 
    the DOM element stored in the instance variable */
    getDOM() {
        return $(this.elt);
    }
    
    /*getDiameter method doesn't take any arguments and 
    returns the diameter value, which is radius * 2 */
    getDiameter() {
        return this.radius * 2;
    }

    /*getRadius method doesn't take any arguments and 
    returns the radius value */
    getRadius() {
        return this.radius;
    }

    /*getX method doesn't take any arguments and returns
    the x coordinate of the center */
    getX() {
        return this.x;
    }

    /*getY method doesn't take any arguments and returns
    the y coordinate of the center */
    getY() {
        return this.y;
    }

    /*setX method changes the x coordinate of the center
    and updates the position of the DOM element by setting 
    left, takes x as an argument and doesn't return anything */
    setX(x) {
        this.x = x;
        this.updateDOMPosition();
    }

    /*setY method changes the y coordinate of the center
    and updates the position of the DOM element by setting 
    top, takes y as an argument and doesn't return anything */
    setY(y) {
        this.y = y;
        this.updateDOMPosition();
    }

    /*updateDOMPosition method uses the blob's (x,y) location 
    and radius to determine the DOM element's CSS positioning 
    (left, top), doesn't take any arguments and doesn't return 
    anything*/
    updateDOMPosition() {
        if(this.elt) {
            const left = this.x - this.radius;
            const top = this.y - this.radius;
            $(this.elt).css({
                left: `${left}px`,
                top: `${top}px`
            });
        }
    }

    /*intersects method determines whether two circular blobs
    intersect, uses the Pythagorean theorem to compute the 
    distance between the centers(d) and then computes that 
    to the sum of the two radiuses(r1 + r2), takes one argument
    and returns true if d^2 < (r1+r2)^2 */
    intersects (other) {
        // six uses of the 'isNum' function to make sure all values are defined
        const dx = isNum(this.getX()) - isNum(other.getX());
        const dy = isNum(this.getY()) - isNum(other.getY());
        const r1 = isNum(this.getRadius());
        const r2 = isNum(other.getRadius());

        // finally, some real computation
        const distance_squared = (dx * dx + dy * dy);

        const rsum = r1+r2;
        const isCloser = (distance_squared <= rsum*rsum);
        return isCloser;
    }

     /*location method takes one argument and returns a
    string that tells if the x,y,top,left values are correct
    and in sync*/
    location() {
        let x = this.getX();
        let y = this.getY();
        let left = parseInt(this.getDOM().css('left'),10);
        let top = parseInt(this.getDOM().css('top'),10);
        let r = this.getRadius();
        let xok = (left+r==x) ? "X OK" : "X WRONG";
        let yok = (top+r==y) ? "Y OK" : "Y WRONG";
        return `radius ${r} center (${x},${y}) w/ DOM elt (${left},${top}): ${xok}, ${yok}`;
    }
}

