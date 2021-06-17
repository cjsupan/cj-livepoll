const express = require('express');
var bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "static"));
app.use('/css', express.static('static/css'));
app.use('/js', express.static('static/js'));
app.use('/svg', express.static('./assets/img'));
app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');

const server = app.listen(1337, function(){
    console.log("listening to port 1337");
});
const io = require('socket.io')(server);

app.use(router);

var OpenPolls = [];

function random(id){
    let number = Math.floor(1000 + Math.random()*999);
    if(number != id){
        return number;
    }

}

io.on('connection', function (socket) {

    socket.on('poll', function(){
        let Url_Id = random();
        if(OpenPolls.length > 0){
            for(var i = 0; i < OpenPolls.length; i++){
                if(Url_Id == OpenPolls[i].socketId){
                    Url_Id = random(OpenPolls[i].socketId);
                }
            }
            OpenPolls.push({id:Url_Id, socket_id:socket.id, vote: 0});
            socket.join(Url_Id);
            socket.emit('Poll_id', Url_Id);

        }else{

            OpenPolls.push({id:Url_Id, socket_id:socket.id, vote: 0});
            socket.join(Url_Id);
            socket.emit('Poll_Id', Url_Id);
        }
    });

    socket.on('Poll_details', function(data){
        
        for(let i = 0; i < OpenPolls.length; i++){

            if(OpenPolls[i].id == data.id){
                OpenPolls[i].question = data.question;
                OpenPolls[i].options = data.options
            }
        }
        socket.to(data.id).emit('answers', data);
    });

    socket.on('Join', function(data){
        let id = data;
        socket.join(id);
        for(let i = 0 ; i < OpenPolls.length; i++){
            if(OpenPolls[i].id == data && (OpenPolls[i].question || OpenPolls[i].PollOptions)){
                socket.emit('question', OpenPolls[i]);
            }
        }
    });

    socket.on('results', function(data){
        socket.join(data);
        for(let i = 0; i < OpenPolls.length; i++){
            if(OpenPolls[i].id == data){
                socket.emit('showResult', OpenPolls[i]);
            }
        }
    });

    socket.on('poll-vote', function(data){
        console.log(data.votedOption);
        for(let i = 0; i < OpenPolls.length; i++){
            if(OpenPolls[i].id == data.id){
                OpenPolls[i].vote += 1;

                for(let j in OpenPolls[i].options){
                    if(OpenPolls[i].options[j].option == data.votedOption){
                        OpenPolls[i].options[j].vote += 1;
                    }
                }
            }
        }
        socket.to(data.id).emit('updateVote');
    });
   
});
