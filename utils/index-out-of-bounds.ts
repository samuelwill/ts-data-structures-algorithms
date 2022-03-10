export default function IndexOutOfBounds<T>(
    arr: T[],
    index: number
): boolean {
    const maxIndex = arr.length - 1;
    return index > maxIndex
        || index < 0;
}
