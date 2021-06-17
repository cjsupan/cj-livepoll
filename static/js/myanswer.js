$(document).ready(function(){
    var socket = io();
    
    let id = document.getElementById('url_id').value;

    socket.emit('Join', id);

    socket.on('question', function(data){
        let question = data.question.charAt(0).toUpperCase() + data.question.slice(1);
        
        document.getElementById('poll-question').innerHTML += ""+question+"";

        let options = "";
        for(let i=0; i<data.options.length; i++){
            let option = data.options[i].option;
            options += '<div class="option">';
            options += '<input type="radio" class="options" name="option'+[i]+'" value='+option+'>';
            options += '<label for="option" class="lead">'+option+'</label><br>';
            options += '</div>';
           
        }
        
        options += '<input type="hidden" action="hidden" name="id" value='+id+'>';
        options += '<input type="submit" id="vote" value="Vote">';
        document.getElementById('poll-form').innerHTML = options;
    });

    document.getElementById('poll-form').addEventListener('submit', function(){
        let checked = document.querySelector('input[type=radio]:checked');
        if(checked){
            socket.emit('poll-vote', { id: id, votedOption: checked.value });
        }
    });
    
    
});