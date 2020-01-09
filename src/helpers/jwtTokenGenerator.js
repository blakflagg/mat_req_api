import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwtConfig';

export default function generateJWT(id, expiresInDays) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + (expiresInDays ? expiresInDays : 1));

    return jwt.sign({
        id: id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, jwtConfig.secret);
}
