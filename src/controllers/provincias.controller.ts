import { Request, Response } from "express";
import { QueryResult } from "pg";
// pool es la conexion a db tmb se puede llamar db en vez de pool
// en consola poner npm run dev (para iniciar el servidor?)
import { pool } from "../database";

export const createProvincia = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    // check empty name
    if (!req.body.name) {
      return res.status(400).send({
        message: "FALTA CONTENIDO EN EL CUERPO PARA PODER AGREGAR LA PROVINCIA",
      });
    }
    // guardo en const name lo que llega en el request
    const { name } = req.body;
  
    if (name.length > 50)
      return res.status(400).send({
        message: "NO PUEDE TENER UN NOMBRE DE PROVINCIA CON MAS DE 50 CARACTERES",
      });
    // insert en PostgreSQL
    const response: QueryResult = await pool.query(
      "INSERT INTO provincias (name) VALUES ($1)",
      [name]
    );
    return res.json({
      message: "La provincia ah sido creada exitosamente!",
      body: {
        provincia: {
          name,
        },
      },
    });
  };


  export const getProvincias = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query("SELECT * from provincias");
      return res.status(200).json(response.rows);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Internal server error");
    }
  };