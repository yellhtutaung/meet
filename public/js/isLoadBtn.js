
$("#openAIform").submit(function( event ) {
    event.preventDefault();
    if(navigator.onLine)
    {
        // $('#submit-btn').attr('disabled', '');
        // $('#submit-btn').html(`<!--<div class="spinner-grow spinner-grow-sm" role="status"></div>-->`);
        isLoadBtn(true);

        // let formData = new FormData($('#openAIform')[0]);
        let formData = $("#input_val").val();

        $.ajax({
            url: "/",
            type:'POST',
            data:{inputVal:formData},
            dataType:'json',
            success:function async (data)
            {
                // console.log(data);
                if(data.code == 200)
                {
                    // $('img-place').
                    $('.generate-url').attr("src",data.generateUrl);
                    $('.generate-url').addClass('d-none');
                    setTimeout(function (){
                        $('.generate-url').removeClass('d-none');
                    },2000);
                    isLoadBtn(false);
                    $("#input_val").val('')
                }else {
                    alert(data.message);
                    isLoadBtn(false);
                }
            }
        });
    }else {
        alert('!No Internet Connection ');
        isLoadBtn(false);
    }
});


const isLoadBtn = (is_load) =>
{
    if (is_load)
    {
        $('#submit-btn').attr('disabled', '');
        $('#submit-btn').html(`<div class="spinner-grow spinner-grow-sm" role="status"></div>`);
    }else {
        $('#submit-btn').removeAttr('disabled');
        $('#submit-btn').html(`GENERATE`);
    }
}