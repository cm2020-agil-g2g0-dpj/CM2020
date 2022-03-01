const { body, validationResult } = require('express-validator');

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index.html");
    });

    app.get("/register", function (req, res) {
        res.render("register.html");
    });

    app.post("/auth",
    body('username').not().isEmpty().trim().escape(),
    body('password').not().isEmpty().trim().escape(),  
    function (req, res) {
        // express validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var error_msg = '';
            errors.array().forEach(function(error) {
            error_msg += error.msg;
            })                
            req.flash('error', error_msg);   
            res.redirect('/');
        }
        else
        {
            let sqlquery = "SELECT * FROM users WHERE username=? AND password=?";
            // execute sql query
            let auth_user = [req.body.username, req.body.password];
            db.query(sqlquery, auth_user, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.redirect('/');
            } else if(result.length <= 0) {
                req.flash('error', 'Please enter the correct Username and Password!');
                res.redirect('/');
            }
            else {
                req.session.loggedin = true;
                req.session.name = result[0]['name'];
                req.session.userid = result[0]['user_id'];
                res.redirect('dashboard');
            }
            });
        }
   });

   //display home page
    app.get('/dashboard', function(req, res) {
        if (req.session.loggedin) {
            res.render('auth/dashboard.html', {
                title:"Dashboard",
                name: req.session.name,     
            });
 
        } else {
 
        req.flash('error', 'Please login first!');
        res.redirect('/');
        }
    });

    // Logout user
    app.get('/logout', function (req, res) {
        if (req.session.loggedin) {
            req.session.destroy();
        }
        res.redirect('success');
     });
   
     app.get("/success", function (req, res) {
        res.render("success.html");
    });

    app.post("/new_user", 
    body('name').not().isEmpty().trim().escape(),
    body('email').normalizeEmail().isEmail(), 
    body('username').not().isEmpty().trim().escape(),
    body('password').not().isEmpty().trim().escape(),
    function (req, res) {
        // express validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var error_msg = '';
            errors.array().forEach(function(error) {
            error_msg += error.msg;
            })
            req.flash('error', error_msg);   
            res.redirect('/register');
        }
        // saving data in database
        else
        {
            let sqlquery_a  = "SELECT * FROM users WHERE username=? OR email=?";
            let user = [req.body.username, req.body.email]
            db.query(sqlquery_a, user, (err, result) => {
                if (err) {
                    req.flash('error', err)
                    res.redirect('register')
                } else if(result.length > 0) {
                    req.flash('error', 'The user already exists!')
                    res.redirect('/register')
                }
                else {
                    let sqlquery_b = "INSERT INTO users (name,email,username,password) VALUES (?,?,?,?)";
                    // execute sql query
                    let new_user = [req.body.name,req.body.email,req.body.username,req.body.password];
                    db.query(sqlquery_b, new_user, (err, result) => {
                    if (err) {
                        req.flash('error', err)
                        res.redirect('/register')
                    } else {
                        req.flash('success', 'You have successfully signed up!');
                        res.redirect('/register');
                    }
                 });
                }
            });
           
        }
    });

}