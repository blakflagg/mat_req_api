import makeInventoryItem from './inventoryItem';
import { NoRecordError, InvalidPropertyError } from '../../helpers/errors';

export default function makeInventoryItemsDAL({ database }) {
    return Object.freeze({
        findAll
    })

    async function findAll() {
        const db = await database;
        const WHERE = {
            IsActive: true,
            Hide_From_Inventory: false,
            NsItem: false
        }

        try {
            const results = await db.InventoryItems.findAll({
                attributes: ['rec_id', 'part_no', 'item_desc'],
                where: {
                    ...WHERE
                },
                order: [
                    ['part_no']
                ],
                limit: 3000
            })
            if (!results) throw new NoRecordError;

            return results.map(element => {
                return documentToItem(element.dataValues)
            })

        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    function documentToItem({ ...dataValues }) {
        return makeInventoryItem({ ...dataValues })
    }
}