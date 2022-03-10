export default function isSorted(arr: number[]): boolean {
    if (arr.length < 2) {
        return true;
    }
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}
