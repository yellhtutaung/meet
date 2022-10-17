
const socket = io.connect('http://192.168.1.3:5500');
// const socket = io.connect('http://127.0.0.1:5500');

    $(".link-done").click(function () {

        let link_val = $(".add-src").val();
        let copy_type = link_val.slice(24,29);

        if (copy_type == "watch" ){
        // console.log(filter_link);
            let filter_link = link_val.slice(32);
            if( $("input[type='checkbox']").is(":checked")){
                socket.emit('SendingLink', {Send_Link_val:filter_link,AutoPlay:1});
            }else {
                socket.emit('SendingLink', {Send_Link_val:filter_link,AutoPlay:0});
            }

        }else if( copy_type == "embed" ){
            // console.log(filter_link);
            let filter_link = link_val.slice(30);
            if( $("input[type='checkbox']").is(":checked")){
                socket.emit('SendingLink', {Send_Link_val:filter_link,AutoPlay:1});
            }else {
                socket.emit('SendingLink', {Send_Link_val:filter_link,AutoPlay:0});
            }

        }else{
            console.log('Videos link is wrong');
        }


    });

    socket.on('SendingLink', function(data){

        let general_link = 'https://www.youtube.com/embed/';

        $("#modalLoginForm").removeClass("show");
        $("#modalLoginForm").css("display", "none");
        $("#modalLoginForm").removeAttr("aria-modal");
        $("#modalLoginForm").attr("aria-hidden", "true");
        $("body").removeClass("modal-open");
        $(".modal-backdrop").removeClass("modal-backdrop");
        $(".add-src").val('');

        if ( data.AutoPlay == 1 ){
            $(".YouTubeLink").attr("src",general_link+data.Send_Link_val+'?autoplay=1');
        }else{
            $(".YouTubeLink").attr("src", general_link+data.Send_Link_val);
        }

    });