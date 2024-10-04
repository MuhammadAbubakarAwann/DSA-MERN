export const sendResponse = (res, success, message, statusCode = 200, data = null, token) => {
  res.status(statusCode).json({ success, message, data: data ? data : [data], token, statusCode });
}