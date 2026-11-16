import { SearchController } from './search/searchController.js';
import { mountApp } from './ui/app.js';

mountApp(document.body, new SearchController());
