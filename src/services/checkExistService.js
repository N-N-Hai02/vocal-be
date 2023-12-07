import db from '../models/index'

const checkExistEnglish = async (vocalEnglish) => {
    let en = await db.Vocal.findOne({
        where: { en: vocalEnglish }
    })
    if (en) return true
    return false
}

module.exports = {
    checkExistEnglish
}