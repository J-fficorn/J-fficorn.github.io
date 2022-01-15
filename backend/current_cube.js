var Color = { W : "W", Y : "Y", B : "B", G : "G", R : "R", O : "O" };
var Turn = { F : "f", B : "b", T : "t", U : "u", R : "r", L : "l", C : false, CC: true };
var edges = [1, 3, 5, 7], corners = [0, 2, 6, 8]; //4 is center
var changesC  = [6, 2, -2, 4], changesCC = [2, 4, 6, -2];
var allFaces = ["f", "b", "t", "u", "r", "l"];
var orderedSides = ["t", "r", "u", "l"];
var adjChanges = [ [ [6, 7, 8], [0, 3, 6], [2, 1, 0], [8, 5, 2] ], //f
                   [ [2, 1, 0], [0, 3, 6], [6, 7, 8], [8, 5, 2] ], //b
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

function specialCube(cube) {
    rubix.turnFace("r", false);
    console.log(rubix.toString(false));
    rubix.turnFace("l", false);
    console.log(rubix.toString(false));
    rubix.turnFace("u", false);
    console.log(rubix.toString(false));
    rubix.turnFace("t", false);
    console.log(rubix.toString(false));
    rubix.turnFace("r", false);
    console.log(rubix.toString(false));
    rubix.turnFace("l", false);
    console.log(rubix.toString(false));
    rubix.turnFace("u", false);
    console.log(rubix.toString(false));
    rubix.turnFace("t", false);
    console.log(rubix.toString(false));
    rubix.turnFace("u", false);
    console.log(rubix.toString(false));
    rubix.turnFace("t", false);
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

    turnCorner(side_a, side_b, side_c) { //f:b, t:u, l:r = 8 combos //f is base, check this; turn opposite of this
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

    slotSide(side_a, side_b, top_side) { 
        var left, right; //where left is left-most, right is right-most, top is which side the edge is on
        if (orderedSides.indexOf(side_a) < orderedSides.indexOf(side_b)) {
            left = side_a; right = side_b;
        } else {
            left = side_b; right = side_a;
        }
        //place t & l
        if ((side_a == "t" && side_b == "l") || (side_b == "t" && side_a == "l")) {
            switch (side_a) {
                case "t": left = side_b; right = side_a;
                case "l": left = side_a; right = side_b;
            }
        }
        switch (top_side) { //u is different! fix this somehow? actually not, ez
            case right: {
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(left, Turn.CC);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(left, Turn.C);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(right, Turn.C);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(right, Turn.CC);
                break;
                /* away from left (b cc)
                 * left cc
                 * b c, l c
                 * b c, right c
                 * b cc, right cc
                */
            }
            case left: {
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(right, Turn.C);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(right, Turn.CC);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(left, Turn.CC);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(left, Turn.C);
                break;
                /* away from right (b c)
                 * right c
                 * b cc, r cc
                 * b cc, left cc
                 * b c, left c
                */
            }
        }
    }

    solveTop() {
        var ct = 0, placed = [];
        for (var i = 0; i < 4; i++) {
            if (this.b[edges[i]] == this.b[4]) {
                placed.push(edges[i]);
                ct++;
            }
        }
        while (ct != 4) {
            if (ct == 0) {
                this.turnFace(Turn.T, Turn.C);
                this.turnFace(Turn.R, Turn.C);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(Turn.R, Turn.CC);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(Turn.T, Turn.CC);
                break;
            } else if (ct == 2) {
                this.findTopSides(placed[0], placed[1]);
            }
            ct = 0;
            for (var i = 0; i < 4; i++) {
                if (this.b[edges[i]] == this.b[4]) {
                    ct++;
                }
            }
        }
        while (this.t[1] != this.t[4] || this.u[7] != this.u[4] || this.r[5] != this.r[4] || this.l[3] != this.l[4]) {
            for (var i = 0; i < 4; i++) {
                var e = edges[i];
                var refSide, refL, refR;
                var rS, rL, rR;
                var sS, sL, sR;
                switch (e) {
                    case 1: {
                        refSide = Turn.T; refL = Turn.L; refR = Turn.R;
                        rS = this.t; rL = this.l; rR = this.r;
                        sS = 1; sL = 3; sR = 5;
                        break; //t
                    }
                    case 3: {
                        refSide = Turn.R; refL = Turn.T; refR = Turn.U;
                        rS = this.r; rL = this.t; rR = this.u;
                        sS = 5; sL = 1; sR = 7;
                        break; //r
                    }
                    case 5: {
                        refSide = Turn.L; refL = Turn.U; refR = Turn.T;
                        rS = this.l; rL = this.u; rR = this.t;
                        sS = 3; sL = 7; sR = 1;
                        break; //l
                    }
                    case 7: {
                        refSide = Turn.U; refL = Turn.R; refR = Turn.L;
                        rS = this.u; rL = this.r; rR = this.l;
                        sS = 7; sL = 5; sR = 3;
                        break; //u
                    }
                }
                if (rS[sS] == rL[4]) { //opposite
                    if (rL[sL] != rS[4]) { //other side not opposite
                        this.turnFace(Turn.B, Turn.C);
                    } else {
                        this.slotTopSides(refR);
                    }
                }
                /* detect misaligned edges
                * edge case: three that need swapping
                * if 1 is not aligned, check if the left-side is opposite aligned & side is op aligned
                * if so, run slot on right of top
                * if next is not opposite but IS misaligned, rotate once left
                * if 1 is not aligned and not opposite, rotate once right
                */
            }
        }
    }

    findTopSides(placed_a, placed_b) { //repeat on x turns
        var shape; //1 for L, 2 for hori
        var relT, relR;
        if ((placed_a == 1 && placed_b == 3) ||(placed_a == 3 && placed_b == 1))  {
            relT = Turn.U; relR = Turn.L; shape = 1;
        } else if ((placed_a == 1 && placed_b == 5) || (placed_a == 5 && placed_b == 1)) {
            relT = Turn.R; relR = Turn.U; shape = 1;
        } else if ((placed_a == 5 && placed_b == 7) || (placed_a == 7 && placed_b == 5)) {
            relT = Turn.T; relR = Turn.R; shape = 1;
        } else if ((placed_a == 3 && placed_b == 7) || (placed_a == 5 && placed_b == 7)) {
            relT = Turn.L; relR = Turn.T; shape = 1;
        } else if ((placed_a == 3 && placed_b == 5) || (placed_a == 5 && placed_b == 3)) {
            relT = Turn.T; relR = Turn.R; shape = 2;
        } else if ((placed_a == 1 && placed_b == 7) ||(placed_a == 7 && placed_b == 1)) {
            relT = Turn.L; relR = Turn.T; shape = 2;
        }
        switch (shape) {
            case 1: {
                this.turnFace(relT, Turn.C);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(relR, Turn.C);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(relR, Turn.CC);
                this.turnFace(relT, Turn.CC);
                break;
            }
            case 2: {
                this.turnFace(relT, Turn.C);
                this.turnFace(relR, Turn.C);
                this.turnFace(Turn.B, Turn.C);
                this.turnFace(relR, Turn.CC);
                this.turnFace(Turn.B, Turn.CC);
                this.turnFace(relT, Turn.CC);
                break;
            }
        }
    }

    slotTopSides(relR) { //where relR is to the right of misplaced/swapped edge
        this.turnFace(relR, Turn.C);
        this.turnFace(Turn.B, Turn.C);
        this.turnFace(relR, Turn.CC);
        this.turnFace(Turn.B, Turn.C);
        this.turnFace(relR, Turn.C);
        this.turnFace(Turn.B, Turn.C); this.turnFace(Turn.B, Turn.C);
        this.turnFace(relR, Turn.CC);
        this.turnFace(Turn.B, Turn.C);
    }

    findCorners() {
        var cornerLoc, cornerFound;
        for (var i = 0; i < 4; i++) {
            var clrs = [this.b[4]];
            var cornerClrs = [this.b[corners[i]]];
            var matched = [false, false, false];
            switch (corners[i]) {
                case 0: {
                    cornerClrs.push(this.t[2]); cornerClrs.push(this.r[2]);
                    clrs.push(this.t[4]); clrs.push(this.r[4]);
                    break;
                }
                case 2: {
                    cornerClrs.push(this.l[0]); cornerClrs.push(this.t[0]);
                    clrs.push(this.l[4]); clrs.push(this.t[4]);
                    break;
                }
                case 6: {
                    cornerClrs.push(this.r[8]); cornerClrs.push(this.u[8]);
                    clrs.push(this.r[4]); clrs.push(this.u[4]);
                    break;
                }
                case 8: {
                    cornerClrs.push(this.u[6]); cornerClrs.push(this.l[6]);
                    clrs.push(this.u[4]); clrs.push(this.l[4]);
                    break;
                }
            }
            for (var j = 0; j < 3; j++) {
                var refC = cornerClrs[j];
                for (var k = 0; k < 3; k++) {
                    var targetC = clrs[k];
                    if (refC == targetC) {
                        matched[j] = true;
                    }
                    //if not matched, try to match
                    //if all matched, end
                }
            }
            cornerFound = true;
            for (var j = 0; j < 3; j++) {
                if (!matched[j]) {
                    cornerFound = false;
                }
            }
            if (cornerFound) {
                cornerLoc = corners[i];
            }
            /* 0 = t 2 r 2
             * 2 = l 0 t 0
             * 6 = u 8 r 8
             * 8 = l 6 r 6
             * must match all three sides
             */
        }
        var relR, relL;
        switch (cornerLoc) {
            case 0:
                relR = Turn.R; relL = Turn.L;
                break;
            case 2:
                relR = Turn.T; relL = Turn.U;
                break;
            case 6:
                relR = Turn.L; relL = Turn.R;
                break;
            case 8:
                relR = Turn.U; relL = Turn.T;
                break;
        }
        this.turnFace(Turn.B, Turn.C);
        this.turnFace(relR, Turn.C);
        this.turnFace(Turn.B, Turn.CC);
        this.turnFace(relL, Turn.CC);
        this.turnFace(Turn.B, Turn.C);
        this.turnFace(relR, Turn.CC);
        this.turnFace(Turn.B, Turn.CC);
        this.turnFace(relL, Turn.C);
    }

    slotTopCorners() {
        while (this.b[0] != this.b[4] || this.b[2] != this.b[4] || this.b[6] != this.b[4] || this.b[8] != this.b[4]) {
            this.turnCorner(this.b, this.t, this.r); this.turnFace(Turn.B);
        }
    }

    placeCorner(relT, relR) { //where corner is above appropriate spot
        this.turnFace(relT, Turn.C); this.turnFace(relR, Turn.CC);
        this.turnFace(relT, Turn.CC); this.turnFace(relR, Turn.C);
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
                        y, y, r,
                        y, y, y,
                        g, y, b
                       ],
                       [b, o, g,
                        b, b, b,
                        b, b, b
                       ],
                       [
                        g, g, g,
                        g, g, g,
                        y, g, o
                       ],
                       [
                        r, r, o,
                        r, r, b,
                        r, r, y
                       ],
                       [
                        y, o, o,
                        r, o, o,
                        o, o, o
                       ]
];
var solvedCube = new Cube(solvedCubeList);
var rubix = new Cube([...solvedCubeList]);
console.log(rubix.toString(false));
/*rubix.slotSide(Turn.U, Turn.L, Turn.L);
console.log(rubix.toString(false));*/
rubix.solveTop();
console.log(rubix.toString(false));
//rubix.turnFace(Turn.B, Turn.C); rubix.turnFace(Turn.B, Turn.C);
console.log(rubix.toString(false));
rubix.findCorners();
console.log(rubix.toString(false));
rubix.slotTopCorners();
console.log(rubix.toString(false));
