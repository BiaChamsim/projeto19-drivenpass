import joi from "joi";


const credentialSchema = joi.object({
    title: joi.string().max(50).required(),
    description:joi.string().max(1000).required()  
})

export default credentialSchema;
