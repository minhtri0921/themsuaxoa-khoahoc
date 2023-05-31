const mysql2 = require('mysql2')
class CoursesController {

    async index(req, res) {
        var con = mysql2.createConnection({
            host: 'localhost',
            user: "root",
            password: "mt2109",
            database: 'courses'

        })
        var course = await new Promise((resolve, rejects) => {
            con.query('SELECT*FROM courses', function (err, result) {
                if (err) rejects(err);
                resolve(result)
            })

        })
        res.send(course)
    }

    async add(req, res) {
        console.log(req.body);
        let data = req.body
        var con = mysql2.createConnection({
            host: 'localhost',
            user: "root",
            password: "mt2109",
            database: 'courses'

        })
        var course = await new Promise((resolve, rejects) => {
            con.query(`INSERT INTO courses ( name , description) VALUES ('${data.name}','${data.description}') `, function (err, result) {
                if (err) rejects(err);
                resolve(result)
            })

        })
        res.send(course)
    }
    async update(req, res) {
        const courseId = req.query.id;
        let data = req.body;
        console.log("ID : " + courseId);
        console.log(data);

        var con = mysql2.createConnection({
            host: 'localhost',
            user: "root",
            password: "mt2109",
            database: 'courses'
        });

        var course = await new Promise((resolve, rejects) => {
            con.query(`UPDATE courses
                SET name = '${data.name}', description = '${data.description}'
                WHERE id= ${courseId}; `, function (err, result) {
                if (err) rejects(err);
                resolve(result);
            });
        });

        console.log(courseId);
        res.send(course);
    }
    async delete(req, res) {
        const courseId = req.query.id;
        console.log("ID : " + courseId);

        var con = mysql2.createConnection({
            host: 'localhost',
            user: "root",
            password: "mt2109",
            database: 'courses'
        });

        var course = await new Promise((resolve, rejects) => {
            con.query(`DELETE FROM courses WHERE id= '${courseId}';`, function (err, result) {
                if (err) rejects(err);
                resolve(result);
            });
        });

        console.log(courseId);
        res.send(course)
    }
}

module.exports = new CoursesController();