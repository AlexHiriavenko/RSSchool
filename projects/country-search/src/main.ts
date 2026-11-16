import { SearchController } from './search/searchController.js';
import { SearchHistory } from './search/searchHistory.js';
import { mountApp } from './ui/app.js';

function getLocalStorage(): Storage | null {
    try {
        return window.localStorage;
    } catch {
        return null; // access can throw when storage is blocked
    }
}

const history = new SearchHistory(getLocalStorage());

mountApp(document.body, new SearchController({ history }), history);
