$(document).ready(function(){
    var socket = io();

    let id = document.getElementById('link_id').value;
    
    socket.emit('results', id);
    socket.on('showResult', function(data){

        let question = data.question.charAt(0).toUpperCase() + data.question.slice(1);
        document.getElementById('results-question').innerHTML = "<h1>Submitted</h1>";
    });

    socket.on('updatedVote', function(){
        socket.emit('results', id);
    });
});