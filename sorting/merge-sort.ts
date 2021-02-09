
export default function mergeSort(nums: number[]): number[] {
    // base case
    if (nums.length === 1) {
        return nums;
    }
    // split array into right and left
    const currentIndex = Math.ceil(nums.length / 2);
    const left = nums.slice(0, currentIndex);
    const right = nums.slice(currentIndex);

    return merge(
        mergeSort(left),
        mergeSort(right)
    );
}

function merge(left: number[], right: number[]): number[] {
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