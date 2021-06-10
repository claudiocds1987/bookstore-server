"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require('yup');
// npm i date-fns (to format dates)
// import { parse, isDate } from "date-fns";
// const today = new Date();
// function parseDateString(value, originalValue) {
//     const parsedDate = isDate(originalValue)
//       ? originalValue
//       : parse(originalValue, "yyyy-MM-dd", new Date());
//     return parsedDate;
// }
function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
function userLoginValidation(data) {
    const schema = yup.object().shape({
        username: yup
            .string('username debe ser un string')
            .min(5, 'username debe tener un minimo de 5 caracteres')
            .max(15, 'username debe tener un maximo de 15 caracteres')
            .required(),
        password: yup.string('password debe ser un string').min(5).max(15).required('el password esta vacio'),
    });
    schema.validateSync(data);
}
function userSignUpValidation(data) {
    const schema = yup.object().shape({
        pass: yup
            .string('la password debe ser un string')
            .min(5, 'la password es corta')
            .max(15, 'la password es muy larga')
            .required('la password esta vacia'),
        // registration_date: date().transform(parseDateString).max(today),
        registration_date: yup
            .string()
            .required('registration_date esta vacio'),
        email: yup
            .string()
            .matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9.]+$/)
            .required(),
        username: yup
            .string('username debe ser un string')
            .min(5, 'username debe tener un minimo de 5 caracteres')
            .max(15, 'username debe tener un maximo de 15 caracteres')
            .required(),
    });
    schema.validateSync(data);
}
module.exports = {
    validate,
    userLoginValidation,
    userSignUpValidation
};
