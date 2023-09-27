module.exports = function check(str, bracketsConfig) {
    const stack = [];
    const openingBrackets = new Set(bracketsConfig.map((pair) => pair[0])); // уникальный набор всех открывающих
    const closingBrackets = new Set(bracketsConfig.map((pair) => pair[1])); // уникальный набор всех закрывающих
    const pairs = Object.fromEntries(bracketsConfig); // пары ключ значение (открывающая:закрывающая)

    for (const char of str) {
        if (openingBrackets.has(char)) {
            // Если символ - открывающая скобка, добавляем её в стек
            // Если открывающая и закрывающая скобки одинаковые, проверяем, не является ли текущая
            // скобка уже закрывающей для предыдущей открывающей того же типа
            if (char === pairs[char] && stack[stack.length - 1] === char) {
                stack.pop(); // Если так, удаляем предыдущую открывающую из стека
            } else {
                stack.push(char);
            }
        } else if (closingBrackets.has(char)) {
            // Если символ - закрывающая скобка
            const lastOpeningBracket = stack.pop(); // Получаем последнюю открывающую скобку из стека
            if (pairs[lastOpeningBracket] !== char) {
                // Проверяем, соответствует ли она текущей закрывающей скобке
                return false;
            }
        }
    }

    return stack.length === 0; // Если стек пуст после обхода строки, то все скобки были правильно сопоставлены
};
