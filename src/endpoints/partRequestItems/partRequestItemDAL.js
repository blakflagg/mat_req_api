import makePartRequestItem from './partRequestItem'
import { NoRecordError, InvalidPropertyError } from '../../helpers/errors'

export default function makePartRequestItemDAL({database}){
    return Object.freeze({
        findById,
        deleteById,
        add,
        updateById
    })

    async function findById({partRequestItemId}){
        const db = await database
        try{
            const result = await db.PartRequestItem.findOne({
                where: {
                    id: partRequestItemId
                }
            })

            if(!result){
                throw new NoRecordError("Record Not Found");
            }

            return recordToPartRequestItem({...result});
        }catch(err){
            throw err
        }
    }

    async function deleteById({userId, partRequestItemId}){

        const db = await database;
        try {
            const result = await db.PartRequestItem.destroy({
                where: {
                    id: partRequestItemId
                }
            })

            if (!result || result === 0) {
                throw new NoRecordError("No Records Found")
            }

            return result
        } catch (err) {
            console.log('inside DAL catch', err)
            throw err
        }
    }

    async function add(){

    }

    async function updateById({id}){

    }

    function recordToPartRequestItem(result){
        return makePartRequestItem({...result})
    }

}