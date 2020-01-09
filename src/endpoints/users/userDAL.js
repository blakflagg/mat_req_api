import makeUser from './user';
import { NoRecordError, InvalidPropertyError } from '../../helpers/errors';
import isValidEmail from '../../helpers/is-valid-email.js'

export default function makeUserDAL({ database }) {
    return Object.freeze({
        findByEmail,
        authByEmail,
        resetPassword
    })

    async function findByEmail(email) {
        const db = await database;
        try {
            const results = await db.User.findOne({
                where: {
                    email_address: email
                }
            })
            return documentToUser({ id: results.id, email_address: results.email_address });
        } catch (err) {
            return err;
        }
    }

    async function authByEmail(email) {
        //returns the database
        if (!isValidEmail(email)) {
            throw new InvalidPropertyError('Invalid contact email address.')
        }
        const db = await database;
        try {
            const results = await db.User.findOne({
                where: {
                    email_address: email
                }
            })

            if (!results) {
                throw new NoRecordError("No Record Found");
            }
            return results;

        } catch (err) {
            throw err;
        }
    }

    async function resetPassword({ email, newPassword }) {
        const db = await database
        try {
            const user = await db.User.findOne({
                where: {
                    email_address: email
                }
            })

            if (!user) {
                throw new NoRecordError("No Record Found")
            }

            await user.setPassword(newPassword)
            await user.save()
            return true;
        } catch (err) {
            console.log(err)
            throw err
        }

    }

    function documentToUser({ ...user }) {
        return makeUser({ ...user })
    }
}