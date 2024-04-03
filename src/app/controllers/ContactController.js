class ContactController {
    //[GET]/news
    index(req, res){
        res.render('contact.hbs'); //render ra trang
    }
}

module.exports = new ContactController();