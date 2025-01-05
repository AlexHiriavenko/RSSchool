import Loader from './loader';

class AppLoader extends Loader {
    readonly apiUrl: string;
    readonly apiKey: string;

    constructor() {
        const apiUrl = process.env.API_URL || '';
        const apiKey = process.env.API_KEY || '';

        super(apiUrl, {
            apiKey: apiKey,
        });

        this.apiUrl = apiUrl;
        this.apiKey = apiKey;

        if (!apiUrl || !apiUrl.includes('http')) {
            throw new Error('Base URL is not provided or invalid, check ".env" file');
        }
        if (!apiKey || apiKey.length < 32) {
            throw new Error('API_KEY is not provided or invalid, check ".env" file');
        }
    }
}

export default AppLoader;
