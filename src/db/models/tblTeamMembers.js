import crypto from 'crypto';
import Sequelize from 'sequelize';

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          field: 'Team_Member_ID'
        },
        name: {
          type: DataTypes.STRING,
          field: 'Team_Display_Name'
        },
        login_name: {
          type: DataTypes.STRING,
          field: 'Login_Name'
        },
        password: {
          type: DataTypes.STRING,
          field: 'Password'
        },
        email_address: {
          type: DataTypes.STRING,
          field: 'Email_Address'
        },
        web_app_user: {
          type: DataTypes.BOOLEAN,
          field: 'Web_App_User',
          allowNull: false
        },
        salt: {
          type: DataTypes.STRING(1000),
          field: 'salt'
        },
        hashPWD: {
          type: DataTypes.STRING(4000),
          field: 'hashPWD'
        }
      }, {
      tableName: 'tblTeamMembers',
      modelName: 'TeamMember',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      sequelize
    }

    );
  }
  setPassword(password) {
    return new Promise((resolve, reject) => {
      try {
        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
        this.setDataValue('salt', salt);
        this.setDataValue('hashPWD', hash);
        return resolve(true)
      } catch (err) {
        console.log(err);
        return reject();
      }
    });
  }

  validatePassword(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hashPWD === hash;
  }
}
// module.exports = User;
export default User;