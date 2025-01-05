import News from './news/news';
import Sources from './sources/sources';
import { NewsSourseResponse, NewsResponse, NewsSource, Article, AppViewInterface } from '../../types/interfaces';
import Burger from './burger/burger';

export class AppView implements AppViewInterface {
    private news: News;
    private sources: Sources;
    private burger: Burger;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.burger = new Burger();
    }

    drawNews(data: NewsResponse) {
        const values: Article[] = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: NewsSourseResponse) {
        const values: NewsSource[] = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }

    setBurger() {
        this.burger.setBurger();
    }
}

export default AppView;
