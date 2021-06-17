$(document).ready(function(){
    var socket = io();
    
    let url_id = document.getElementById('link_id').value;

    socket.emit('poll', {id: url_id});
    socket.on('Poll_Id', function(data){
        
        let link = "localhost:1337/poll/" + url_id +"";
        document.getElementById('genlink').innerHTML = link;
        document.getElementById('hidden').innerHTML += "<input type='hidden' name='link_Id' id='link_Id' value='"+url_id+"'>";

    });

    document.getElementById('copy').addEventListener('click', function(copy){
        copy.preventDefault();
        let Url = document.getElementById('genlink').textContent;
        navigator.clipboard.writeText(Url);
    });

    document.getElementById('refresh').addEventListener('click', function(){
        event.preventDefault();
        location.reload();
    });

    var num = 1;

    for(let i = 1; i <= 4; i++){
        var body = "";
            body += "<input type='text' class='form-option' name='option"+num+"' placeholder='Option "+num+"'>";
            document.getElementById('option').innerHTML += body;
            num++;
    }
    $('#add').on('click', function(){
        
        var body = "";
            body = "<input type='text' class='form-option' name='option"+num+"' placeholder='Option "+num+"'>";
        document.getElementById('option').innerHTML += body;
        num ++;
    });

    document.getElementById('form').addEventListener('keyup', function(){
        let question = document.getElementById('form-question').value;
        let options = document.querySelectorAll('input[class="form-option"]');
        
        let PollOptions = [];
        for(var i = 0; i < options.length; i++){
            if(options[i].value != ''){
                PollOptions.push({option: options[i].value, vote: 0});
            }
        }
        socket.emit('Poll_details', {id: url_id, question: question, options: PollOptions});
    });

});