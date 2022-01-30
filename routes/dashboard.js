const { body, validationResult } = require('express-validator');

module.exports = function (app) {

    //display home page
    app.get('/create_part', function(req, res, next) {
        if (req.session.loggedin) {
            res.render('auth/create_part.html', {
                title:"Create Part",
                name: req.session.name,     
            });
 
        } else {
 
        req.flash('error', 'Please login first!');
        res.redirect('/');
        }
    });
    
    app.post("/create_part", 
    body('p_name').not().isEmpty().trim().escape(),
    body('p_spec_data').not().isEmpty().trim().escape(),
    body('p_description').not().isEmpty().trim().escape(),
    body('p_issues').not().isEmpty().trim().escape(),
    body('p_notes').not().isEmpty().trim().escape(),
    function (req, res) {
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
        else
        {
            let sqlquery_a  = "SELECT * FROM parts WHERE part_name=? OR part_specification_link=?";
            let user = [req.body.p_name, req.body.p_spec_link]
            db.query(sqlquery_a, user, (err, result) => {
                if (err) {
                    req.flash('error', err)
                    res.redirect('create_part')
                } else if(result.length > 0) {
                    req.flash('error', 'The part already exists!')
                    res.redirect('/create_part')
                }
                else {
                    let sqlquery_b = "INSERT INTO parts (name,email,username,password) VALUES (?,?,?,?)";
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