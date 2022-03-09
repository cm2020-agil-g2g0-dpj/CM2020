const { body, validationResult } = require('express-validator');
module.exports = function(app) {

    //display parts page
    app.get('/list_part', function(req, res) {
        if (req.session.loggedin) {
            // sql query
            let sqlquery = "SELECT * FROM parts";
            // execute sql query
            db.query(sqlquery, (err, result) => {
                if (err) {
                    return console.error(err.message);
                } else {
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
            let part_id = req.query.id;
            let sqlquery = "SELECT * FROM parts WHERE Part_ID=?";
            db.query(sqlquery, part_id, (err, result) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                } else {
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
                            let sqlquery_c = "INSERT INTO revision_history (Part_ID,Part_Notes_Rev,Approved_For_Release,Approved_By) VALUES (?,?,?,?)";
                            // execute sql query
                            let rev_history = [req.body.part_id, req.body.p_notes,1,req.body.part_owner];
                            db.query(sqlquery_c, rev_history, (err, result) => {
                                
                                if (err) {
                                    req.flash('error', err.message);
                                    res.redirect('/fail');
                                } else {
                                    req.flash('success', 'You have successfully updated the part!');
                                    res.redirect('/update_success');
                                }
                            });
                    }
                });
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
                } else {
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
            let sqlquery = "SELECT Part_ID, Part_Name FROM parts WHERE Part_ID IN (SELECT DISTINCT Part_ID FROM assemblies)";
            db.query(sqlquery, (err, result) => {
                if(err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                }
                else {
                    res.render('auth/BOM.html', {
                        title: "Bill of Materials",
                        name: req.session.name,
                        allProducts: result
                    });
                }
            });
        } else {

            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

        // BOM VIEW 
        app.post('/BOM_VIEW',
        body('product').not().isEmpty().trim().escape(), 
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
                    res.redirect('/BOM');
                }
                else if(req.body.product || req.body.product !='') {
                    var productID = req.body.product;
                    let sqlquery = "SELECT assemblies.Part_ID,parts.Part_Name FROM assemblies LEFT JOIN parts ON assemblies.Assembly_ID=parts.Part_ID WHERE assemblies.Part_ID=?";
                    db.query(sqlquery, productID, (err, result) => {
                        if(err) {
                            req.flash('error', err.message);
                            res.redirect('/fail');
                        }
                        else {
                            let sqlquery_b = "SELECT parts.Part_Name FROM parts WHERE parts.Part_ID=?";
                            db.query(sqlquery_b, productID, (err, result_b) => {
                                if(err) {
                                    req.flash('error', err.message);
                                    res.redirect('/fail');
                                }
                                res.render('auth/BOM_VIEW.html', {
                                    title: "BOM VIEW",
                                    name: req.session.name,
                                    assemblies: result,
                                    prodName: result_b[0]['Part_Name']
                                });
                            });
                        }
                    });
                } 
                else {
                    req.flash('error', 'Product missing');
                    res.redirect('/BOM');
                }
            } 
            else {
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
                        let sqlquery_b = "INSERT INTO parts (Part_Name,Part_Description,Part_Specification_Link,Part_Issues,Part_Notes,Part_Design_Status,Part_owner) VALUES (?,?,?,?,?,?,?)";
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
                    let sqlquery_b = "SELECT * FROM users WHERE user_id=?";
                    let uid = req.session.userid;
                    db.query(sqlquery_b, uid, (err_b, result_b) => {
                    res.render('auth/manage_users.html', {
                        title: "Manage Users",
                        name: req.session.name,
                        role: result_b[0]['role'],
                        allUsers: result
                    });
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

    // user roles
    app.get('/user_roles', function(req, res) {
        if (req.session.loggedin) {
            // sql query
            let sqlquery = "SELECT * FROM roles";
            // execute sql query
            db.query(sqlquery, (err, result) => {
                if(err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                }
                else {
                    res.render('auth/user_roles.html', {
                        title: "User Roles",
                        name: req.session.name,
                        userRoles: result
                    });
                }
            });
        } else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    // create product
    app.get('/create_product', function(req, res) {
        if (req.session.loggedin) {
            let sqlquery = "SELECT * FROM parts;"
            db.query(sqlquery, (err, result) => {
                if(err) {
                    req.flash('error', err.message);
                    res.redirect('/fail');
                }
                else {
                    res.render('auth/create_product.html', {
                        title: "Create Product",
                        name: req.session.name,
                        userid: req.session.userid,
                        allParts: result
                    });
                }
            });
        } else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    // create part step 2: add assemblies
    app.post('/add_assemblies',
    body('part').not().isEmpty().trim().escape(), 
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
                res.redirect('/create_product');
            }
            else if(req.body.part || req.body.part !='') {
                var partID = req.body.part;
                let sqlquery_a = "SELECT * FROM assemblies WHERE Part_ID=?";
                db.query(sqlquery_a, partID, (err, result) => {
                    if (err) {
                        req.flash('error', err)
                        res.redirect('fail')
                    } else if(result.length > 0) {
                        req.flash('error', 'The product already exists!')
                        res.redirect('/create_product')
                    }
                    else {
                        let sqlquery_b = "SELECT * FROM parts WHERE Part_ID NOT IN (?)";
                        db.query(sqlquery_b, partID, (err, result) => {
                            if(err) {
                                req.flash('error', err.message);
                                res.redirect('/fail');
                            }
                            else {
                                res.render('auth/add_assemblies.html', {
                                    title: "Add Assemblies",
                                    name: req.session.name,
                                    user_id: req.session.userid,
                                    part_id: req.body.part,
                                    assemblies: result
                                });
                            }
                        });
                    }
                });
            } 
            else {
                req.flash('error', 'Part name missing');
                res.redirect('/create_product');
            }
        } 
        else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });

    // create new product
    app.post("/create_new_product",
        function(req, res) {
            if (req.session.loggedin) {
                // server side validation
                const assemblies = req.body.chk_assemblies;
                if (typeof assemblies == 'undefined') {
                    req.flash('error', 'No assemblies selected');
                    res.redirect('/create_product');
                }
                // saving data in database
                else if(assemblies.length > 0) {
                    assemblies.forEach(function(assembly){
                        let sqlquery_b = "INSERT INTO assemblies (Assembly_ID,Part_ID,Revision_ID,Part_Quantity) VALUES (?,?,?,?)";
                        let new_asm = [assembly, req.body.part_id,1,1];
                        db.query(sqlquery_b, new_asm, (err, result) => {
                            if (err) {
                                req.flash('error', err.message);
                                res.redirect('/fail');
                            } 
                        });
                    });
                    req.flash('success', 'You have successfully added a new Product!');
                    res.redirect('/update_success');
                }
            }
            else {
                req.flash('error', 'Please login first!');
                res.redirect('/');
            }
        });

    //display error page
    app.get('/fail', function(req, res) {
        if (req.session.loggedin) {
            res.render('auth/fail.html', {
                title: "Failed",
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
                title: "Success",
                name: req.session.name,
            });
        } else {
            req.flash('error', 'Please login first!');
            res.redirect('/');
        }
    });
};