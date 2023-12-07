import db from '../models'

const readFunc = async () => {
    try {
        let levels = await db.Level.findAll({
            attributes: ['id', "name", "description"],
            raw: true,
            nest: true
        })
        if (levels) {
            return {
                EM: "Get levels data success..!",
                EC: 0,
                DT: levels
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Something wrongs with vocal service",
            EC: 1,
            DT: []
        }
    }
}

const createNewLevel = async (levels) => {
    try {
        let currentLevels = await db.Level.findAll({
            attributes: ['name', 'description'],
            raw: true
        })
        const persist = levels.filter(({ name: name1 }) => !currentLevels.some(({ name: name2 }) => name2 === name1));

        if (persist && persist.length === 0) {
            return {
                EM: "Level created error..!",
                EC: 2,
                DT: []
            }
        }
        await db.Level.bulkCreate(persist)
        return {
            EM: `Create ${persist.length} level oke!`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Not found crate level failed !",
            EC: 1,
            DT: []
        }
    }
}

const updateRole = async (data) => {
    try {
        let level = await db.Level.findOne({
            where: { id: data.id }
        })
        if (level) {
            // update
            await level.update({
                name: data.name,
                description: data.description,
            })
            return {
                EM: 'Update level oke..!',
                EC: 0,
                DT: ''
            }
        } else {
            // not found
            console.log(error)
            return {
                EM: 'Update level not found!',
                EC: 2,
                DT: ''
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with services',
            EC: 1,
            DT: []
        }
    }
}

const deleteRole = async (id) => {
    try {
        let level = await db.Level.findOne({
            where: { id: id }
        })
        if (level) {
            await level.destroy();
            return {
                EM: "Delete level successfully!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "Level not exits",
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error form role services',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    readFunc, createNewLevel, updateRole,
    deleteRole
}