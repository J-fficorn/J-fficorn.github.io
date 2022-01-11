class Corner {
    constructor(a, b, c, face_a, face_b, face_c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.face_a = face_a;
        this.face_b = face_b;
        this.face_c = face_c;
    }

    present(colour) {
        return (this.a == colour || this.b == colour || this.c == colour)
    }

    getColour(face) {
        switch (face) {
            case this.face_a: return this.a
            case this.face_b: return this.b
            case this.face_c: return this.c
            default: console.error("Face not part of corner: " + face);
        }
        return '0'
    }

    toString() {
        return "EDGE: " + this.a + ": face " + this.face_a + "; " + this.b + ": face " + this.face_b +  "; " + this.c + ": face " + this.face_c +  ";";
    }

}

class Edge {
    constructor(a, b, face_a, face_b) {
        this.a = a;
        this.b = b;
        this.face_a = face_a;
        this.face_b = face_b;
    }

    present(colour) {
        return (this.a == colour || this.b == colour)
    }

    getColour(face) {
        switch (face) {
            case this.face_a: return this.a
            case this.face_b: return this.b
            default: console.error("Face not part of corner: " + face);
        }
        return '0'
    }

    toString() {
        return "EDGE: " + this.a + ": face " + this.face_a + "; " + this.b + ": face " + this.face_b +  ";";
    }

}

class Center {
    constructor(a, face_a) {
        this.a = a;
        this.face_a = face_a;
    }

    toString() {
        return "CENTER: " + this.a + ": face " + this.face_a + ";";
    }

}
