class japaneseConfig {
    constructor() {
        // Define your objects here
        this.object1 = {
            key1: 'value1',
            key2: 'value2'
        };
        this.object2 = {
            key3: 'value3',
            key4: 'value4'
        };
    }

    // Additional methods can be added if needed
    // For example:
    getObject1() {
        return this.object1;
    }

    getObject2() {
        return this.object2;
    }
}

// Export the class instance
module.exports = new ExportedObjects();