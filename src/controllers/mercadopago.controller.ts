// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const bodyParser = require("body-parser");

import { Compramp } from "../compramp";

import { Request, Response } from "express";

mercadopago.configure({
  // el token es el de "produccion" que te da mercadopago, seria el token del vendedor el que recibe la plata.
  access_token:
    "APP_USR-6727410487429690-020719-843ab473f4a5a89f1c2d74b496b704cd-523979565",
});

export const checkout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // obtniendo total de productos a comprar
  const totalProducts = parseInt(req.body.totalProducts);
  //  Creo un objeto "productos", cada atributo va a guardar la info de los body title, price y quantity.
  const productos = {
    titulo: req.body.title,
    precio: req.body.price,
    cantidad: req.body.quantity,
  };

  let items: Compramp[] = []; // este array va a enviar a api mercadopago

  // Object.keys(req.body.title).length devuelve el lenght del req.body.title
  // es decir, si desde angular al input name=title le cargue 2 nombres de libros.
  // el Object.keys(req.body.title).length devuelve 2, pero si hay solo un titulo te devuelve
  // la cantidad de caracteres, ojo con eso.

  // devuelve la cant de body que hay en el request, siempre va a dar 4 porque en en formulario son 4 inputs (title, price, quantity, totalProducts)
  //const size = Object.keys(req.body).length;

  if (totalProducts === 1) {
    // si hay 1 solo producto
    items.push({
      title: req.body.title.toString(),
      unit_price: parseInt(req.body.price.toString()),
      quantity: parseInt(req.body.quantity.toString()),
    });
  } else {
    // si hay mas de 1 producto
    for (let i = 0; i < totalProducts; i++) {
      items.push({
        title: productos.titulo[i].toString(),
        unit_price: parseInt(productos.precio[i].toString()),
        quantity: parseInt(productos.cantidad[i].toString()),
      });
    }
  }

  try {
    // return res.status(200).json("recibido");

    // Crea un objeto de preferencia y cargo los productos
    let preference = {
      items,
      // dependiendo del estado de la compra, mercadopago va a hacer un redirect a estas urls.
      back_urls: {
        success: "https://bookstore-cds-frontend.herokuapp.com/purchase/successful-purchase",
        failure: "http://www.tu-sitio/failure",
        pending: "http://www.tu-sitio/pending",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response.body);
        // redirije a pagina de mercadopago para realizar la compra
        res.redirect(response.body.init_point);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

// ---------------------------------------------------------------------------------------------
// PRUEBA SI DESDE ANGULAR UTILIZO EL SERVICIO mercadopago.service.ts

export const prueba = async (
  req: Request,
  res: Response,
  next
): Promise<Response> => {
  if (!req.body) {
    res.status(400).send("FALTA CONTENIDO EN EL CUERPO");
    return;
  }
  // Website you wish to allow to connect probar poner '*' en lugar de http://localhost:3000/ckeckout
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // para error de CORS policy
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  // res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  //next(); // este sacalo te sale error de headers

  let compra = [
    {
      title: "",
      unit_price: 0,
      quantity: 0,
    },
  ];

  let items: Compramp[] = [];

  compra = req.body;
  //console.log('SIZE DE COMPRA: ' + Object.keys(req.body).length)

  for (let data of compra) {
    items.push({
      title: data.title,
      unit_price: parseInt(data.unit_price.toString()),
      quantity: parseInt(data.quantity.toString()),
    });
  }

  for (let p of items) {
    console.log(p);
  }

  try {
    //return res.status(200).json("recibido");
    let preference = {
      items,
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response.body);
        // redirije a pagina de mercadopago 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=523979565-11685645-d45d-4755-b818-ec91acb30ac3'
        res.redirect(response.body.init_point);
      })
      .catch(function (error) {
        console.log(error);
      });
    // // Crea un objeto de preferencia
    // let preference = {
    //   items: [
    //     {
    //       // obteniendo los valores del formulario enviados desde Angular
    //       title: 'Mi producto',
    //       unit_price: 100,
    //       quantity: 1
    //     },
    //   ],
    // };

    // mercadopago.preferences
    //   .create(preference)
    //   .then(function (response) {
    //     console.log(response.body);
    //     // redirije a pagina de mercadopago
    //     res.redirect(response.body.init_point);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};