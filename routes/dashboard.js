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
                userid: req.session.userid
            });
        } else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    app.get('/update_part', function(req, res) {
        if (req.session.loggedin) {
            let part_id = req.query.id;
            let sqlquery = "SELECT * FROM parts WHERE Part_ID=?";
            db.query(sqlquery, part_id, (err, result) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                }
                else {
                    res.render('auth/update_part.html', {
                        title: "Update Part",
                        name: req.session.name,
                        partData: result
                    });
                }
            });
        } else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    app.post("/update_new_part",
    body('p_name').not().isEmpty().trim().escape(),
    body('p_spec_link').not().isEmpty().trim().escape(),
    body('p_description').not().isEmpty().trim().escape(),
    body('p_issues').not().isEmpty().trim().escape(),
    body('p_notes').not().isEmpty().trim().escape(),
    body('p_status').not().isEmpty().trim().escape(),
    function(req, res) {
        if (req.session.loggedin) {
            // express validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                var error_msg = '';
                errors.array().forEach(function(error) {
                    error_msg += error.msg;
                })
                req.flash('error', error_msg);
                res.redirect('/update_part');
            }
            // saving data in database
            else {
                let sqlquery_b = "UPDATE parts SET Part_Name=?,Part_Description=?,Part_Specification_Link=?,Part_Issues=?,Part_Notes=?,Part_Design_Status=? WHERE Part_ID=?";
                // execute sql query
                let new_part = [req.body.p_name, req.body.p_description, req.body.p_spec_link, req.body.p_issues, req.body.p_notes, req.body.p_status, req.body.part_id];
                db.query(sqlquery_b, new_part, (err, result) => {
                    if (err) {
                        req.flash('error', err.message);
                        res.redirect('/fail');
                    } else {
                        req.flash('success', 'You have successfully updated the part!');
                        res.redirect('/update_success');
                    }
                });
            }
        } else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    app.get('/view_part', function(req, res) {
        if (req.session.loggedin) {
            let part_id = req.query.id;
            let sqlquery = "SELECT * FROM parts WHERE Part_ID=?";
            db.query(sqlquery, part_id, (err, result) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                }
                else {
                    res.render('auth/view_part.html', {
                        title: "View Part",
                        name: req.session.name,
                        partData: result
                    });
                }
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
            if (req.session.loggedin) {
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
                            req.flash('error', 'The part already exists!. Enter distinct part name and spec link!')
                            res.redirect('/create_part')
                        } else {
                            let sqlquery_b = "INSERT INTO parts (Part_Name,Part_Description,Part_Specification_Link,Part_Issues,Part_Notes,Part_Design_Status,Part_Owner) VALUES (?,?,?,?,?,?,?)";
                            // execute sql query
                            let new_part = [req.body.p_name, req.body.p_description, req.body.p_spec_link, req.body.p_issues, req.body.p_notes, req.body.p_status, req.body.user_id];
                            db.query(sqlquery_b, new_part, (err, result) => {
                                if (err) {
                                    req.flash('error', err.message);
                                    res.redirect('/fail');
                                } else {
                                    req.flash('success', 'You have successfully added a new part!');
                                    res.redirect('/create_part');
                                }
                            });
                        }
                    });
                }
            }
            else {
                req.flash('error', 'Please login first!');
                res.redirect('/');
            }
        });

    // manage users
    app.get('/manage_users', function(req, res) {
        if (req.session.loggedin) {
            // sql query
            let sqlquery = "SELECT * FROM users JOIN roles ON users.role=roles.role_id";
            // execute sql query
            db.query(sqlquery, (err, result) => {
                if(err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                }
                else {
                    res.render('auth/manage_users.html', {
                        title: "Manage Users",
                        name: req.session.name,
                        allUsers: result
                    });
                }
            });
        } else {

            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    // view user details
    app.get('/view_user', function(req, res) {
        if (req.session.loggedin) {
            let user_id = req.query.id;
            let sqlquery = "SELECT * FROM users JOIN roles ON users.role=roles.role_id WHERE user_id=?";
            db.query(sqlquery, user_id, (err, result) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                }
                else {
                    res.render('auth/view_user.html', {
                        title: "View User",
                        name: req.session.name,
                        userData: result
                    });
                }
            });
        } else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    app.get('/update_user', function(req, res) {
        if (req.session.loggedin) {
            let user_id = req.query.id;
            let sqlquery = "SELECT * FROM users JOIN roles ON users.role=roles.role_id WHERE user_id=?";
            db.query(sqlquery, user_id, (err, result) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                }
                else {
                    res.render('auth/update_user.html', {
                        title: "Update User",
                        name: req.session.name,
                        userData: result
                    });
                }
            });
        } else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    //display error page
    app.get('/fail', function(req, res) {
        if (req.session.loggedin) {
            res.render('auth/fail.html', {
                title:"Failed",
                name: req.session.name,     
            });
 
        } else {
        req.flash('error', 'Please login first!');
        res.redirect('/');
        }
    });

    //display success page
    app.get('/update_success', function(req, res) {
        if (req.session.loggedin) {
            res.render('auth/success.html', {
                title:"Success",
                name: req.session.name,     
            });
        } else {
        req.flash('error', 'Please login first!');
        res.redirect('/');
        }
    });
}