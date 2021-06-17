class users{
    index(req, res){
        res.render('index');
    }
    poll(req, res){
        let id = Math.floor(1000 + Math.random()*999);
        res.render('poll', {id: id});
    }
    students(req, res){
        let id = req.params.id;
        res.render('students', {id: id});
    }
    result(req, res){
       
        res.render('result', {results: req.body});
    }
    sendResult(req, res){
        res.render('showresult', {id: req.body.id});
    }
}
let a = new users();
module.exports = a;