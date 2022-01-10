var Color = {
    W : "W", Y : "Y",
    B : "B", G : "G",
    R : "R", O : "O",
};

var Turn = {
    F : "f", B : "b",
    T : "t", U : "u",
    R : "r", L : "l",
    C : false, CC: true,
};

var changesC  = [6, 2, -2, 4];
var changesCC = [2, 4, 6, -2];
var allFaces = ["f", "b", "t", "u", "r", "l"];

function checkFace(face) {
    var c = face[0];
    for (var i = 1; i < 9; i++) {
        if (face[i] != c) {
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
                relT = [...this.t]; refT = this.t;
                relU = [...this.u]; refU = this.u;
                relR = [...this.r]; refR = this.r;
                relL = [...this.l]; refL = this.l;
                break;
            case "b":
                newFace = [...this.b]; refFace = this.b;
                relT = [...this.t]; refT = this.t;
                relU = [...this.u]; refU = this.u;
                relR = [...this.l]; refR = this.l;
                relL = [...this.r]; refL = this.r;
                break;
            case "t":
                newFace = [...this.t]; refFace = this.t;
                relT = [...this.b]; refT = this.b;
                relU = [...this.f]; refU = this.f;
                relR = [...this.r]; refR = this.r;
                relL = [...this.l]; refL = this.l;
                break;
            case "u":
                newFace = [...this.u]; refFace = this.u;
                relT = [...this.f]; refT = this.f;
                relU = [...this.b]; refU = this.b;
                relR = [...this.r]; refR = this.r;
                relL = [...this.l]; refL = this.l;
                break;
            case "r":
                newFace = [...this.r]; refFace = this.r;
                relT = [...this.t]; refT = this.t;
                relU = [...this.u]; refU = this.u;
                relR = [...this.b]; refR = this.b;
                relL = [...this.f]; refL = this.f;
                break;
            case "l":
                newFace = [...this.l]; refFace = this.l;
                relT = [...this.t]; refT = this.t;
                relU = [...this.u]; refU = this.u;
                relR = [...this.f]; refR = this.f;
                relL = [...this.b]; refL = this.b;
                break;
            default:
                console.log("Unknown Side");
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
        /* t6 = l8, t7 = l5, t8 = l2; +2, -2, -6
         * r0 = t6, r3 = t7, r6 = t8; +6, +4, +2
         * b0 = r0, b1 = r3, b2 = r6;  0, +2, +4
         * l2 = b0, l5 = b1, l8 = b2; -2, -4, -6
         */
        switch (side) {
            case "f":
                this.f = newFace;
                this.t = relT; this.u = relU;
                this.r = relR; this.l = relL;
                break;
            case "b":
                this.b = newFace; break;
                this.t = relT; this.u = relU;
                this.l = relR; this.r = relL;
            case "t":
                this.t = newFace; break;
                this.b = relT; this.f = relU;
                this.r = relR; this.l = relL;
            case "u":
                this.u = newFace; break;
                this.f = relT; this.b = relU;
                this.r = relR; this.l = relL;
            case "r":
                this.r = newFace; break;
                this.t = relT; this.u = relU;
                this.b = relR; this.f = relL;
            case "l":
                this.l = newFace; break;
                this.t = relT; this.u = relU;
                this.f = relR; this.b = relL;
            default:
                console.log("Unknown Side");
        }
        this.full = [this.f, this.b, this.t, this.u, this.r, this.l];
        this.turns++;
        return
    }

    findBase() {
        var maxBase = 0;
        var side = "";
        for (var i = 0; i < 6; i++) {
            var cur = 0;
            var mid = this.full[i][4];
            for (var j = 0; j < 9; j++) {
                if (this.full[i][j] == mid) {
                    cur++;
                }
            }
            if (cur > maxBase) {
                maxBase = cur;
                side = allFaces[i];
            }
        }
        console.log(maxBase + side);
        return side
    }

    toString() {
        var s = "";
        for (var i = 0; i < 6; i++) {
            switch (i) {
                case 0: s += "f:\n"; break;
                case 1: s += "b:\n"; break;
                case 2: s += "t:\n"; break;
                case 3: s += "u:\n"; break;
                case 4: s += "r:\n"; break;
                case 5: s += "l:\n"; break;
            }
            for (var j = 0; j < 3; j++) {
                s += (this.full[i][3 * j] + " " + this.full[i][3 * j + 1] + " " + this.full[i][3 * j + 2] + "\n");
                //0 1 2, 3 4 5, 6 7 8??
            }
            s += "\n";
        }
        s += "IS RUBIX SOLVED? " + (checkCube(rubix) ? "YES" : "NO") + "\n";
        s += "NUMBER OF TURNS: " + this.turns + "\n";
        return s
    }
}

var fFace = [Color.W, Color.Y, Color.B, 
             Color.G, Color.R, Color.O, 
             Color.W, Color.Y, Color.B];

var bFace = [Color.Y, Color.W, Color.G,
             Color.B, Color.O, Color.W,
             Color.Y, Color.R, Color.W];

var tFace = [Color.R, Color.G, Color.G,
             Color.O, Color.G, Color.W,
             Color.O, Color.R, Color.O];

var uFace = [Color.O, Color.B, Color.W,
             Color.Y, Color.B, Color.O,
             Color.G, Color.G, Color.R];

var rFace = [Color.Y, Color.R, Color.O, 
             Color.W, Color.W, Color.R, 
             Color.R, Color.Y, Color.B];

var lFace = [Color.Y, Color.B, Color.G,
             Color.B, Color.Y, Color.O,
             Color.R, Color.G, Color.B];

var listRepresentation = [fFace, bFace, tFace, uFace, rFace, lFace];
let rubix = new Cube(listRepresentation);
console.log(rubix.toString());
rubix.turnFace(Turn.F, Turn.CC);
console.log(rubix.toString());
rubix.turnFace(Turn.F, Turn.C);
console.log(rubix.toString());
rubix.turnFace(Turn.T, Turn.C);
console.log(rubix.toString());
console.log(rubix.findBase());
