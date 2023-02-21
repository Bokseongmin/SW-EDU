var ctx;

$(document).ready(function () {
    ctx = $('#cv')[0].getContext('2d');
    $('#cv').attr('width', '860px');
    $('#cv').attr('height', '640px');

    $('#cv').bind('mousemove', function (e) {
        //console.log(e);
        console.log(e.pageX, e.pageY);
    });
});
