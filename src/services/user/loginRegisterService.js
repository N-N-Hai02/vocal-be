require('dotenv').config()
import db from '../../models'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import { getGroupWithRoles } from './JWTService'
import { createJWT } from '../../middleware/JWTAction'

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPass) => {
    const hashpassword = bcrypt.hashSync(userPass, salt);
    return hashpassword
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true
    }

    return false
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (user) {
        return true
    }

    return false
}

const registerNewUser = async (rawUserData) => {
    try {
        // check: email/phonenunber are exist
        let isEmailExits = await checkEmailExist(rawUserData.email)
        if (isEmailExits === true) {
            return {
                EM: 'The email is already exiteds!',
                EC: 1,
                DT: 'isValidEmail',
            }
        }
        let isPhoneExits = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExits === true) {
            return {
                EM: 'The phone is already exiteds!',
                EC: 1,
                DT: 'isValidPhone',
            }
        }
        // hash user password
        let hashPassword = hashUserPassword(rawUserData.password)

        if (rawUserData && rawUserData.groupId) {
            console.log("groupId: ", rawUserData.groupId)
            return {
                EM: 'Is not register failed..!', // The groupId is not allowed to be filled in..
                EC: 2,
                DT: '',
            }
        }

        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPassword,
            groupId: 1
        })

        return {
            EM: 'A user is created successfully!',
            EC: '0',
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'SomeThing wrongs in service...!',
            EC: 1,
            DT: '',
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin }, 
                    { phone: rawData.valueLogin }
                ]
              }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword === true) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username
                }
                let token = createJWT(payload)
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }
        return {
            EM: "Your email/phone number or password is incorrect!",
            EC: 1,
            DT: ""
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs in service...',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist
}