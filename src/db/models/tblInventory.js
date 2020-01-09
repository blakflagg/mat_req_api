import Sequelize from 'sequelize';

class Inventory extends Sequelize.Model {
  static init (sequelize, DataTypes){
    return super.init({
      rec_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'RecID'
      },
      item_desc: {
        type: DataTypes.STRING,
        field: 'ITEM_DESC'
      },
      part_no: {
        type: DataTypes.STRING(100),
        field: 'PART_NO'
      },
      unit: {
        type: DataTypes.STRING(2),
        field: 'UNIT'
      },
  
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'IsActive'
      },
      ns_item: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'NsItem'
      },
      hide_from_inventory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'Hide_From_Inventory'
      }
  
    }, {
        tableName: 'tblInventory',
        modelName: 'Inventory',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        sequelize
    })
  }
}
export default Inventory;
