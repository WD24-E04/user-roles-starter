import createError from "http-errors";

export const routeNotFound = () => {
  throw createError(404, "Page was not found");
};

export const globalErrorHandler = (err, req, res) => {
  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message,
    stack: err.stack,
  });
};
