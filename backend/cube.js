function checkFace(clr) {
    var c = clr[0];
    for (var i = 1; i < 9; i++) {
        if (clr[i] != c) {
            return false
        }
    }
    return true
}
    
function checkCube(cube) {
    for (var i = 0; i < 6; i++) {
        if (!checkFace(cube.full[i])) {
            return false
        }
    }
    return true
}

var Color = {
    B : "0",
    G : "1",
    R : "2",
    O : "3",
    W : "4",
    Y : "5",
};

/*var Turns = {

}*/

class Cube {
    constructor(a) {
        this.full = a;
        this.f = a[0];
        this.b = a[1];
        this.t = a[2];
        this.u = a[3];
        this.r = a[4];
        this.l = a[5];
        this.solved = false;
        this.stage = 0;
    }
}

console.log(Color);


var tFace = [Color.B, Color.B, Color.B,
             Color.B, Color.B, Color.B,
             Color.B, Color.B, Color.B];
var uFace = [Color.G, Color.G, Color.G,
             Color.G, Color.G, Color.G,
             Color.G, Color.G, Color.G];
var fFace = [Color.W, Color.W, Color.W, 
             Color.W, Color.W, Color.W, 
             Color.W, Color.W, Color.W];
var bFace = [Color.Y, Color.Y, Color.Y,
             Color.Y, Color.Y, Color.Y,
             Color.Y, Color.Y, Color.Y];
var rFace = [Color.R, Color.R, Color.R, 
             Color.R, Color.R, Color.R, 
             Color.R, Color.R, Color.R];
var lFace = [Color.O, Color.O, Color.O,
             Color.O, Color.O, Color.O,
             Color.O, Color.O, Color.O];
var listRepresentation = [fFace, bFace, tFace, uFace, rFace, lFace];
let rubix = new Cube(listRepresentation);
console.log(rubix);
console.log("IS RUBIX SOLVED? " + (checkCube(rubix) ? "YES" : "NO"));
