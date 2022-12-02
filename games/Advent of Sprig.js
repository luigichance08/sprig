/*
@title: Advent of Sprig
@author: Leonard (Omay)
Every day, I will add a new game or level of a game.
*/

let scene = "menu";
let availDays = 1;

const d0l = "a";
const d1l = "b";
const d2l = "c";
const d3l = "d";
const d4l = "e";
const d5l = "f";
const d6l = "g";
const d7l = "h";
const d8l = "i";
const d9l = "j";
const d0r = "k";
const d1r = "l";
const d2r = "m";
const d3r = "n";
const d4r = "o";
const d5r = "p";
const d6r = "q";
const d7r = "r";
const d8r = "s";
const d9r = "t";
const bg = "u";
const door = "v";
const sel = "w";
const player = "x";
const wall = "y";
const goal = "z";
const box = "0";
const bg2 = "1";

setLegend(
  [player, bitmap`
.........33.....
........33322...
.......333.22...
.......333......
......33333.....
.....3333333....
....222222222...
...0..0..0..0...
...0........0...
....0..00..0....
.....0....0.....
......0000......
......0..0......
......0..0......
......0..0......
.....00..00.....`],
  [wall, bitmap`
1111111111111111
CCCCCCC1CCCCCCC1
CCCCCCC1CCCCCCC1
CCCCCCC1CCCCCCC1
1111111111111111
CCC1CCCCCCC1CCCC
CCC1CCCCCCC1CCCC
CCC1CCCCCCC1CCCC
1111111111111111
1CCCCCCC1CCCCCCC
1CCCCCCC1CCCCCCC
1CCCCCCC1CCCCCCC
1111111111111111
CCCC1CCCCCCC1CCC
CCCC1CCCCCCC1CCC
CCCC1CCCCCCC1CCC`],
  [goal, bitmap`
................
.......DD.......
......DDDD......
.......DD.......
......DDDD......
.....DDDDDD.....
......DDDD......
.....DDDDDD.....
....DDDDDDDD....
.....DDDDDD.....
....DDDDDDDD....
...DDDDDDDDDD...
.......CC.......
.......CC.......
.......CC.......
.......CC.......`],
  [box, bitmap`
.....333.33.....
.....3..3.3.....
.....3.3..3.....
......3333......
.DDDDDD33DDDDDD.
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
3333333333333333
3333333333333333
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
.DDDDDD33DDDDDD.`],
  [sel, bitmap`
2222222222222222
22............22
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
22............22
2222222222222222`],
  [d0l, bitmap`
................
................
..00000.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
................
................`],
  [d1l, bitmap`
................
................
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
................
................`],
  [d2l, bitmap`
................
................
..00000.........
......0.........
......0.........
......0.........
......0.........
..00000.........
..00000.........
..0.............
..0.............
..0.............
..0.............
..00000.........
................
................`],
  [d3l, bitmap`
................
................
..00000.........
......0.........
......0.........
......0.........
......0.........
..00000.........
..00000.........
......0.........
......0.........
......0.........
......0.........
..00000.........
................
................`],
  [d4l, bitmap`
................
................
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
..00000.........
......0.........
......0.........
......0.........
......0.........
......0.........
................
................`],
  [d5l, bitmap`
................
................
..00000.........
..0.............
..0.............
..0.............
..0.............
..00000.........
..00000.........
......0.........
......0.........
......0.........
......0.........
..00000.........
................
................`],
  [d6l, bitmap`
................
................
..00000.........
..0.............
..0.............
..0.............
..0.............
..00000.........
..00000.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
................
................`],
  [d7l, bitmap`
................
................
..00000.........
......0.........
......0.........
......0.........
......0.........
......0.........
......0.........
......0.........
......0.........
......0.........
......0.........
......0.........
................
................`],
  [d8l, bitmap`
................
................
..00000.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
..00000.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
................
................`],
  [d9l, bitmap`
................
................
..00000.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
..00000.........
......0.........
......0.........
......0.........
......0.........
..00000.........
................
................`],
  [d0r, bitmap`
................
................
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
................
................`],
  [d1r, bitmap`
................
................
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
................
................`],
  [d2r, bitmap`
................
................
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
.........00000..
.........0......
.........0......
.........0......
.........0......
.........00000..
................
................`],
  [d3r, bitmap`
................
................
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
................
................`],
  [d4r, bitmap`
................
................
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
.........00000..
.............0..
.............0..
.............0..
.............0..
.............0..
................
................`],
  [d5r, bitmap`
................
................
.........00000..
.........0......
.........0......
.........0......
.........0......
.........00000..
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
................
................`],
  [d6r, bitmap`
................
................
.........00000..
.........0......
.........0......
.........0......
.........0......
.........00000..
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
................
................`],
  [d7r, bitmap`
................
................
.........00000..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
................
................`],
  [d8r, bitmap`
................
................
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
................
................`],
  [d9r, bitmap`
................
................
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
................
................`],
  [bg, bitmap`
44D4D4D44D4D4444
DD44D4D44D44DDDD
444D44D44D444444
44D44D44D4444444
DD44D44D44DDDDDD
444D44D44D444444
DDD44D44D4444DDD
4444D44D4444D444
4444D4D4444D4444
4444DD4444D44444
4444D4444D444444
DD44D444D444DDDD
44D4D44D444D4444
44D4D4D444D44444
44D4D4D44D4D4444
44D4D4D44D4D4444`],
  [bg2, bitmap`
7757757757757757
7757757757757757
7757757757757757
7577577577577577
7757757757757757
7757757757757757
7757757757757757
7757757757757757
7577577577577577
7757757757757757
7757757757757757
7757757757757757
7757757757757757
7577577577577577
7757757757757757
7757757757757757`]
);

setSolids([player, wall, box]);
setPushables({[player]: [box]});

let level = 0;
const levels = [
  map`babbca
bbaabc
abacab
ababcc`,
];
const levels2 = [
  map`
kosnln
olmpmn
ltqmsp
rrtqko`,
];
const games = [
  map`
yyyyyyyyyy
yx.y..y..y
y..y..y..y
y........y
y.0......y
y..y..y..y
y..y..y.zy
yyyyyyyyyy`
];
const days = [[10,4,18,13,21,3],[14,11,2,5,12,23],[1,19,6,22,8,15],[7,17,9,16,20,24]];
function addMap(mapa){
  mapa = mapa.split("\n");
  for(var i = 0; i < mapa.length; i++){
    for(var j = 0; j < mapa[i].length; j++){
      if(mapa[i].charAt(j) !== "."){
        addSprite(j, i-1, mapa[i].charAt(j));
      }
    }
  }
}
setMap(levels[level]);
addMap(levels2[level]);
addSprite(0, 0, sel);
setBackground(bg);

onInput("w", () => {
  if(scene === "menu"){
    getFirst(sel).y -= 1;
  }else if(scene === "game1"){
    getFirst(player).y -= 1;
  }
});
onInput("a", () => {
  if(scene === "menu"){
    getFirst(sel).x -= 1;
  }else if(scene === "game1"){
    getFirst(player).x -= 1;
  }
});
onInput("s", () => {
  if(scene === "menu"){
    getFirst(sel).y += 1;
  }else if(scene === "game1"){
    getFirst(player).y += 1;
  }
});
onInput("d", () => {
  if(scene === "menu"){
    getFirst(sel).x += 1;
  }else if(scene === "game1"){
    getFirst(player).x += 1;
  }
});
onInput("i", () => {
  if(scene === "menu"){
    if(days[getFirst(sel).y][getFirst(sel).x] <= availDays){
      scene = "game"+days[getFirst(sel).y][getFirst(sel).x];
      setMap(games[days[getFirst(sel).y][getFirst(sel).x]-1]);
      setBackground(bg2);
    }
  }
});
afterInput(() => {
  if(scene !== "menu"){
    if(tilesWith(goal, box).length === tilesWith(goal).length){
      scene = "menu";
      setMap(levels[level]);
      addMap(levels2[level]);
      addSprite(0, 0, sel);
      setBackground(bg);
    }
  }
});
