import {Block, BlockType, Cell, Direction, Field} from "./Types";
import {COLS, ROWS} from "./canvas";
import {DOWN, UP} from "./Constants";

export function move(block : Block, obj : {direction:Direction, field:Field}, index: number){
    if(moveCanHappen(block,obj.direction, obj.field)){
        let directionName = obj.direction.name;
        if(directionName == UP){
            console.log("We need to rotate");
        } else {
            block.origin.x += 1*obj.direction.x
            block.origin.y += 1*obj.direction.y
        }
    }


   return block;
}

export function getRandomBlock(){
    return new Block({x:2, y:4}, BlockType.LSHAPELEFT);
}

export function genenrateStratscene(){
    return {block: getRandomBlock(), landedBlocks: [[false]]}
}

export function test(){
    console.log("test");
}

export function isBlockLanded(block:Block, field:Field) : boolean {
    return getRandBool();
}


//this method checks is a operation can take place, for if the
//block is not hitting the outher wall of the bottom of the field
export function moveCanHappen(block : Block, direction : Direction , field:Field){
   /* var r = Math.random()
    if(r > 0.5 ){
        return true;
    }
    console.log("filtedout");
    return false;*/
   return true;
}

export function generateStartingField() :Field{

  var field : Field = {cells:[[]]};
    for (var col = 0 ; col < COLS ; col++){
        //for every row:
        var collCells : Cell[] = [];
        for( var row = 0 ; row < ROWS ; row++){
            collCells[row] = {filled: false, color: "BROWN"}
        }
        field.cells.push(collCells)
    }
    //field.cells = cells;
    return field;
}

export function haslanded([], _: number){
    var r = Math.random()
    if(r > 0.1){
        console.log("landed");
        return true;
    }
    return false;
}

export function getRandBool(){
    return Math.random() > 0.5 ? true : false;
}