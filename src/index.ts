import {interval} from "rxjs/observable/interval";
import {Observable} from "rxjs/Observable";
import {fromEvent} from "rxjs/observable/fromEvent";

import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/map";

import {DIRECTIONS, STARTING_SPEED} from "./Constants";
import "rxjs/add/operator/merge";
import {createCanvasElement, renderScene} from "./canvas";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/operator/withLatestFrom";
import {Block, Direction, Field, Scene} from "./Types";
import {
    blockHaslanded,
    generateStartingField, getRandomBlock, mergeBlockIntoField, move
} from "./utils";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/do";
import "rxjs/add/operator/share";
import {combineLatest} from "rxjs/observable/combineLatest";
import "rxjs/add/operator/startWith";

/**
 * Create canvas element and append it to the page
 */
let canvas = createCanvasElement();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);



//the game pulling down the block:
let source$ : Observable<Direction> = interval(STARTING_SPEED)
    .startWith(0)
    //map to Down:
    .map((x) => DIRECTIONS[40])
    .share();

//user inputs:
let  keydown$ : Observable<Direction> =  fromEvent(document, 'keydown')
    //map to corresponding direction:
    .map((event : any) => DIRECTIONS[event.keyCode]);


//this contains all operations (left, right, down and rotate) on a block, being from the game or being from the user:
let blockOperations$ : Observable<Direction> =  source$.merge(keydown$)
                                                        .share();

//represents the actual playing field, being all the blocks that already landed
let field$: BehaviorSubject<Field> = new BehaviorSubject(generateStartingField());



//emits a new block value every time the block is moved:
//i need the field here since, I need to check if the move can be done:
let block$ : Observable<Block> = blockOperations$
    .withLatestFrom(field$)
    .map((arr) => { return {direction : arr[0] , field : arr[1]};})
    .scan(move, getRandomBlock())
    .share();

//this will emit true, if the block has 'touchdown', false if it is still floating:
let blockLanded$ = block$.withLatestFrom(field$)
    .map(x => {
        let scene : Scene = { field : x[1] , block : x[0]};
        return scene;
    })
    .map(blockHaslanded)
    .share();



blockLanded$.withLatestFrom(field$,block$)
    .subscribe((x) => {
    //is it landed?
        //console.log(x);
        if(x[0]) {
        //get the block:
        let block : Block = x[2];
        let field : Field = x[1];

        mergeBlockIntoField(block,field);
        field$.next(field);
    } //if false no need for action:
});

let scene$: Observable<Scene> = combineLatest(field$, block$, (field, block) => ({field : field , block : block }));

scene$.subscribe( (scene) => {
        renderScene(ctx,scene);
});

//renderScene(ctx, [[true]],  new Block({x:2, y:4}, BlockType.LSHAPERIGHT))