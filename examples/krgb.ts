import { exit } from 'process';

const args = process.argv.slice(2);

switch(args[0]) {
    case "sin": (require('./matrix/sin').sin)(); break;
    case "column-sweep": (require('./matrix/column-sweep').columnSweep)(); break;
    case "readline": (require('./layout/readline').readline)(); break;
    case "readline-hysterese": (require('./layout/readline-hysterese').readlineHysterese)(); break;
    case "ninemation": (require('./layout/ninemation').ninemation)(); break;
    case "white": (require('./layout/white').white)(); break;
    case "break": (require('./layout/break').break)(); break;
    default: console.log('give example name as the first argument')
}