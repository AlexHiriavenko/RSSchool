import { callStyles, coral, green, blue, orange } from "./consoleSetup.js";
import {
    noteTitle,
    noteItemScreen,
    noteItemActive,
    noteMismatch,
    noteNuances,
    noteCheckRules,
    noteFonts,
} from "./consoleContent.js";
import {
    checkTitle,
    checkItem1,
    checkItem2,
    checkItem3,
    checkItem4,
    checkItemFinally,
    projectTerms,
    termsLink,
} from "./consoleContent.js";

// примечания
console.log(callStyles, green, noteTitle);
console.log(callStyles, coral, noteItemScreen);
console.log(callStyles, coral, noteItemActive);
console.log(callStyles, coral, noteMismatch);
console.log(callStyles, coral, noteNuances);
console.log(callStyles, coral, noteCheckRules);
console.log(callStyles, coral, noteFonts);

// требования по ТЗ
// console.log(callStyles, green, checkTitle);
// console.log(callStyles, coral, checkItem1);
// console.log(callStyles, coral, checkItem2);
// console.log(callStyles, coral, checkItem3);
// console.log(callStyles, coral, checkItem4);
// console.log(callStyles, blue, checkItemFinally);
console.log(callStyles, orange, projectTerms);
console.log(callStyles, coral, termsLink);
