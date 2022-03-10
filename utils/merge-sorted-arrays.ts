export default function merge(
    left: number[],
    right: number[]
): number[] {
    let sorted: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length || rightIndex < right.length) {
        if (leftIndex >= left.length) {
            sorted = sorted.concat(right.slice(rightIndex));
            break;
        }
        if (rightIndex >= right.length) {
            sorted = sorted.concat(left.slice(leftIndex));
            break;
        }
        if (left[leftIndex] < right[rightIndex]) {
            sorted.push(left[leftIndex]);
            leftIndex++
        } else {
            sorted.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return sorted;
}
