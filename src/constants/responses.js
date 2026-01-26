module.exports = {
  successRes(status, message, data = []) {
    return { rescode: 1, status, message, data };
  },
  errorRes(status, message, data = []) {
    return { rescode: 0, status, message, data };
  },
};
