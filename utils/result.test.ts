import { ErrorResult, OkResult } from './result';

describe('Result type', () => {
    it('Should allow for a valid result', () => {
        const result = new OkResult(10);

        expect(result.isValid).toBe(true);
        expect(result.value).toBe(10);
    });

    it('Should allow for an error result', () => {
        const errorMessage = 'Error!';
        const result = new ErrorResult(errorMessage);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe(errorMessage);
    });
});
