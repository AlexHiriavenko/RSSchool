import { RequestOptions, ApiRequest } from '../../types/type-aliases';
import { Callback } from '../../types/generics';
import { DataLoader } from '../../types/interfaces';
import Errors from '../ErrorHandler/ErrorHandler';

class Loader implements DataLoader {
    baseLink: string;
    options: RequestOptions;
    errors: Errors;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
        this.errors = new Errors();
    }

    getResp<T>(
        { endpoint, options = {} }: ApiRequest,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler = (res: Response): Response => this.errors.errorHandler(res);

    makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        console.log(url);
        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: Callback<T>, options: RequestOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
