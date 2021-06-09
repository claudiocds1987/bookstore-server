
const yup = require('yup');

function validate(validation){
    return(req, res, next) => {
        try{
            validation(req.body);
            next();
        }catch(error){
            next(error);
        }
    };
}

function userLoginValidation(data){
    const schema = yup.object().shape({
        username: yup
            .string('username debe ser un string')
            .min(5,'username debe tener un minimo de 5 caracteres')
            .max(15,'username debe tener un maximo de 15 caracteres')
            .required(),
        password: yup.string('password debe ser un string').min(5).max(15).required('el password esta vacio'),
    });

    schema.validateSync(data);
}

module.exports = {
    validate,
    userLoginValidation,
};