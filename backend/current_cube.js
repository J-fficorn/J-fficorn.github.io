var Color = { W : "W", Y : "Y", B : "B", G : "G", R : "R", O : "O" };
var Turn = { F : "f", B : "b", T : "t", U : "u", R : "r", L : "l", C : false, CC: true };
var edges = [1, 3, 5, 7], corners = [0, 2, 6, 8]; //4 is center
var changesC  = [6, 2, -2, 4], changesCC = [2, 4, 6, -2];
var allFaces = ["f", "b", "t", "u", "r", "l"];
var adjChanges = [ [ [6, 7, 8], [0, 3, 6], [2, 1, 0], [8, 5, 2] ], //f
                   [ [2, 1, 0], [0, 3, 6], [8, 7, 6], [8, 5, 2] ], //b
                   [ [2, 1, 0], [2, 1, 0], [2, 1, 0], [2, 1, 0] ], //t
                   [ [6, 7, 8], [6, 7, 8], [6, 7, 8], [6, 7, 8] ], //u
                   [ [8, 5, 2], [0, 3, 6], [8, 5, 2], [8, 5, 2] ], //r
                   [ [0, 3, 6], [0, 3, 6], [0, 3, 6], [8, 5, 2] ], //l
]; //rT, rR, rU, rL

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

function checkerboard(cube) {
    cube.turnFace("l", Turn.C); cube.turnFace("l", Turn.C); 
    cube.turnFace("r", Turn.C); cube.turnFace("r", Turn.C);
    cube.turnFace("t", Turn.C); cube.turnFace("t", Turn.C);
    cube.turnFace("u", Turn.C); cube.turnFace("u", Turn.C);
    cube.turnFace("f", Turn.C); cube.turnFace("f", Turn.C);
    cube.turnFace("b", Turn.C); cube.turnFace("b", Turn.C);
    console.log(cube.toString(false));
    return cube
}

function testTurns(cube) {
    rubix.turnFace("f", false);
    console.log(rubix.toString(false));
    rubix.turnFace("f", true);
    console.log(rubix.toString(false));
    rubix.turnFace("b", false);
    console.log(rubix.toString(false));
    rubix.turnFace("b", true);
    console.log(rubix.toString(false));
    rubix.turnFace("t", false);
    console.log(rubix.toString(false));
    rubix.turnFace("t", true);
    console.log(rubix.toString(false));
    rubix.turnFace("u", false);
    console.log(rubix.toString(false));
    rubix.turnFace("u", true);
    console.log(rubix.toString(false));
    rubix.turnFace("r", false);
    console.log(rubix.toString(false));
    rubix.turnFace("r", true);
    console.log(rubix.toString(false));
    rubix.turnFace("l", false);
    console.log(rubix.toString(false));
    rubix.turnFace("l", true);
    console.log(rubix.toString(false));
    return cube
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
        //for side = l, change top 0/3/6, front 0/3/6, bot 0/3/6, back 2/5/8
        var refAdjChanges;
        switch (side) {
            case "f": refAdjChanges = 0; break;
            case "b": refAdjChanges = 1; break;
            case "t": refAdjChanges = 2; break;
            case "u": refAdjChanges = 3; break;
            case "r": refAdjChanges = 4; break;
            case "l": refAdjChanges = 5; break;
        }
        var ref2D = adjChanges[refAdjChanges];
        if (!counter) {
            for (var i = 0; i < 3; i++) { //0 = t, 1 = r, 2 = u, 3 = l
                relT[ref2D[0][i]] = refL[ref2D[3][i]];
                relR[ref2D[1][i]] = refT[ref2D[0][i]];
                relU[ref2D[2][i]] = refR[ref2D[1][i]];
                relL[ref2D[3][i]] = refU[ref2D[2][i]];
            }
        } else {
            for (var i = 0; i < 3; i++) {
                relT[ref2D[0][i]] = refR[ref2D[1][i]];
                relR[ref2D[1][i]] = refU[ref2D[2][i]];
                relU[ref2D[2][i]] = refL[ref2D[3][i]];
                relL[ref2D[3][i]] = refT[ref2D[0][i]];
            } //clockwise in reverse
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
        this.turns++;
        this.solved = checkCube(this);
        return
    }

    solveBase() {
        var rel;
        while (!checkFace(full[0])) {
            for (var i = 2; i < 6; i++) { //t-u-r-l
                switch (i) {
                    case 2: {
                        //
                    }
                    case 3: {
                        //
                    }
                    case 4: {
                        //
                    }
                    case 5: {
                        //
                    }
                }
            }
            /* cases:
             * sides 1 3 5, top 1 3 5 7 (implement against overcounting)
             * so sides top/top side, sides side/connecting side side, sides bottom/connecting bottom side
             * if 1, spin top until @ color of side
             * catalog of moves:
             * from side to top
             * from top to aligned top
             * from top to base
             
            /* corners
             * from bottom to top
             * from top to bottom
             * fiddle corners
             */
        }
    }

    fiddleCorner(side_a, side_b, side_c) { //f:b, t:u, l:r = 8 combos //f is base, check this; turn opposite of this
        if (side_a == "f") {
            if (side_b == "t") {
                if (side_c == "l") { //front top left
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("l", true);
                        this.turnFace("b", true);
                        this.turnFace("l", false);
                        this.turnFace("b", false);
                    }
                } else { //l //front top right
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("t", true);
                        this.turnFace("b", true);
                        this.turnFace("t", false);
                        this.turnFace("b", false);
                        console.log(this.toString(false));
                    }
                }
            } else { //u
                if (side_c == "r") { //front bot right
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("r", true);
                        this.turnFace("b", true);
                        this.turnFace("r", false);
                        this.turnFace("b", false);
                    }
                } else { //l //front bot left
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("u", true);
                        this.turnFace("b", true);
                        this.turnFace("u", false);
                        this.turnFace("b", false);
                    }
                }
            }
        } else { //b
            if (side_b == "t") {
                if (side_c == "r") { //back top left
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("r", true);
                        this.turnFace("f", true);
                        this.turnFace("r", false);
                        this.turnFace("f", false);
                    }
                } else { //l //back top right
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("t", true);
                        this.turnFace("f", true);
                        this.turnFace("t", false);
                        this.turnFace("f", false);
                    }
                }
            } else { //u
                if (side_c == "r") { //back bot right
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("l", true);
                        this.turnFace("f", true);
                        this.turnFace("l", false);
                        this.turnFace("f", false);
                    }
                } else { //l //back bot left
                    for (var i = 0; i < 2; i++) {
                        this.turnFace("u", true);
                        this.turnFace("f", true);
                        this.turnFace("u", false);
                        this.turnFace("f", false);
                    }
                }
            }
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
var w = "W", y = "Y", b = "B", g = "G", r = "R", o = "O";
var solvedCubeList = [ [w, w, w,
                        w, w, w,
                        w, w, w
                       ],
                       [
                        y, y, y,
                        y, y, y,
                        y, y, y
                       ],
                       [b, b, b,
                        b, b, b,
                        b, b, b
                       ],
                       [
                        g, g, g,
                        g, g, g,
                        g, g, g
                       ],
                       [
                        r, r, r,
                        r, r, r,
                        r, r, r
                       ],
                       [
                        o, o, o,
                        o, o, o,
                        o, o, o
                       ]
];
var solvedCube = new Cube(solvedCubeList);
var rubix = new Cube([...solvedCubeList]);
console.log(rubix.toString(false));
