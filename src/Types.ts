import {BLUE, GREEN, ORANGE, PURPLE, RED, BROWN} from "./Constants";

export interface Point2D {
    x: number;
    y: number;
}

export enum Key {
    LEFT = 37,
    RIGHT = 39,
    UP = 38,
    DOWN = 40
}



export interface Direction {
    x : number,
    y : number,
    name : string
}

export class Block {
    origin: Point2D;
    type: BlockType;
    matrix: Cell[][]


    constructor(origin, type) {
        this.origin = origin;
        this.type = type

        switch (this.type) {
            case BlockType.LONG:
                this.matrix = [[{filled: true, color: RED}, {filled: true, color: RED}, {
                    filled: true,
                    color: RED
                }, {filled: true, color: RED}]];
                break;
            case BlockType.LSHAPELEFT:
                this.matrix = [[{filled: true, color: BLUE}, {filled: false, color: BLUE}, {
                    filled: false,
                    color: BLUE
                }],
                    [{filled: true, color: BLUE}, {filled: true, color: BLUE}, {filled: true, color: BLUE}]];
                break;
            case BlockType.LSHAPERIGHT:
                this.matrix = [[{filled: false, color: BROWN}, {filled: false, color: BROWN}, {
                    filled: true,
                    color: BROWN
                }],
                    [{filled: true, color: BROWN}, {filled: true, color: BROWN}, {filled: true, color: BROWN}]];
                break;
            case BlockType.SQUARE:
                this.matrix = [[{filled: true, color: GREEN}, {filled: true, color: GREEN}]
                    , [{filled: true, color: GREEN}, {filled: true, color: GREEN}]];
                break;
            case BlockType.STACKEDRIGHT:
                this.matrix = [[{filled: false, color: ORANGE}, {filled: true, color: ORANGE}, {
                    filled: true,
                    color: ORANGE
                }],
                    [{filled: true, color: ORANGE}, {filled: true, color: ORANGE}, {filled: false, color: ORANGE}]];
                break;
            case BlockType.STACKEDLEFT:
                this.matrix = [[{filled: true, color: PURPLE}, {filled: true, color: PURPLE}, {
                    filled: false,
                    color: PURPLE
                }],
                    [{filled: false, color: PURPLE}, {filled: true, color: PURPLE}, {filled: true, color: PURPLE}]];
                break;
            default:
                throw Error("Unknown Block type error")
        }

    }



    // getBottomRow() : Cell[]{
    //     return this.matrix[this.matrix.length-1];
    // }
}


export enum BlockType {
    LONG = 0,
    SQUARE,
    LSHAPELEFT,
    LSHAPERIGHT,
    STACKEDRIGHT,
    STACKEDLEFT
}

export interface Field{
    cells : Cell[][]
}

export interface Cell {
    filled : boolean,
    color : string
}

export interface Scene {
    field : Field,
    block : Block
}