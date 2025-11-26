CREATE TABLE IF NOT EXISTS empleados (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(150) NOT NULL,
  telefono VARCHAR(30),
  
  fechaNacimiento DATE NOT NULL,
  fechaIngreso DATE NOT NULL,
  salarioBase DECIMAL(12,2) NOT NULL,

  genero CHAR(1) NOT NULL CHECK (genero IN ('F', 'M', 'f', 'm')),
  
  area VARCHAR(100) NOT NULL,   
  puesto VARCHAR(100) NOT NULL,

  empleado_activo BOOLEAN DEFAULT TRUE
);

select * from empleados e; 

INSERT INTO empleados 
(nombre, apellido, dni, email, telefono, fechaNacimiento, fechaIngreso, salarioBase, genero, area, puesto, empleado_activo)
VALUES
-- SISTEMAS (1,2,3)
('Lucía', 'Martínez', '40123456', 'lucia.martinez@sistema.com', '1133557799', '1990-04-12', '2020-03-01', 4800000, 'F', 'Sistemas', 'Desarrollador', TRUE),
('Mariano', 'Pérez', '38911223', 'mariano.perez@sistema.com', '1144556688', '1988-10-05', '2019-07-15', 5200000, 'M', 'Sistemas', 'Analista Funcional', TRUE),
('Sofía', 'Gómez', '41222333', 'sofia.gomez@sistema.com', '1122445599', '1994-02-18', '2022-01-10', 3500000, 'F', 'Sistemas', 'Desarrollador', TRUE),

-- MARKETING (4,5,6)
('Carla', 'Fernández', '39500112', 'carla.fernandez@marketing.com', '1133665500', '1992-07-25', '2021-05-12', 1900000, 'F', 'Marketing', 'Community Manager', TRUE),
('Diego', 'López', '38221456', 'diego.lopez@marketing.com', '1144776699', '1987-11-03', '2018-02-22', 2500000, 'M', 'Marketing', 'Diseñador Gráfico', TRUE),
('Valentina', 'Suárez', '42998877', 'valentina.suarez@marketing.com', '1166335588', '1996-09-14', '2023-06-15', 1700000, 'F', 'Marketing', 'Community Manager', TRUE),

-- FINANZAS (7,8,9)
('Fernando', 'Álvarez', '37788990', 'fernando.alvarez@finanzas.com', '1155667788', '1985-06-10', '2016-09-01', 5000000, 'M', 'Finanzas', 'Contador', TRUE),
('Jimena', 'Ríos', '40100999', 'jimena.rios@finanzas.com', '1177554422', '1990-03-11', '2020-10-20', 4300000, 'F', 'Finanzas', 'Analista Financiero', TRUE),
('Pablo', 'Navarro', '38999111', 'pablo.navarro@finanzas.com', '1155337799', '1989-12-02', '2017-04-18', 4600000, 'M', 'Finanzas', 'Contador', TRUE),

-- VENTAS (10,11,12)
('Julieta', 'Costa', '43322145', 'julieta.costa@ventas.com', '1188996622', '1995-05-19', '2022-11-03', 1700000, 'F', 'Ventas', 'Ejecutivo de Ventas', TRUE),
('Lucas', 'Ortiz', '40234567', 'lucas.ortiz@ventas.com', '1177445599', '1991-01-22', '2019-08-27', 2300000, 'M', 'Ventas', 'Supervisor Comercial', TRUE),
('Agustina', 'Peralta', '42111999', 'agustina.peralta@ventas.com', '1199223344', '1997-08-08', '2023-03-19', 1600000, 'F', 'Ventas', 'Ejecutivo de Ventas', TRUE),

-- ADMINISTRACIÓN (13,14,15)
('Federico', 'Méndez', '38445566', 'federico.mendez@admin.com', '1133112299', '1986-02-28', '2015-01-05', 2100000, 'M', 'Administración', 'Administrativo', TRUE),
('Carolina', 'Bianchi', '40998877', 'carolina.bianchi@admin.com', '1144558811', '1993-12-30', '2021-09-12', 1800000, 'F', 'Administración', 'Asistente Administrativo', TRUE),
('Ramiro', 'Silva', '37991919', 'ramiro.silva@admin.com', '1155226633', '1984-07-07', '2014-06-10', 2400000, 'M', 'Administración', 'Administrativo', TRUE);





CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    auth_user_id VARCHAR(255) NOT NULL,      -- id del usuario en Supabase Auth
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rol ENUM('admin', 'rrhh') NOT NULL       -- rol dentro del sistema
);

select * from usuarios;

INSERT INTO usuarios (auth_user_id, nombre, apellido, email, rol)
VALUES
  ('supabase_uid_001', 'Daniela', 'Ríos', 'daniela.rios@empresa.com', 'admin'),

  ('supabase_uid_002', 'Lucía', 'Martínez', 'lucia.martinez@empresa.com', 'rrhh'),
  ('supabase_uid_003', 'Mariano', 'Pérez', 'mariano.perez@empresa.com', 'rrhh'),
  ('supabase_uid_004', 'Carla', 'Gómez',  'carla.gomez@empresa.com', 'rrhh'),
  ('supabase_uid_005', 'Sofía', 'Fernández', 'sofia.fernandez@empresa.com', 'rrhh');
  
  -- 1 admin y 4 rrhh
