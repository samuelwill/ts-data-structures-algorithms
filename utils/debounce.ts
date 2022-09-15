export default function debounce(
    func: () => void,
    delay: number
): () => void {
    let timer: NodeJS.Timeout;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
