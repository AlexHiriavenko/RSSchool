type RequestOptions = Partial<{
    [key: string]: string;
}>;

type ApiRequest = {
    endpoint: string;
    options?: RequestOptions;
};

export { RequestOptions, ApiRequest };
