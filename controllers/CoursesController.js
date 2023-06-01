const mysql2 = require('mysql2')
var configDB = {
    host: 'localhost',
    user: "root",
    password: "mt2109",
    database: 'courses'
};

class CoursesController {


    async index(req, res) {
        try {
            var con = mysql2.createConnection(configDB);// Tạo connection
            var course = await new Promise((resolve, rejects) => {
                con.query('SELECT * FROM courses', function (err, result) {
                    if (err) rejects(err);
                    resolve(result)
                })

            })
            res.status(200).send(course);

        } catch (err) {
            res.status(500).send(err);
        } finally {
            con.end();// Đóng connection
        }
    }

    async add(req, res) {

        try {
            let data = req.body
            var con = mysql2.createConnection(configDB)
            var course = await new Promise((resolve, rejects) => {
                con.query(`INSERT INTO courses ( name , description) VALUES ('${data.name}','${data.description}') `, function (err, result) {
                    if (err) rejects(err);
                    resolve(result)
                })

            })
            res.status(200).send(course)
        } catch (err) {
            res.status(500).send(err)
        } finally {
            con.end();
        }
    }
    async update(req, res) {
        try {
            const courseId = req.query.id;
            let data = req.body;

            var con = mysql2.createConnection(configDB);

            var course = await new Promise((resolve, rejects) => {
                con.query(`UPDATE courses
                SET name = '${data.name}', description = '${data.description}'
                WHERE id= ${courseId}; `, function (err, result) {
                    if (err) rejects(err);
                    resolve(result);
                });
            });

            res.status(200).send(course)
        } catch (err) {
            res.status(500).send(course)

        } finally {
            con.end()
        }
    }
    async delete(req, res) {
        try {
            const courseId = req.query.id;

            var con = mysql2.createConnection(configDB);

            var course = await new Promise((resolve, rejects) => {
                con.query(`DELETE FROM courses WHERE id= '${courseId}';`, function (err, result) {
                    if (err) rejects(err);
                    resolve(result);
                });
            });

            res.status(200).send(course)
        } catch (err) {
            res.status(500).send(course)
        } finally {
            con.end()
        }
    }
}
module.exports = new CoursesController();