const handlerFactory = (middleware) => {
  return (req, res, next) => {
      try {
        middleware(req, res, next)
      } catch (err) {
        next(err)
      }
  }
}

export default handlerFactory;