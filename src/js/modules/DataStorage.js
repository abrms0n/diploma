export class DataStorage {
    constructor(storage) {
        this.storage = storage;
    }
    parse = () => {
        return JSON.parse(this.storage.news);
    }
    clear = () => {
        return this.storage.clear();
    }
}