import {Block, BlockType, Cell, Direction, Field, Scene} from "./Types";
import {COLS, getElementOrigin, ROWS} from "./canvas";
import {DOWN, LEFT, RIGHT, UP} from "./Constants";


export function move(block : Block,  direction:Direction, field:Field) : Block{
    
    if(moveCanHappen(block, direction, field)){
        if(direction.name == UP){
             return rotateBlockRight(block);
        } else {
            const returnVal : Block = {...block}
            returnVal.origin.x += 1*direction.x
            returnVal.origin.y += 1*direction.y
            return returnVal;
        }
    }
    return block;
}

export function getRandomBlock(){
    return new Block({x:COLS/2, y:1}, Math.round(Math.random()*5));
}

//this method checks is a operation can take place, for example if the
//block is not hitting the wall of the field or another already landed block
export function moveCanHappen(block : Block, direction : Direction , field:Field) : boolean{

    if (direction.name == LEFT){
        if(block.origin.x == 0){
            //does it hit the wall?
            return false;
        } else {
            //does it hit another block?
            let hitsBlock = block.matrix.some((row, rowIndex) => {
                let rowStartOrigin = getElementOrigin(block.origin,rowIndex,0);
                if(row[0].filled && field.cells[rowStartOrigin.y][rowStartOrigin.x-1].filled){
                    //console.log("hits! left");
                    return true;
                }
                return false;
            });
            return !hitsBlock;
        }

    } else if(direction.name == RIGHT){
        if(block.origin.x + block.matrix[0].length == COLS){
            //does it hit the wall?
            return false;
        } else {
            //does it hit another block?
            let hitsBlock = block.matrix.some((row, rowIndex) => {
                let rowEndOrigin = getElementOrigin(block.origin,rowIndex,block.matrix[0].length-1);
                if(row[block.matrix[0].length-1].filled && field.cells[rowEndOrigin.y][rowEndOrigin.x+1].filled){
                    //console.log("hits! right")
                    return true;
                }
                return false;
            });
            return !hitsBlock;
        }

    } else if(direction.name == DOWN){
        //first check if he hits bottom of the field:
        return !blockHaslanded({block:block,field:field});
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

export function blockHaslanded(scene: Scene) : boolean{
    if((scene.block.origin.y + scene.block.matrix.length) >= scene.field.cells.length-1){
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
    return false;
    }
}


export function mergeBlockIntoField(block:Block, field:Field){
    block.matrix.forEach( (row, rowIndex) => {
        row.forEach( (cell, elementPositionInRow) => {
            if(cell.filled) {
                let cellOrigin = getElementOrigin(block.origin,rowIndex,elementPositionInRow)
                //console.log(field.cells);
                field.cells[cellOrigin.y][cellOrigin.x] =  cell;
            }
        });
    });
    return field;
}

function rotateBlockRight(block: Block): Block{

    var newMatrix = [];
    for (var i = block.matrix[0].length-1 ; i >=0 ; i--){
        var arr = []
        for (var j = 0 ; j < block.matrix.length ; j ++){
            //console.log(`${i} and ${j}`);
            var cell = block.matrix[j][i];
            arr.push(cell)
        }
        newMatrix.push(arr)

    }
    return {...block, matrix:newMatrix};

}

export function findLinesInfield(field: Field) : number[]{
    const returnVal = [];
    console.log(field);
    return returnVal;
}


