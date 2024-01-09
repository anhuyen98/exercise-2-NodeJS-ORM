import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('exercise2', 'root', '1234', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'
})

export default sequelize;

try {
    await sequelize.authenticate();
    console.log("Connect is successful!")
} catch (error) {
    console.log("Connect is failed")
}