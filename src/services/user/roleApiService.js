import db from '../../models'

const getAllRole = async () => {
    try {
        let roles = await db.Role.findAll({
            order: [["id", "DESC"]],
        })
        if (roles) {
            return {
                EM: "get data success..!",
                EC: 0,
                DT: roles
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "something wrongs with role service",
            EC: 1,
            DT: []
        }
    }
}

const createNewRole = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persist = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1));

        if (persist && persist.length === 0) {
            return {
                EM: "Role created error..!",
                EC: 2,
                DT: []
            }
        }
        await db.Role.bulkCreate(persist)
        return {
            EM: `Create ${persist.length} role oke!`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Not found crate role failed !",
            EC: 1,
            DT: []
        }
    }
}

const updateRole = async (data) => {
    try {
        let role = await db.Role.findOne({
            where: { id: data.id }
        })
        if (role) {
            // update
            await role.update({
                url: data.url,
                description: data.description,
            })
            return {
                EM: 'Update role oke..!',
                EC: 0,
                DT: ''
            }
        } else {
            // not found
            console.log(error)
            return {
                EM: 'Update role not found!',
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
        let role = await db.Role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy();
            return {
                EM: "Delete role successfully!",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "Role not exits",
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

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: "Not Found any roles!",
                EC: 0,
                DT: []
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: { 
                model: db.Role, 
                attributes: ["id","url", "description"],
                through: { attributes: [] }
            },
        })

        return {
            EM: "Get roles by group successds!",
            EC: 0,
            DT: roles
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

const assignRoleToGroup = async (data) => {
    try {
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })
        await db.Group_Role.bulkCreate(data.groupRoles)
        return {
            EM: "Assgin to group successds!",
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error form Assgin to group services',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllRole,
    createNewRole,
    updateRole,
    deleteRole,
    getRoleByGroup,
    assignRoleToGroup
}