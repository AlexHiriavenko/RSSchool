function parseAndPrintRSSVariables() {
    // Получаем все переменные среды
    const envVariables = process.env;

    // Проходимся по каждой переменной среды
    for (let variable in envVariables) {
        // Проверяем, начинается ли имя переменной с префикса "RSS_"
        if (variable.startsWith("RSS_")) {
            // Формируем строку вида "RSS_name=value" и выводим в консоль
            console.log(`RSS_${variable}=${envVariables[variable]}`);
        }
    }
}

// Вызываем функцию для парсинга и вывода переменных среды с префиксом "RSS_"
parseAndPrintRSSVariables();
