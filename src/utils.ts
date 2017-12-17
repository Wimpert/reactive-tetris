import {Block, BlockType, Cell, Direction, Field, Scene} from "./Types";
import {COLS, getElementOrigin, ROWS} from "./canvas";
import {DOWN, LEFT, RIGHT, UP} from "./Constants";

export function move(block : Block, obj : {direction:Direction, field:Field}, index: number){

    let scene : Scene = { field : obj.field , block :block};
    if(blockHaslanded(scene)){
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
    return new Block({x:COLS/2, y:1}, Math.round(Math.random()*5));
}





//this method checks is a operation can take place, for if the
//block is not hitting the outher wall of the bottom of the field
export function moveCanHappen(block : Block, direction : Direction , field:Field){

    if (direction.name == LEFT && block.origin.x == 0){
        return false;
    } else if(direction.name == RIGHT && (block.origin.x + block.matrix[0].length) == COLS){
        return false;
    }
    return true;
}

export function generateStartingField() :Field{

  var field : Field = {cells:[[]]};
    for (var row = 0 ; row < ROWS ; row++){
        //for every col:
        var collCells : Cell[] = [];
        for( var col = 0 ; col < COLS ; col++){
            collCells[col] = {filled: false, color: "BROWN"}
        }
        field.cells.push(collCells)
    }

    //field.cells = cells;
    return field;
}

export function blockHaslanded(scene) : boolean{
    if((scene.block.origin.y + scene.block.matrix.length) >= ROWS){
        return true;
    } else {
        var rowIndex = 0;
        for (let row of scene.block.matrix){
        var cellIndex = 0;
        for(let cell of row){
            //let cell = bottomRow[index];
            //console.log("checking cell: " + bottomRow[index])
            if(cell.filled){
                var cellPosition = getElementOrigin(scene.block.origin,rowIndex,cellIndex);
                if(scene.field.cells[cellPosition.y+1][cellPosition.x].filled){
                   // console.log("landed:");
                    return true;
                }
            }
            cellIndex++;
        }
        rowIndex++;
        }

        //scene.block.getBottomRow().forEach((cell, position) => {})
       // console.log("not landed !! ")
    return false;
    }
}

export function getRandBool(){
    return Math.random() > 0.5 ? true : false;
}

export function mergeBlockIntoField(block:Block, field:Field){
   // console.log("merging");
    block.matrix.forEach( (row, rowIndex) => {
        row.forEach( (cell, elementPositionInRow) => {
            if(cell.filled) {
                let cellOrigin = getElementOrigin(block.origin,rowIndex,elementPositionInRow)
                //console.log(field.cells);
                field.cells[cellOrigin.y][cellOrigin.x] =  cell;
            }
        });
    });
}