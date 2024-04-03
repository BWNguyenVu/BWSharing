class NewsController {
    //[GET]/news
    index(req, res){
        res.render('about.hbs'); //render ra trang
    }
    show(req, res){
        res.send('NEWS DETAIL'); //send to website
    }
}

module.exports = new NewsController();