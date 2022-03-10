import IndexOutOfBounds from './index-out-of-bounds';
import { Messages } from "./messages";
import { ErrorResult, OkResult, Result } from "./result";

export default function swap<T>(
    arr: T[],
    index1: number,
    index2: number
): Result<T[]> {

    if (IndexOutOfBounds(arr, index1) || IndexOutOfBounds(arr, index2)) {
        return new ErrorResult(Messages.IndexOutOfBounds);
    }

    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;

    return new OkResult(arr);
}
