import joi from "joi";


const cardsSchema = joi.object({
    title: joi.string().required(),
    cardNumber: joi.string().creditCard().required(),
    ownerName: joi.string().required(),
    securityCode: joi.string().length(3).required(),
    expirationDate: joi.string().required(),
    password: joi.string().required(),  
    isVirtual: joi.boolean().required(),
    cardType: joi.string().valid('credito', 'debito', 'credito_debito').required()
})

export default cardsSchema;