import dbConn from './dbConn';
import Sequelize from 'sequelize';
import TeamMember from './models/tblTeamMembers';
import PartRequest from './models/tblPartRequests';
import Inventory from './models/tblInventory';
import PartRequestItem from './models/tblPartRequestItems';
const sequelize = new Sequelize(dbConn.dbname, dbConn.username, dbConn.password, dbConn.params);

export default async function makeDb() {

    const db = {
        User: TeamMember.init(sequelize, Sequelize),
        PartRequest: PartRequest.init(sequelize, Sequelize),
        PartRequestItem: PartRequestItem.init(sequelize, Sequelize),
        InventoryItems: Inventory.init(sequelize, Sequelize),
        sequelize: sequelize

    };


    //Associations
    db.PartRequest.hasMany(PartRequestItem, { foreignKey: 'part_request_link', sourceKey: 'id', constraints: false, as: 'RequestItems' });
    db.PartRequestItem.belongsTo(PartRequest, { foreignKey: 'part_request_link', targetKey: 'id', constraints: false });
    db.PartRequestItem.hasMany(Inventory, { foreignKey: 'rec_id', sourceKey: 'rec_id', constraints: false, as: 'InventoryInfo' });
    // db.InventoryItems.belongsTo(PartRequestItem, { foreignKey: 'rec_id', sourceKey: 'id', constraints: false });

    try {
        await sequelize.sync()
        console.log('connected to database');
        return db;
    } catch (err) {
        console.log(err);
    }

}