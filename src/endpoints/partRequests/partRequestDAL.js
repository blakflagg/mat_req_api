import makePartRequest from './partRequest'
import { NoRecordError, InvalidPropertyError } from '../../helpers/errors'

export default function makePartRequestDAL({ database }) {
    return Object.freeze({
        findById,
        findByUserId,
        add,
        deletePartRequest,
        updatePartRequest
    })

    async function findById({ id }) {

    }

    async function findByUserId({ userId }) {
        const db = await database;
        try {
            const results = await db.PartRequest.findAll({
                include: [
                    {
                        model: db.PartRequestItem,
                        as: 'RequestItems',
                        required: false,
                        include: [
                            {
                                model: db.InventoryItems,
                                as: 'InventoryInfo',
                                required: false,
                                attributes: ['part_no']
                            }
                        ]
                    }
                ],
                where: {
                    requested_for: userId
                },
                order: [
                    ['id', 'DESC']
                ]
            })
            if (!results) {
                throw new NoRecordError("No Records Found")
            }

            return results.map(partRequest => {
                return documentToPartRequest(partRequest.dataValues)
            });
        } catch (err) {

            throw err;
        }
    }

    async function add({ userId, partRequestItems, ...partRequest }) {
        const db = await database;
        try {
            const response = await db.sequelize.transaction(async () => {
                const newPartRequest = await db.PartRequest.create({
                    requested_by: userId,
                    requested_for: userId,
                    ...partRequest
                })

                const runBlock = partRequestItems.map(async item => {
                    const partRequestItem = {
                        part_request_link: newPartRequest.id,
                        rec_id: item.rec_id,
                        item_desc: item.item_desc,
                        qty: item.qty,
                        status: 'New',
                        item_type: 3
                    }
                    return new Promise(async (resolve, reject) => {
                        try {
                            const updated = await updateRequestItem(db, partRequestItem)
                            resolve(updated);
                        } catch (err) {
                            reject(err);
                        }
                    })
                })
                await Promise.all(runBlock)
                return newPartRequest
            })
            return documentToPartRequest(response.dataValues);
        } catch (err) {
            throw err;
        }
    }

    async function updateRequestItem(db, partRequestItem) {
        try {
            return await db.PartRequestItem.create({ ...partRequestItem })
        } catch (err) {
            throw err
        }
    }

    async function updatePartRequest({ userId, partRequestId, updatedRequest }) {
        const db = await database;
        try {
            const results = await db.PartRequest.update(
                updatedRequest,
                {
                    where: {
                        id: partRequestId,
                        requested_by: userId
                    }
                }
            )
            if (!results) {
                throw new NoRecordError("No Records Found")
            }

            return results;

        } catch (err) {
            throw err
        }
    }

    async function deletePartRequest({ userId, partRequestId }) {
        const db = await database;
        try {
            const result = await db.PartRequest.destroy({
                where: {
                    id: partRequestId,
                    requested_by: userId
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

    function documentToPartRequest({ ...dataValues }) {
        return makePartRequest({ ...dataValues })
    }


}