import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function fromNow(timestamp: number) {
    dayjs.extend(relativeTime);
    return dayjs(timestamp).fromNow();
}