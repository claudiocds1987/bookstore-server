import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database'

export const createOrder = async (req: Request, res: Response): Promise<Response> => {

  if(!req.body.id_user || !req.body.adress || !req.body.phone_number || !req.body.total_price || !req.body.provincia || !req.body.localidad || !req.body.order_date){
    res.status(400).send('FALTA CONTENIDO EN EL CUERPO');
  }

  const { id_user, adress, phone_number, total_price, provincia, localidad, order_date } = (req.body);
  console.log(id_user, adress, phone_number, total_price, provincia, localidad, order_date)
  // el id_order en la db es autonumerico no hace falta
  let idUser = parseInt(id_user);
  let totalPrice = total_price;

  const response: QueryResult = await pool.query('INSERT INTO orders (id_user, adress, phone_number, total_price, provincia, localidad, order_date) VALUES ($1, $2, $3, $4, $5, $6, $7)', [idUser, adress, phone_number, totalPrice, provincia, localidad, order_date]);
  return res.json({
    message: 'La orden ah sido creado exitosamente!',
    body: {
      orders: {
        adress
      }
    }
  })
}

export const getLastIdOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query('select max(id_order) as "lastIdOrder" from orders');
    return res.status(200).json(response.rows[0]);
  }
  catch (e) {
    console.log(e);
    return res.status(500).json('Internal server error');
  }
}

export const getOrdersByUserId = async (req: Request, res: Response): Promise<Response> => {
  if(!req.params.id_user){
    res.status(400).send('FALTA CONTENIDO EN EL CUERPO');
  }
  
  try {
    const id = parseInt(req.params.id_user);
    const response: QueryResult = await pool.query('SELECT * FROM orders WHERE orders.id_user = $1 order by order_date desc', [id]);
    return res.status(200).json(response.rows);
  }
  catch (e) {
    console.log(e);
    return res.status(500).json('Internal server error');
  }
}


