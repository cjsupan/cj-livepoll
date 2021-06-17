$(document).ready(function(){
    var socket = io();
    var num = 5;

    let id = "";
    socket.emit('poll');
    
    socket.on('Poll_Id', function(data){
        id = data;
        let link = "localhost:1337/poll/" + id;
        document.getElementById('genlink').innerHTML = link;
        document.getElementById('option').innerHTML += "<input type='hidden' name='link_Id' id='link_Id' value='"+id+"'>";
    });

    document.getElementById('copy').addEventListener('click', function(copy){
        copy.preventDefault();
        let Url = document.getElementById('genlink').textContent;
        navigator.clipboard.writeText(Url);
    });

    document.getElementById('refresh').addEventListener('click', function(event){
        event.preventDefault();
        location.reload();
    });

    document.getElementById('add').addEventListener('click', function(){
        
        var body = "";
            body += "<input type='text' class='form-control  form-option' name='option"+num+"' placeholder='Option "+num+"'>";
        document.getElementById('option').innerHTML += body;
        num ++;
    });

    document.getElementById('form').addEventListener('keyup', function(){
        let question = document.getElementById('form-question').value;
        let options = document.querySelectorAll('input[class="form-control form-option"]');

        let PollOptions = [];
        for(var i = 0; i < options.length; i++){
            if(options[i].value != ''){
                PollOptions.push({option: options[i].value, vote: 0});
            }
        }
        socket.emit('Poll_details', {id: id, question: question, options: PollOptions});
    });

});