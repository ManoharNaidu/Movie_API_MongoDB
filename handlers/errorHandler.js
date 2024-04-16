const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  } else {
    next();
  }
};

module.exports = errorHandler;
