const con = require('../../config/dbconfig')

const albumDao = {
    table: 'album',

    getInfo: (res, table, id)=> {
        con.execute(
            `SELECT al.album, al.title, al.released, al.album_cover,
                CASE
                    WHEN ar.alias IS NULL THEN ''
                    ELSE ar.alias
                    END ALIAS,
                CASE
                    WHEN ar.fName IS NULL THEN ''
                    ELSE ar.fName
                    END fName,
                CASE
                    WHEN ar.lName IS NULL THEN ''
                    ELSE ar.lName
                    END lName,
                CASE
                    WHEN b.band IS NULL THEN ''
                    ELSE b.band
                    END band,
            al.yr_released,
            al.album_cover,
            l.label_id,
            l.label_id
            FROM ${table} al
            LEFT OUTER JOIN artist ar USING (artist_id)
            LEFT OUTER JOIN band b USING (band_id)
            JOIN label l USING (label_id);`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length == 1) {
                } else {
                     res.jsons(rows)
                }
                } else {
                    console.log('DAO ERROR: ', error)
            }
        })
    },

    create: (req, res)=> {
        if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Oblect.values(req,body)

            con.execute(
                `INSERT INTO ${this.table}
                    SET ${fields.join(' = ?,')} = ?;`,
                values,
                (error, dbres)=> {
                    if (!error) {
                        res.send(`Last id: ${dbres.insertId}`)
                    } else {
                        console.log('DAO ERROR: ', error)
                        res.send('Error creating record')
                    }
                }
            )
        }
    },

    update: (req, res)=> {
        if (isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number"
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
                `UPDATE ${this.table}
                    SET ${fields.join(' = ?, ')} = ? WHERE ${this.table}_id =?;`,
                [...values, req.params.id], 
                (error, dbres)=> {
                    if (!error) {
                        res.send(`Changed ${dbres.changedRows} row(s)`)
                    } else {
                        console.log('DAO ERROR')
                        res.send('Error creating record')
                    }
                }
            )
        }
    },

    sort: (req, res, table)=> {
        
        con.execute(
            `SELECT * FROM ${table} ORDER BY lName, fName;`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO ERROR: ', error)
                }
            }
        )
    }
} 

module.exports = albumDao