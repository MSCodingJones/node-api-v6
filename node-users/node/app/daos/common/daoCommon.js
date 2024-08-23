const con = require('../../config/dbconfig')

const daoCommon = {

    findAll: (res, table)=> {
        con.execute (
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length == 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                    } else{
                        console.log('DAO ERROR: ', error)
                }
            }
        )
    },

    findById: (res, table, id)=> {
        con.execute(
                `SELECT * FROM ${table} WHERE ${table}_id = ?;`,
                [id],
                (error, rows)=> {
                    if (!error) {
                        if (rows.length == 1) {
                            res.json(...rows)
                        } else {
                            res.json(rows)
                        }
                    } else{
                        console.log('DAO ERROR: ', error)
                    }
                }
            )
        },
        
    countAll: (res, table)=> {
        con.execute(
            `SELECT COUNT(*) count FROM ${table};`,
            (error, rows)=> {
                if (!error) {
                    res.json(...rows)
                } else{
                    console.log('DAO ERROR: ', error)
                }
            }
        )
    },
    
    update: (req, res, table)=> {
        if (isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "id must be a numnber"
            })
        } else if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `UPDATE ${table}
                SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id = ?;`,
                [...values, req.params.id],
                (error, res)=> {
                    if (!error) {
                        res.send(`Changed ${dbres.changedRows} row(s)`)
                } else {
                    console.log('DAO ERROR: ', error)
                    res.send('Error creating record')
                    }
                }
            )
        }
    }
}

module.exports = daoCommon