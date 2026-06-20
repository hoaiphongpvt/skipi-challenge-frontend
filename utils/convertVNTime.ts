interface FirestoreTimestamp {
    _seconds: number;
    _nanoseconds: number;
}

function convertToVNTime(timestamp: FirestoreTimestamp | null | undefined): string {
    if (!timestamp || typeof timestamp._seconds !== 'number') {
        return "";
    }

    const date = new Date(timestamp._seconds * 1000);

    return date.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false
    });
}

export default convertToVNTime;