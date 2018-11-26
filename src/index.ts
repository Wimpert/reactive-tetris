import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { STARTING_SPEED, DIRECTIONS } from './Constants';
import { Direction, Field, Block, Scene } from './Types';
import { createCanvasElement, renderScene } from "./canvas";

import { startWith, map, tap, scan, withLatestFrom, take, skip } from 'rxjs/operators';
import { interval, combineLatest, merge, fromEvent } from 'rxjs';
import { getRandomBlock, generateStartingField, move, blockHaslanded, mergeBlockIntoField, findLinesInfield } from './utils';


/**
 * Create canvas element and append it to the page
 */
let canvas = createCanvasElement();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
const scoreContainter = document.createElement('div');
document.body.appendChild(scoreContainter)



//the game pulling down the block:
let gameProgression$ : Observable<Direction> = interval(STARTING_SPEED).pipe(
    startWith(0),
    map( _ => DIRECTIONS[40])
);
   

//user inputs:
let  keydown$ : Observable<Direction> =  fromEvent(document, 'keydown').pipe(
    //map to corresponding direction:
    map((event : any) => DIRECTIONS[event.keyCode])

)
    
let blockLanded$ : Subject<Block> = new Subject<Block>();

let field$ : Observable<Field> = merge(blockLanded$, gameProgression$.pipe(take(1))).pipe(
    scan((previousField: Field, fieldevent: Block | Direction) => {
            if(Object.keys(fieldevent).indexOf('origin') == -1){
                return generateStartingField();
            }
            return mergeBlockIntoField(fieldevent as Block, previousField);
    }, generateStartingField()),
);

let score$ : Observable<number> = field$.pipe(
    skip(1),
    scan((score: number, field: Field) => {
        findLinesInfield(field);
        return ++score;
    }, 0),
    startWith(0)
);

const block$ : Observable<Block> = merge( gameProgression$ , keydown$).pipe(
    withLatestFrom(field$, (direction: Direction, field: Field) => {
        return {direction: direction, field: field};
    }),
    scan((block: Block, object : {direction: Direction, field: Field}) => {
        if(blockHaslanded({block: block, field : object.field})){
            //write code to put the field in the block:
            blockLanded$.next(block);
            return getRandomBlock();
        } else {
            return move(block, object.direction, object.field);
        }
    }, getRandomBlock())
);


const scene$ = combineLatest(field$, block$).pipe(
map(([field, block]) => {
    const scene: Scene = {
        field:field,
        block:block
    } 
    return scene
})
);



scene$.subscribe( (scene) => {
        renderScene(ctx,scene);
});


score$.subscribe((score) => {
    console.log(score);
    scoreContainter.innerHTML = `${score}`;
})