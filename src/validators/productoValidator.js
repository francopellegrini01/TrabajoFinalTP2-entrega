export const validateProducto = (data) => {
  const errors = [];

  // Validar "producto"
  if (
    !data.producto ||
    typeof data.producto !== "string" ||
    data.producto.trim().length === 0
  ) {
    errors.push("El campo 'producto' es obligatorio y no puede estar vacío.");
  }

  // Validar "stockAmount"
  if (
    typeof data.stockAmount !== "number" ||
    !Number.isInteger(data.stockAmount) ||
    data.stockAmount < 0
  ) {
    errors.push("El campo 'stockAmount' debe ser un entero >= 0.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateProductoUpdate = (data) => {
  const errors = [];

  // Validar "producto" si viene
  if (
    data.producto !== undefined &&
    (typeof data.producto !== "string" || data.producto.trim().length === 0)
  ) {
    errors.push("El campo 'producto' debe ser un string no vacío.");
  }

  // Validar "stockAmount" si viene
  if (
    data.stockAmount !== undefined &&
    (typeof data.stockAmount !== "number" ||
      !Number.isInteger(data.stockAmount) ||
      data.stockAmount < 0)
  ) {
    errors.push("El campo 'stockAmount' debe ser un entero >= 0.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
