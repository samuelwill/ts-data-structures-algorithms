import swap from '../utils/swap';

export default function bubbleSort(nums: number[]): number[] {
    // the loop limit is length minus 1 because our comparison
    // is always the current element to the next element
    for (let i = 0; i < nums.length - 1; ++i) {
        for (let j = 0; j < nums.length - i - 1; ++j) {
            if (nums[j] > nums[j + 1]) {
                swap(nums, j, j + 1);
            }
        }
    }
    return nums;
}
