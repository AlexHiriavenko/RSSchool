import { HttpStatus } from '../../types/enums';

class Errors {
    private errorMessages: { [errorCode: number]: string } = {
        [HttpStatus.Ok]: 'OK. The request was executed successfully.',
        [HttpStatus.BadRequest]:
            'Bad Request. The request was unacceptable, often due to a missing or misconfigured parameter.',
        [HttpStatus.Unauthorized]: "Unauthorized. Your API key was missing from the request, or wasn't correct.",
        [HttpStatus.TooManyRequests]:
            'Too Many Requests. You made too many requests within a window of time and have been rate limited. Back off for a while.',
        [HttpStatus.ServerError]: 'Server Error. Something went wrong on our side.',
    };

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            const errorCode = res.status;
            const errorMessage = this.errorMessages[errorCode] || `An error occurred (${errorCode})`;

            throw Error(errorMessage);
        }

        return res;
    }
}

export default Errors;
