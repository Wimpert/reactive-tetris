import {Direction} from "./Types";

export const STARTING_SPEED = 5000;

export const RED = "RED"
export const BROWN = "BROWN";
export const BLUE = "BLUE";
export const GREEN = "GREEN";
export const ORANGE = "ORANGE";
export const PURPLE = "PURPLE"

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "uP";
export const DOWN = "DOWN";

export const DIRECTIONS = {
    37: { x: -1, y: 0 , name: LEFT},
    39: { x: 1, y: 0 , name: RIGHT},
    38: { x: 0, y: -1 , name: UP },
    40: { x: 0, y: 1, name: DOWN }
};

