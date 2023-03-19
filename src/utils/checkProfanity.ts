import Filter from "bad-words";

export function checkProfanity(text: string) {
    const filter = new Filter();
    return text === filter.clean(text);
}