const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
    role: {type: DataTypes.ENUM('user', 'admin'), defaultValue: 'admin'},
    isActivated: {type: DataTypes.BOOLEAN, default: false},
    activationLink: {type: DataTypes.STRING},
    resetPasswordToken: {type: DataTypes.STRING, allowNull: true},
    resetPasswordExpires: {type: DataTypes.DATE, allowNull: true},
});

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    userId: {type: DataTypes.INTEGER, references: {model: User, key:'id'}, primaryKey:true},
    refreshToken: {type: DataTypes.STRING, required: true},
});

const Pool_m = sequelize.define('pool_m', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    typePool: {type: DataTypes.STRING, unique: true},
});

const Style_m = sequelize.define('style_m', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
});

const Personal_bests = sequelize.define('personal_bests', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    pool_m_type: {type: DataTypes.STRING},
    style_m_name: {type: DataTypes.STRING},
    style_m_name2: {type: DataTypes.STRING},
    result: {type: DataTypes.STRING},
});

const TypeOfMedals = sequelize.define('typeOfMedals', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    numer: {type: DataTypes.INTEGER, allowNull: true},
    medalType: {type: DataTypes.STRING, allowNull: false},
    medal_date: {type: DataTypes.STRING},
    place: {type: DataTypes.STRING},
    pool: {type: DataTypes.STRING},
    style: {type: DataTypes.STRING},
    result: {type: DataTypes.STRING},
    pts: {type: DataTypes.INTEGER},
});

const Years_results = sequelize.define('years_results', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    numer: {type: DataTypes.INTEGER, allowNull: true},
    date: {type: DataTypes.DATE},
    place: {type: DataTypes.STRING},
    pool_m_type: {type: DataTypes.STRING},
    style_m_name: {type: DataTypes.STRING},
    result: {type: DataTypes.STRING},
    pts: {type: DataTypes.INTEGER},
    medal: {type: DataTypes.STRING},
});


User.hasMany(Token)
Token.belongsTo(User);

User.hasMany(Personal_bests)
Personal_bests.belongsTo(User);

Personal_bests.hasMany(Pool_m)
Pool_m.belongsTo(Personal_bests);

Personal_bests.hasMany(Style_m)
Style_m.belongsTo(Personal_bests);

TypeOfMedals.hasMany(Pool_m)
Pool_m.belongsTo(TypeOfMedals);

TypeOfMedals.hasMany(Style_m)
Style_m.belongsTo(TypeOfMedals);

User.hasMany(Years_results)
Years_results.belongsTo(User);

Years_results.hasMany(Pool_m)
Pool_m.belongsTo(Years_results);

Years_results.hasMany(Style_m)
Style_m.belongsTo(Years_results);



module.exports = {
    User,
    Token,
    Pool_m,
    Style_m,
    Personal_bests,
    TypeOfMedals,
    Years_results,
};
