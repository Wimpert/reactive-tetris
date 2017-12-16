import {Block, BlockType, Cell, Direction, Field} from "./Types";
import {COLS, getElementOrigin, ROWS} from "./canvas";
import {DOWN, UP} from "./Constants";

export function move(block : Block, obj : {direction:Direction, field:Field}, index: number){
    if(blockHaslanded(undefined)){
        return getRandomBlock();
    }

    if(moveCanHappen(block,obj.direction, obj.field)){
        let directionName = obj.direction.name;
        if(directionName == UP){
            block.rotateRight();
        } else {
            block.origin.x += 1*obj.direction.x
            block.origin.y += 1*obj.direction.y
        }
    }
   return block;
}

export function getRandomBlock(){
    return new Block({x:COLS/2, y:1}, Math.round(Math.random()*4));
}


export function isBlockLanded(block:Block, field:Field) : boolean {


    return getRandBool();
}


//this method checks is a operation can take place, for if the
//block is not hitting the outher wall of the bottom of the field
export function moveCanHappen(block : Block, direction : Direction , field:Field){

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

export function blockHaslanded(scene) : boolean{
    var r = Math.random()
    if(r > 0.96){
        return true;
    }
    return false;
}

export function getRandBool(){
    return Math.random() > 0.5 ? true : false;
}

export function mergeBlockIntoField(block:Block, field:Field){
    console.log("merging");
    block.matrix.forEach( (row, rowIndex) => {
        row.forEach( (cell, elementPositionInRow) => {
            if(cell.filled) {
                let cellOrigin = getElementOrigin(block.origin,rowIndex,elementPositionInRow)
                field.cells[cellOrigin.y][cellOrigin.x] =  cell;
            }
        });
    });
}