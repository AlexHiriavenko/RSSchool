const noteTitle = "Заметки. Прошу учесть следующие пункты:";
const noteItemScreen =
    " - проверка верстки осуществляется на экранах 1440 в 1м задании и 768 во 2м";
const noteItemActive =
    " -  Интерактивность: если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета";
const noteMismatch =
    " - допускается отклонение вёрстки от макета до 10px по горизонтали и вертикали, если соблюдается визуальное сходство вёрстки и макета.";

const noteNuances =
    " - т.к. карта вставлена через iframe а не картинкой, а в футере мы указываем свое имя вместо user, то возникают несовпадения с макетом которые допустимы";

const noteCheckRules =
    " - каждый блок и секция рассматриваются по раздельности, т.е. недочеты предыдущего блока не переносятся на следующий, а при переходе проверки на следующий блок, мы его выравниваем с наложенным изображением";

const noteFonts =
    " - Размеры текста проверяются только по высоте. Отличие в ширине слов и отступах между буквами при сопоставлении макета и вёрстки не считается ошибкой, если используется правильный шрифт с правильно указанными свойствами";

const checkTitle = "Требования к вёрстке - Основные Пункты:";

const checkItem1 = " - Вёрстка валидная +10. Выполнено ✓";
const checkItem2 = " - Вёрстка семантическая +16. Выполнено ✓";
const checkItem3 = " - Вёрстка соответствует макету +54. Выполнено ✓";
const checkItem4 = " - Общие требования к верстке +20. Выполнено ✓";
const checkItemFinally = "Итого 100 (10 + 16 + 54 + 20)";
const projectTerms = "Побробные критерии ТЗ смотрите по ссылке:";
const termsLink =
    "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part2.md";

export {
    noteTitle,
    noteItemScreen,
    noteItemActive,
    noteMismatch,
    noteNuances,
    noteCheckRules,
    noteFonts,
    checkTitle,
};

export {
    checkItem1,
    checkItem2,
    checkItem3,
    checkItem4,
    checkItemFinally,
    projectTerms,
    termsLink,
};
