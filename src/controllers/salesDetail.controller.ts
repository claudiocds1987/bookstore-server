import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database";

export const createSaleDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.id_sale ||
    !req.body.id_book ||
    !req.body.quantity ||
    !req.body.price
  ) {
    res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
  }

  const { id_sale, id_book, quantity, price } = req.body;
  console.log(id_sale, id_book, quantity, price);
  let idSale = parseInt(id_sale);
  let idBook = parseInt(id_book);
  let cantidad = parseInt(quantity);
  let precio = price;

  try {
    const response: QueryResult = await pool.query(
      "INSERT INTO sales_detail (id_sale, id_book, quantity, price) VALUES ($1, $2, $3, $4)",
      [idSale, idBook, cantidad, precio]
    );
    return res.json({
      message: "El detalle de venta ah sido creado exitosamente!",
      body: {
        orders: {
          idSale,
          idBook,
          cantidad,
          precio,
        },
      },
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json(
        "Error, no se pudo insertar el detalle de venta en la base de datos"
      );
  }
};

export const getSaleDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.params.id_sale) {
    res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
  }

  console.log(req.params.id_sale);

  let idSale = parseInt(req.params.id_sale);

  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM sales_detail where id_sale = $1",
      [idSale]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};
