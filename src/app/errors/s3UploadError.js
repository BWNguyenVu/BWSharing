class S3UploadError extends Error {
    constructor(message) {
        super(message);
        this.name = 'S3UploadError';
    }
}

module.exports = S3UploadError;
