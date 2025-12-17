const AppStatus = {
  welcome: (req, res) => {
    res.json({ message: "Bienvenida al backend de productos" });
  },

  healthCheck: (req, res) => {
    res.json({
      status: "OK",
      timestamp: new Date().toISOString()
    });
  },
};

export default AppStatus;
