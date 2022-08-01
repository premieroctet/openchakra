const HTTP_CODES={
  BAD_REQUEST: 400,
  NOT_LOGGED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SYSTEM_ERROR: 500,
}

class StatusError extends Error {

  constructor(message, status) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name=this.constructor.name
    this.status=status
  }
}

class NotFoundError extends StatusError {
  constructor(message) {
    super(message, HTTP_CODES.NOT_FOUND)
  }
}

class NotLoggedError extends StatusError {
  constructor(message) {
    super(message, HTTP_CODES.NOT_LOGGED)
  }
}

class ForbiddenError extends StatusError {
  constructor(message) {
    super(message, HTTP_CODES.FORBIDDEN)
  }
}

class BadRequestError extends StatusError {
  constructor(message) {
    super(message, HTTP_CODES.BAD_REQUEST)
  }
}

class SystemError extends StatusError {
  constructor(message) {
    super(message, HTTP_CODES.SYSTEM_ERROR)
  }
}

module.exports={StatusError, NotFoundError, ForbiddenError, BadRequestError,
  NotLoggedError, SystemError,
  HTTP_CODES}
