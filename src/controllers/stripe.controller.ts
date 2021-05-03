import { Request, Response } from 'express'
// stripe api para pagos online
const stripe = require('stripe')('sk_test_51HtFjbBJjkabJhWP1I8nUDPLKDfNtK3nSRxSqIfqR8LZUzIxPYdSvNMUKpuIE75lCm8C7jGYNUsGSqX2b8RfWTFo00xPoPW6j2'); 

export const stripeCheckout = async (req: Request, res: Response) => {
   
    const stripeToken = req.body.stripeToken;
    const cantidad = req.body.cantidad; // es la cantidad de plata
    const cantidadInEur = Math.round(cantidad * 100);
    // creo objeto para almacenar la respuesta que devuelve stripe al hacer la carga del pago
    const chargeObject = await stripe.charges.create({
        amount: cantidadInEur,
        currency: 'eur', // formato de moneda en euros
        // con este stripeToken, stripe sabe a que tarjeta hay que cargarle el pago
        source: stripeToken,
        capture: false,
        description: 'Probando stripe',
        // envia el recibo al email
        receipt_email: 'cla8787@gmail.com'
    });

    try{
        // hago la transaccion
        await stripe.charges.capture(chargeObject.id);
        res.json(chargeObject); // devuelvo la respuesta de transacción exitosa
    } catch(error){
        await stripe.refunds.create({ charge: chargeObject.id });
        res.json(chargeObject); // devuelvo la respuesta error de transacción
    }

  }