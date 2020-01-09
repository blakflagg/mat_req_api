
export default function makePartRequest({...dataValues}){

    return Object.freeze({
        ...dataValues,
        date: Date.now()
    })
}