
export default function makeInventoryItem({...dataValues}){
    //TODO add description clean up here e.g. escape chars or other weird data issues

    return Object.freeze({
        ...dataValues
    }) 
}