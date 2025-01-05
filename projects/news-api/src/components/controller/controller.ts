import { Nullable, Callback } from '../../types/generics';
import { AppControllerInterface } from '../../types/interfaces';
import AppLoader from './appLoader';

class AppController extends AppLoader implements AppControllerInterface {
    getSources<T>(callback: Callback<T>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews<T>(e: MouseEvent, callback: Callback<T>) {
        let target: Nullable<HTMLElement> = e.target instanceof HTMLElement ? e.target : null;
        const newsContainer: Nullable<HTMLElement> = e.currentTarget instanceof HTMLElement ? e.currentTarget : null;

        if (target && newsContainer) {
            while (target !== newsContainer) {
                if (target && target.classList.contains('source__item')) {
                    const sourceId: Nullable<string> = target.getAttribute('data-source-id');
                    if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = target?.parentNode instanceof HTMLElement ? target.parentNode : null;
            }
        }
    }
}

export default AppController;
