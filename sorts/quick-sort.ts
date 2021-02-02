
import swap from '../utils/swap';

export default function quickSort(
    nums: number[],
    startIndex: number,
    endIndex: number
): void {
    if (startIndex >= endIndex) {
        return;
    }
    const pivotIndex = partition(nums, startIndex, endIndex);
    quickSort(nums, startIndex, pivotIndex - 1);
    quickSort(nums, pivotIndex + 1, endIndex);
}

// rearrange elements in array around a pivot
// an "in-place" algorithm
// uses constant space complexity (just a temp variable)
function partition(
    nums: number[],
    startIndex,
    endIndex
): number {
    const pivot = nums[endIndex];
    let partitionIndex = startIndex;
    for (let i = startIndex; i < endIndex; ++i) {
        if (nums[i] <= pivot) {
            swap(nums, nums[i], nums[partitionIndex]);
            partitionIndex++;
        }
    }
    swap(nums, nums[partitionIndex], pivot);
    return partitionIndex;
}