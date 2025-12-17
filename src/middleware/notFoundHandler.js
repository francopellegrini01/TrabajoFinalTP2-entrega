const notFoundHandler = (req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: `El endpoint ${req.method} ${req.url} no existe`,
  });
};

export default notFoundHandler;
