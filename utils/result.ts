export interface Result<T> {
    isValid: boolean;
    value?: T;
    error?: string;
}

export class OkResult<T> implements Result<T> {
    public isValid = true;
    public value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export class ErrorResult<T> implements Result<T> {
    public isValid = false;
    public error: string;

    constructor(error: string) {
        this.error = error;
    }
}