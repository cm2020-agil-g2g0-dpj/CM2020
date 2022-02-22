const { body, validationResult } = require('express-validator');
module.exports = function(app) {

    //display parts page
    app.get('/list_part', function(req, res) {
        if (req.session.loggedin) {
            // sql query
            let sqlquery = "SELECT * FROM parts";
            // execute sql query
            db.query(sqlquery, (err, result) => {
                if(err) {
                    return console.error(err.message);
                }
                else {
                    res.render('auth/list_part.html', {
                        title: "List Part",
                        name: req.session.name,
                        allParts: result
                    });
                }
            });
        } else {

            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    app.get('/create_part', function(req, res) {
        if (req.session.loggedin) {
            res.render('auth/create_part.html', {
                title: "Create Part",
                name: req.session.name,
            });

        } else {

            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    app.get('/update_part', function(req, res) {
        if (req.session.loggedin) {
            res.render('auth/update_part.html', {
                title: "Update Part",
                name: req.session.name,
            });

        } else {

            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    app.get('/BOM', function(req, res) {
        if (req.session.loggedin) {
            res.render('auth/BOM.html', {
                title: "Update Part",
                name: req.session.name,
            });

        } else {

            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });


    app.post("/create_new_part",
        body('p_name').not().isEmpty().trim().escape(),
        body('p_spec_link').not().isEmpty().trim().escape(),
        body('p_description').not().isEmpty().trim().escape(),
        body('p_issues').not().isEmpty().trim().escape(),
        body('p_notes').not().isEmpty().trim().escape(),
        body('p_status').not().isEmpty().trim().escape(),
        function(req, res) {
            // express validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                var error_msg = '';
                errors.array().forEach(function(error) {
                    error_msg += error.msg;
                })
                req.flash('error', error_msg);
                res.redirect('/create_part');
            }
            // saving data in database
            else {
                let sqlquery_a = "SELECT * FROM parts WHERE part_name=? OR part_specification_link=?";
                let user = [req.body.p_name, req.body.p_spec_link]
                db.query(sqlquery_a, user, (err, result) => {
                    if (err) {
                        req.flash('error', err)
                        res.redirect('create_part')
                    } else if (result.length > 0) {
                        req.flash('error', 'The part already exists!')
                        res.redirect('/create_part')
                    } else {
                        let timestamp = Date.now();
                        let sqlquery_b = "INSERT INTO parts (part_name,part_specification_link,part_description,part_issues,part_notes,part_design_status) VALUES (?,?,?,?,?,?)";
                        // execute sql query
                        let new_part = [req.body.p_name, req.body.p_spec_link, req.body.p_description, req.body.p_issues, req.body.p_notes, req.body.p_status];
                        db.query(sqlquery_b, new_part, (err, result) => {
                            if (err) {
                                console.log(err);
                                req.flash('error', err.array())
                                res.redirect('/create_part')
                            } else {
                                req.flash('success', 'You have successfully added a new part!');
                                res.redirect('/create_part');
                            }
                        });
                    }
                });

            }
        });

}