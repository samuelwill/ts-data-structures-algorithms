import swap from '../../utils/swap';

export default function insertionSort(nums: number[]): void {
    const length = nums.length;
    // we start with index 1 because our compare logic compares
    // the current element with the previous one
    for (let i = 1; i < length; ++i) {
        // we start with the largest element in our "sorted" bucket
        // for as long as the current element is less than the
        // previous element, we swap them, shifting the element
        // down until it is in the correct order in the sorted bucket
        //
        // we decrement j here because we are moving left through
        // the sorted bucket (from largest to smallest)
        //
        // the for loop break condition here is:
        // j must be greater than 0 because we are comparing
        // j to the element before it
        // if j is greater than the element before it, then it
        // is in the right order and we are done
        for (let j = i; j > 0 && nums[j] < nums[j - 1]; --j) {
            swap(nums, j, j - 1);
        }
        // one of the downsides here (compared to selection sort)
        // is that we are swapping on each iteration as we move
        // the current element down to its correct place
    }
}
