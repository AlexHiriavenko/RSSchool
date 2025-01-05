import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse, NewsSourseResponse, AppInterface } from '../../types/interfaces';
import { Nullable } from '../../types/generics';

class App implements AppInterface {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement: Nullable<HTMLElement> = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: MouseEvent) => {
                this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data));
            });
        }
        this.controller.getSources((data: NewsSourseResponse) => this.view.drawSources(data));
        this.view.setBurger();
    }
}

export default App;
