const con = require('../../config/dbconfig')

const labelDao = {
    table: 'label',

    getInfo: (res, table, id)=> {
        con.execute(
            `SELECT al.album, al.title, al.album_cover,
            CASE
                WHEN ar.fName IS NULL THEN ''
                ELSE ar.fName
                END fName,
            CASE
                WHEN ar.lName IS NULL THEN ''
                ELSE ar.lName
                END lName,
            CASE
                WHEN ar.alias IS NULL THEN ''
                ELSE ar.alias
                END alias,
            CASE
                WHEN b.band IS NULL THEN ''
                ELSE b.band
                END band,
            b.band_id,
            l.label,
            l.label_id
            FROM album al
            LEFT OUTER JOIN artist ar USING (artist_id)
            LEFT OUTER JOIN band b USING (band_id)
            JOIN label l USING (label_id)
            WHERE ${table}_id = ${id};`,
            (error, rows)=> {
                if (!error) {
                    res.json(rows)
                } else {
                    console.log('DAO ERROR: ', error)
                }
            }
        )
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

    update: (req, res, table)=> {
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
                `UPDATE ${table}
                    SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id =?;`,
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
            `SELECT * FROM ${table} ORDER BY label;`,
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

module.exports = labelDao