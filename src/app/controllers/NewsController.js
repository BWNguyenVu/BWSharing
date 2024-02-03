class NewsController {
    //[GET]/news
    index(req, res){
        res.render('news.hbs'); //render ra trang
    }
    show(req, res){
        res.send('NEWS DETAIL'); //send to website
    }
}

module.exports = new NewsController();