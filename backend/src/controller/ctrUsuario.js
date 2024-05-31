const pool = require('../conexion/conexion.js');


const getUser = async (req, res) => {
  const { user, password} = req.body;  
  try {
    const response = await pool.query('SELECT * FROM usuario WHERE usuario = $1 AND contrasenia = $2', [user,password]);
    res.status(200).json(response.rows);
  } catch (error) {
      console.error("Error en la consulta a la base de datos:", error);
      res.status(500).json({ error: "Error en la consulta a la base de datos" });
  }
};


const getPedido = async (req, res) => {
  const { user, password} = req.body;  
  try {
    const response = await pool.query(
      `SELECT 
      o.id_ordenes,
      i.nombre,
      precio,
      c.nombre || ' ' || c.apellidos AS nombre,
      c.telefono,
      c.direccion,
      TO_CHAR(o.fecha_creacion, 'YYYY-MM-DD') AS fecha
      FROM 
        ordenes o 
      INNER JOIN 
        items i ON i.id_items = o.id_item
      INNER JOIN 
        clientes c ON c.id_clientes = o.id_clientes
      WHERE o.estado = 1` 
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({ error: "Error en la consulta a la base de datos" });
  }
};



const setEstado = async (req, res) => {
  const { ordenId} = req.body;  
  try {
    const response = await pool.query(
      ` UPDATE ordenes
      SET estado = 2
      WHERE id_ordenes = $1`,[ordenId] 
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({ error: "Error en la consulta a la base de datos" });
  }
};


module.exports = {
  getUser,
  getPedido,
  setEstado
};
