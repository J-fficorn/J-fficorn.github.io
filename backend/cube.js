var Color = { W : "W", Y : "Y", B : "B", G : "G", R : "R", O : "O" };
var Turn = { F : "f", B : "b", T : "t", U : "u", R : "r", L : "l", C : false, CC: true };
var edges = [1, 3, 5, 7], corners = [0, 2, 6, 8]; //4 is center
var changesC  = [6, 2, -2, 4], changesCC = [2, 4, 6, -2];
var allFaces = ["f", "b", "t", "u", "r", "l"];

function checkFace(face) {
    var c = face[4];
    for (var i = 1; i < 9; i++) {
        if (face[i] != c) { return false }
    }
    return true
}
    
function checkCube(cube) {
    for (var i = 0; i < 6; i++) {
        if (!checkFace(cube.full[i])) { return false }
    }
    return true
}


class Cube {

    constructor(a) { //where a is a 1d array
        this.full = a;
        this.f = a[0]; this.b = a[1];
        this.t = a[2]; this.u = a[3];
        this.r = a[4]; this.l = a[5];
        this.solved = checkCube(this);
        this.turns = 0;
    }

    turnFace(side, counter) {
        var newFace, refFace;
        var relT, relU, relR, relL;
        var refT, refU, refR, refL;
        switch (side) {
            case "f":
                newFace = [...this.f]; refFace = this.f;
                relT = [...this.t]; refT = this.t; relU = [...this.u]; refU = this.u;
                relR = [...this.r]; refR = this.r; relL = [...this.l]; refL = this.l;
                break;
            case "b":
                newFace = [...this.b]; refFace = this.b;
                relT = [...this.t]; refT = this.t; relU = [...this.u]; refU = this.u;
                relR = [...this.l]; refR = this.l; relL = [...this.r]; refL = this.r;
                break;
            case "t":
                newFace = [...this.t]; refFace = this.t;
                relT = [...this.b]; refT = this.b; relU = [...this.f]; refU = this.f;
                relR = [...this.r]; refR = this.r; relL = [...this.l]; refL = this.l;
                break;
            case "u":
                newFace = [...this.u]; refFace = this.u;
                relT = [...this.f]; refT = this.f; relU = [...this.b]; refU = this.b;
                relR = [...this.r]; refR = this.r; relL = [...this.l]; refL = this.l;
                break;
            case "r":
                newFace = [...this.r]; refFace = this.r;
                relT = [...this.t]; refT = this.t; relU = [...this.u]; refU = this.u;
                relR = [...this.b]; refR = this.b; relL = [...this.f]; refL = this.f;
                break;
            case "l":
                newFace = [...this.l]; refFace = this.l;
                relT = [...this.t]; refT = this.t; relU = [...this.u]; refU = this.u;
                relR = [...this.f]; refR = this.f; relL = [...this.b]; refL = this.b;
                break;
            default: console.log("Unknown Side");
        }
        for (var i = 0; i < 9; i++) {
            if (i == 4) { continue; }
            if (i < 4) {
                newFace[i] = refFace[i + (counter ? changesCC[i] : changesC[i])];
            } else {
                newFace[i] = refFace[i - (counter ? changesCC[8 - i] : changesC[8 - i])];
            }
        }
        //change side
        //for side = f, change top 6-8, right 0/3/6, bot 0-2, left 2/5/8
        if (!counter) {
            relT[6] = refL[8]; relT[7] = refL[5]; relT[8] = refL[2];
            relR[0] = refT[6]; relR[3] = refT[7]; relR[6] = refT[8];
            relU[0] = refR[0]; relU[1] = refR[3]; relU[2] = refR[6];
            relL[2] = refU[0]; relL[5] = refU[1]; relL[8] = refU[2];
        } else {
            relT[6] = refR[0]; relT[7] = refR[3]; relT[8] = refR[6];
            relR[0] = refU[2]; relR[3] = refU[1]; relR[6] = refU[0];
            relU[0] = refL[2]; relU[1] = refL[5]; relU[2] = refL[8];
            relL[2] = refT[6]; relL[5] = refT[7]; relL[8] = refT[8];
        }
        switch (side) {
            case "f": this.f = newFace; this.t = relT; this.u = relU; this.r = relR; this.l = relL; break;
            case "b": this.b = newFace; this.t = relT; this.u = relU; this.l = relR; this.r = relL; break;
            case "t": this.t = newFace; this.b = relT; this.f = relU; this.r = relR; this.l = relL; break;
            case "u": this.u = newFace; this.f = relT; this.b = relU; this.r = relR; this.l = relL; break;
            case "r": this.r = newFace; this.t = relT; this.u = relU; this.b = relR; this.f = relL; break;
            case "l": this.l = newFace; this.t = relT; this.u = relU; this.f = relR; this.b = relL; break;
            default: console.log("Unknown Side");
        }
        this.full = [this.f, this.b, this.t, this.u, this.r, this.l];
        this.clrs = findColorIndices(this.full);
        this.turns++;
        return
    }

    solveBase() {
        var rel;
        while (!checkFace(full[0])) {
            /* cases:
             * sides 1 3 5, top 1 3 5 7 (implement against overcounting overcounted)
             * so sides top/top side, sides side/connecting side side, sides bottom/connecting bottom side
             * if 1, spin top until @ color of side
             * catalog of moves:
             * from side to top
             * from top to aligned top
             * from top to base
             */
            /* corners
             * from bottom to top
             * from top to bottom
             * fiddle corners
             */
        }
    }

    toString(html) {
        var s = "";
        for (var i = 0; i < 6; i++) {
            switch (i) {
                case 0: s += "f:"; break;
                case 1: s += "b:"; break;
                case 2: s += "t:"; break;
                case 3: s += "u:"; break;
                case 4: s += "r:"; break;
                case 5: s += "l:"; break;
            }
            s += (html ? "<br>" : "\n");
            for (var j = 0; j < 3; j++) {
                s += (this.full[i][3 * j] + " " + this.full[i][3 * j + 1] + " " + this.full[i][3 * j + 2] + (html ? "<br>" : "\n"));
            }
            s += (html ? "<br>" : "\n");
        }
        s += "IS RUBIX SOLVED? " + (this.solved ? "YES" : "NO") + (html ? "<br>" : "\n");
        s += "NUMBER OF TURNS: " + this.turns + (html ? "<br>" : "\n");
        return s
    }
}

var fFace = [Color.R, Color.G, Color.O, 
             Color.B, Color.W, Color.B, 
             Color.Y, Color.B, Color.O];

var bFace = [Color.O, Color.R, Color.O,
             Color.W, Color.Y, Color.Y,
             Color.R, Color.W, Color.G];

var tFace = [Color.W, Color.Y, Color.W,
             Color.Y, Color.B, Color.R,
             Color.G, Color.R, Color.G];

var uFace = [Color.R, Color.O, Color.B,
             Color.R, Color.G, Color.O,
             Color.R, Color.G, Color.W];

var rFace = [Color.Y, Color.W, Color.B, 
             Color.W, Color.R, Color.O, 
             Color.Y, Color.G, Color.B];

var lFace = [Color.G, Color.O, Color.Y,
             Color.G, Color.O, Color.Y,
             Color.W, Color.B, Color.B];

var listRepresentation = [fFace, bFace, tFace, uFace, rFace, lFace];
let rubix = new Cube(listRepresentation);
console.log(rubix.toString(false));
