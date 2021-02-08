import swap from '../utils/swap';

export default function selectionSort(nums: number[]): number[] {
    for (let i = 0; i < nums.length; ++i) {
        let smallest = i;
        for (let j = i; j < nums.length; ++j) {
            if (nums[j] < nums[smallest]) {
                smallest = j;
            }
        }
        swap(nums, smallest, i);
    }
    return nums;
}