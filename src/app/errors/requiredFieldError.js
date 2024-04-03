class RequiredFieldError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequiredFieldError';
    }
}

module.exports = RequiredFieldError;
