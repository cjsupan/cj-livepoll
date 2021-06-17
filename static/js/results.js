$(document).ready(function(){
    var socket = io();
    let id = document.getElementById('link_id').value;

    socket.emit('results', id);
    socket.on('showResult', function(data){
        let question = data.question.charAt(0).toUpperCase() + data.question.slice(1);
        document.getElementById('results-question').innerHTML = ""+question+"";

        let options = "";
        for(let i=0; i < data.options.length; i++){
            options += "<p id='results-option' class='lead'>"+data.options[i].option+"</p>";
            options += "<p id='results-vote' class='lead'>"+data.options[i].vote+"</p>";
          
        }
        document.getElementById('options').innerHTML = options;
    });
    socket.on('updateVote', function(){
        socket.emit('results', id);
    });

    $('#create').hover(function(){
        $(this).css('cursor', 'pointer');
    });
    document.getElementById('create').addEventListener('click', function(){
        // window.location.href = '/';
    });

});