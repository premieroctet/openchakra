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
    super(message, 404)
  }
}

class ForbiddenError extends StatusError {
  constructor(message) {
    super(message, 403)
  }
}

class BadRequestError extends StatusError {
  constructor(message) {
    super(message, 400)
  }
}

module.exports={StatusError, NotFoundError, ForbiddenError, BadRequestError}
