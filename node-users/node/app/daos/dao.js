const daoCommon = require ('./common/daoCommon')

const profileDao = {
    ...daoCommon, ...require('./api/profileDao')
}

const userLoginDao = {
    ...daoCommon, ...require('./api/user_loginDao')

}
module.exports = {
    profileDao,
    userLoginDao
}