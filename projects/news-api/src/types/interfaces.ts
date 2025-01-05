import { Callback } from './generics';
import { ApiRequest } from './type-aliases';

interface NewsSourseResponse {
    status: string;
    sources: NewsSource[];
}

interface NewsSource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

//////////////////////////////////////////

interface NewsResponse {
    status: string;
    articles: Article[];
    totalResults: number;
}

interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Pick<NewsSource, 'id' | 'name'>;
    title: string;
    url: string;
    urlToImage: string;
}

type ReadOnlyArticle = Readonly<Article>;

//////////////////////////////////////////

interface AppInterface {
    start(): void;
}

interface AppControllerInterface {
    getSources<T>(callback: Callback<T>): void;
    getNews<T>(e: MouseEvent, callback: Callback<T>): void;
}

interface DataLoader {
    getResp<T>(request: ApiRequest, callback?: Callback<T>): void;
}

interface AppViewInterface {
    drawNews(data: NewsResponse): void;
    drawSources(data: NewsSourseResponse): void;
    setBurger(): void;
}

interface SourcesInterface {
    draw(data: NewsSource[]): void;
}

interface NewsInterface {
    draw(data: Article[]): void;
}

interface BurgerInterface {
    setBurger(): void;
    hideBurgerMenu(): void;
}

export {
    NewsSourseResponse,
    NewsSource,
    SourcesInterface,
    NewsResponse,
    Article,
    ReadOnlyArticle,
    NewsInterface,
    AppViewInterface,
    AppInterface,
    AppControllerInterface,
    DataLoader,
    BurgerInterface,
};
