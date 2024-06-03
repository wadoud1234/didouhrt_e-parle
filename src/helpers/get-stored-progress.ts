export default function getStoredProgress(courseId: string): number {
    const storedProgress = localStorage.getItem(`courseProgress_${courseId}`);
    if (!storedProgress) return 0;
    return parseInt(storedProgress) ?? 0;
}