import {object ,string} from 'zod';

 export const createSessionSchema = object({
    body:object({
        email:string({
            required_error:'email is required '
        }),
        password:string({
            required_error:'password is required'
        })
    })
});