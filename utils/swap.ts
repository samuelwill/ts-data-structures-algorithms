import { Messages } from "./messages";
import { ErrorResult, OkResult, Result } from "./result";

export default function swap<T>(
    arr: T[],
    index1: number,
    index2: number
): Result<T[]> {
    
    if (indexOutOfRange(arr, index1) || indexOutOfRange(arr, index2)) {
        return new ErrorResult(Messages.IndexOutOfBounds);
    }

    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;

    return new OkResult(arr);
}

function indexOutOfRange<T>(
    arr: T[],
    index: number
): boolean {
    const maxIndex = arr.length - 1;
    return index > maxIndex
        || index < 0;
}