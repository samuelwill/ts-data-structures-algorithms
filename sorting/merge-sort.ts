
export default function mergeSort(arr: number[]): void {
    if (arr.length < 2) {
        return;
    }
    mergeSortRecursive(arr, 0, arr.length - 1);
}

function mergeSortRecursive(
    arr: number[],
    startIndex: number,
    endIndex: number
): void {
    if (startIndex >= endIndex) {
        return;
    }
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    mergeSortRecursive(arr, startIndex, middleIndex);
    mergeSortRecursive(arr, middleIndex + 1, endIndex);

    merge(arr, startIndex, middleIndex, endIndex);
}

function merge(
    arr: number[],
    startIndex: number,
    midIndex: number,
    endIndex: number
): void {
    const leftArrayLength = midIndex - startIndex + 1;
    const rightArrayLength = endIndex - midIndex;

    const leftArrayCopy: number[] = [];
    const rightArrayCopy: number[] = [];

    // Make copy of left array
    for (let i = 0; i < leftArrayLength; ++i) {
        leftArrayCopy[i] = arr[startIndex + i];
    }
    // Make copy of right array
    for (let j = 0; j < rightArrayLength; ++j) {
        rightArrayCopy[j] = arr[midIndex + 1 + j];
    }

    let leftArrayIndex = 0;
    let rightArrayIndex = 0;
    let combinedArrayIndex = startIndex;

    // Iterate through the copies of the left and right arrays,
    // filling up the original array with the next smallest
    // value on each iteration.
    while (
        leftArrayIndex < leftArrayLength
        && rightArrayIndex < rightArrayLength
    ) {
        if (leftArrayCopy[leftArrayIndex] <= rightArrayCopy[rightArrayIndex]) {
            arr[combinedArrayIndex] = leftArrayCopy[leftArrayIndex];
            leftArrayIndex++;
        } else {
            arr[combinedArrayIndex] = rightArrayCopy[rightArrayIndex];
            rightArrayIndex++;
        }
        combinedArrayIndex++;
    }
    // In the case where either the left or right array has
    // remaining elements, copy them into the originl array
    while (leftArrayIndex < leftArrayLength) {
        arr[combinedArrayIndex] = leftArrayCopy[leftArrayIndex];
        leftArrayIndex++;
        combinedArrayIndex++;
    }
    while (rightArrayIndex < rightArrayLength) {
        arr[combinedArrayIndex] = rightArrayCopy[rightArrayIndex];
        rightArrayIndex++;
        combinedArrayIndex++
    }
}

