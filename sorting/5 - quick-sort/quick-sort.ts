import swap from '../../utils/swap';

export default function quickSort(nums: number[]): void {
    if (!nums || nums.length < 2) {
        return;
    }
    quickSortRecursive(nums, 0, nums.length - 1);
}

function quickSortRecursive(
    nums: number[],
    startIndex: number,
    endIndex: number
): void {
    if (startIndex >= endIndex) {
        return;
    }
    const pivotIndex = partition(nums, startIndex, endIndex);
    quickSortRecursive(nums, startIndex, pivotIndex - 1);
    quickSortRecursive(nums, pivotIndex + 1, endIndex);
}

function partition(
    nums: number[],
    startIndex: number,
    endIndex: number
): number {
    const pivot = nums[endIndex];
    let partitionIndex = startIndex;
    for (let i = startIndex; i < endIndex; ++i) {
        if (nums[i] <= pivot) {
            swap(nums, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(nums, partitionIndex, endIndex);
    return partitionIndex;
}

