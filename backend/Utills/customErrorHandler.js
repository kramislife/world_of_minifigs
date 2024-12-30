class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    //Create Stack Propertu
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
