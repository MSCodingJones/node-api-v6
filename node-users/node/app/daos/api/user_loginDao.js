const con = require('../../config/dbconfig')
const confirmPassword = require ('../../../utils/confirmPassword')

const userLoginDao = {

    table: 'user_login',

    create: (req, res, table)=> {
        if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body).

            confirmPassword(req.body.password, req.body.confirmPassword)

                    // con.execute(
                    //    `INSERT INTO ${table}
                    //        SET ${fields.join(' = ?, ')} = ?;`,
                    //    values,
                    //   (error, dbres)=> {
                    //        if (!error) {
                    //           res.send(`Last id: ${dbres.insertId}`)
                    //        } else {
                    //            console.log('DAO ERROR: ', error)
                    //           res.send('Error creating record')
                    //        }
                    //    }
                    // )
                }
            },

    sort: (res, table)=> {
        con.execute(
            `SELECT * FROM ${table} ORDER BY acctNo;`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO ERROR: ',
                    )          
                }
            }
        )
    } 
}

module.exports = userLoginDao