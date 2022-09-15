export default function throttle(
    func: () => void,
    delay: number
): () => void {
    let inThrottle: boolean;

    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, delay);
        }
    };
}
