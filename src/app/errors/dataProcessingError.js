class DataProcessingError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DataProcessingError';
    }
}

module.exports = DataProcessingError;
