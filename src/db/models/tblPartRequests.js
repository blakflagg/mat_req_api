import Sequelize from "sequelize";


class PartRequest extends Sequelize.Model {
    static init (sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    field: 'ID',
                    autoIncrement: true
                },
                requested_by: {
                    type: DataTypes.INTEGER,
                    field: 'Requested_By'
                },
                requested_for: {
                    type: DataTypes.INTEGER,
                    field: 'Requested_For'
                },
                request_date: {
                    type: DataTypes.STRING, //smallDateTime field on SQL
                    fields: 'Request_Date'
                },
                status: {
                    type: DataTypes.STRING,
                    field: 'Status'
                },
                note: {
                    type: DataTypes.STRING,
                    field: 'Note'
                },
                required_date: {
                    type: DataTypes.STRING, //smallDateTime fields on the SQL server not working. switched to STRING and it works
                    field: 'Required_Date'
                },
                request_type: {
                    type: DataTypes.INTEGER,
                    field: 'Request_type'
                }
            }, {
                tableName: 'tblPartRequests',
                modelName: 'PartRequest',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
                freezeTableName: true,
                sequelize
            })
    }
}
// module.exports = PartRequest;
export default PartRequest;