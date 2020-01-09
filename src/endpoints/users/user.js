import requiredParam from '../../helpers/required-param'
import { InvalidPropertyError } from '../../helpers/errors'
import isValidEmail from '../../helpers/is-valid-email.js'

export default function makeUser(userInfo = requiredParam('userInfo')){
    const validUser = validate(userInfo);
        console.log(validUser);
    return Object.freeze(validUser);


    function validate ({
        id,
        email_address,
        hashPWD
    } = {}){
        validateEmail(email_address)
        return { id, email_address,hashPWD};
    }

    function validateEmail(emailAddress){
        if(!isValidEmail(emailAddress)){
            throw new InvalidPropertyError('Invalid contact email address.');
        }
    }
}