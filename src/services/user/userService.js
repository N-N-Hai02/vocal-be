import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPass) => {
    const hashpassword = bcrypt.hashSync(userPass, salt);
    return hashpassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password)
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    } catch (error) {
        console.log(">>> check error createNewUser: ", error);
    }
}

const getUserList = async () => {
    // test relationships
        // let newUser = await db.User.findOne({
        //     where: { id: 1 },
        //     attributes: ['id', "username", "email"],
        //     include: { model: db.Group, attributes: ["name", "description"] },
        //     raw: true,
        //     nest: true
        // })

        // let roles = await db.Role.findAll({
        //     // attributes: ["url", "description"],
        //     include: { 
        //         model: db.Group, 
        //         where: { id: 1 }, 
        //         // attributes: ["name"]
        //     },
        //     raw: true,
        //     nest: true
        // })

        // console.log(">>>>>> check new user: ", newUser);
        // console.log(">>>>>> check new roles: ", roles);

    let users = []
    users = await db.User.findAll()
    return users
    // const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt', Promise: bluebird})
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user')
    //     return rows
    // } catch (error) {
    //     console.log(">>> check error getUserList: ", error);
    // }
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })

    // const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt', Promise: bluebird})
    // try {
    //     await connection.execute('DELETE FROM user WHERE id = ?', [id])
    // } catch (error) {
    //     console.log(">>> check error deleteUser: ", error);
    // }
}
const getUserById = async (userId) => {
    let user = {}
    user = await db.User.findOne({ where: { id: userId } })
    return user
    // const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt', Promise: bluebird})
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [id])
    //     return rows
    // } catch (error) {
    //     console.log(">>> check error deleteUser: ", error)
    // }
}

const updateUserInfo = async (email, username, id) => {
    await db.User.update(
        { email: email, username: username }, 
        {
            where: {id: id},
        }
    );
    // const connection = await mysql.createConnection({host: 'localhost',user: 'root',database: 'jwt', Promise: bluebird})
    // try {
    //     await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id])
    // } catch (error) {
    //     console.log(">>> check error updateUser: ", error)
    // }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}