import makePartRequestItem from './partRequestItem'
import { NoRecordError, InvalidPropertyError } from '../../helpers/errors'
import { request } from 'express'

export default function makePartRequestItemDAL({ database }) {
    return Object.freeze({
        findById,
        deleteById,
        add,
        updateById
    })

    async function findById({ partRequestItemId }) {
        const db = await database
        try {
            const result = await db.PartRequestItem.findOne({
                where: {
                    id: partRequestItemId
                }
            })

            if (!result) {
                throw new NoRecordError("Record Not Found");
            }

            return recordToPartRequestItem({ ...result });
        } catch (err) {
            throw err
        }
    }

    async function deleteById({ id }) {
        const db = await database;
        try {
            const result = await db.PartRequestItem.destroy({
                where: {
                    id: id
                }
            })

            if (!result || result === 0) {
                throw new NoRecordError("No Records Found")
            }

            return result
        } catch (err) {
            throw err
        }
    }

    async function add(item) {
        const db = await database;
        try {
            return await db.PartRequestItem.create({ ...item })
        } catch (err) {
            throw err
        }
    }

    async function updateById({ id, qty }) {
        const db = await database;
        try {
            const result = await db.PartRequestItem.update({
                qty: qty
            },
                {
                    where: {
                        id: id
                    }
                })
            if (!result || result === 0) {
                throw new NoRecordError("No Records Found")
            }
            return result
        } catch (e) {
            throw e
        }
    }

    function recordToPartRequestItem(result) {
        return makePartRequestItem({ ...result })
    }

}