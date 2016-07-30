$(document).ready(function (){
    //For FeedBack Form
    $('#feedbackSubmit').on('click',function(e){
        e.preventDefault();
        console.log("Inside save button on-click");
        var d=new Date();
        var uid=d.valueOf();
        var payload = {
            name: $('#name').val(),
            email:	$('#email').val(),
            phone: $('#phone').val(),
            feedback:$('#feedback').val(),
            uid:uid,
        };
        console.log('Payload:',payload);

        $.ajax({
            url: '/feedback',
            type: 'POST',
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            success:function(){
                console.log("done");
            }

        })
            .done(function(data) {
                console.log("i am in done");

            })
            .fail(function() {
                console.log("Error occured in Ajax call");
            });

    }); //end of on-click.*/



    $('#afterFeedBackModal').on('click',function(e){
        window.location = '/';
    });

})