import {Block, BlockType, Cell, Field, Point2D, Scene} from "./Types";

export const COLS = 30;
export const ROWS = 30;
export const GAP_SIZE = 1;
export const CELL_SIZE = 10;
export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);

export function createCanvasElement() {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    return canvas  ;
}


function paintCell(ctx: CanvasRenderingContext2D, point: Point2D, color: string) {
    const x = point.x * CELL_SIZE + (point.x * GAP_SIZE);
    const y = point.y * CELL_SIZE + (point.y * GAP_SIZE);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

export function renderScene(ctx :  CanvasRenderingContext2D, scene : Scene) {
    renderBackground(ctx);
    drawMatrix(ctx, {x:0,y:0}, scene.field.cells)
    drawMatrix(ctx, scene.block.origin , scene.block.matrix, )

}

function renderBackground(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#EEE';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}


function drawMatrix(ctx : CanvasRenderingContext2D, matrixOrigin : Point2D ,matrix: Cell[][]){
    matrix.forEach( (row, rowIndex) => {
        row.forEach( (cell, elementPositionInRow) => {
            if(cell.filled) {
                paintCell(ctx, getElementOrigin(matrixOrigin, rowIndex, elementPositionInRow), cell.color);
            }
        });
    });
}


export function getElementOrigin(blockOrigin : Point2D, rowIndex : number, elementPositionInrow : number) {
    var origin : Point2D = {x:0,y:0};
    origin.x = blockOrigin.x + (elementPositionInrow);
    origin.y = blockOrigin.y + (rowIndex);
    return origin;
}

