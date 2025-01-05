import './news.css';
import { Article, NewsInterface, ReadOnlyArticle } from '../../../types/interfaces';
import DOM_Manipulator from '../../DOM_Manipulator/DOM_Manipulator';
import { defaultNewsBgImg } from '../../variables';
import { Nullable } from '../../../types/generics';

class News extends DOM_Manipulator implements NewsInterface {
    draw(data: Article[]) {
        const articlesLimit: number = 10;
        const news: ReadOnlyArticle[] =
            data.length >= articlesLimit ? data.filter((_item, idx) => idx < articlesLimit) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: Nullable<HTMLTemplateElement> = document.querySelector('#newsItemTemp');

        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                const newsItem: Nullable<HTMLElement> = newsClone.querySelector('.news__item');
                if (newsItem && idx % 2) newsItem.classList.add('alt');

                this.setElementStyle(
                    newsClone,
                    '.news__meta-photo',
                    'background-image',
                    `url(${item.urlToImage || defaultNewsBgImg})`
                );

                this.setElementTextContent(newsClone, '.news__meta-author', item.author || item.source.name);
                const dateSubstrLength = 10;
                const readableDate = item.publishedAt.slice(0, dateSubstrLength).split('-').reverse().join('-');
                this.setElementTextContent(newsClone, '.news__meta-date', readableDate);
                this.setElementTextContent(newsClone, '.news__description-title', item.title);
                this.setElementTextContent(newsClone, '.news__description-source', item.source.name);
                this.setElementTextContent(newsClone, '.news__description-content', item.description);

                this.setElementAttribute(newsClone, '.news__read-more a', 'href', item.url);

                fragment.append(newsClone);
            });
        }

        const newsSection: Nullable<HTMLElement> = document.querySelector('.news');

        if (newsSection) {
            newsSection.innerHTML = '';
            newsSection.appendChild(fragment);
        }
    }
}

export default News;
