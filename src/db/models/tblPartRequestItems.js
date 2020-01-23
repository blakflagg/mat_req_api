import Sequelize from 'sequelize';

class PartRequestItem extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                field: 'RequestItemID',
                primaryKey: true,
                autoIncrement: true
            },
            part_request_link: {
                type: DataTypes.INTEGER,
                field: 'Part_Request_Link'
            },
            rec_id: {
                type: DataTypes.INTEGER,
                field: 'Inventory_Link'
            },
            item_desc: {
                type: DataTypes.STRING,
                field: 'Item_Desc'
            },
            qty: {
                type: DataTypes.DOUBLE,
                field: 'QTY'
            },
            filled: {
                type: DataTypes.DOUBLE,
                field: 'Filled'
            },
            item_type: {
                type: DataTypes.INTEGER,
                field: 'Item_Type'
            },
            status: {
                type: DataTypes.STRING,
                field: 'Status'
            }
        }, {
            tableName: 'tblPartRequestItems',
            modelName: 'PartRequestItem',
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
            sequelize
        })
    }
}
export default PartRequestItem;