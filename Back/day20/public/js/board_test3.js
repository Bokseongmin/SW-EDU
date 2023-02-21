var ctx;

$(document).ready(function () {
    ctx = $('#cv')[0].getContext('2d');
    $('#cv').attr('width', '860px');
    $('#cv').attr('height', '640px');
    
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    var drawing = false;
    
    $('#cv').bind('mousedown', function(e) {
        drawing = true;
        ctx.moveTo(e.pageX, e.pageY);
    });

    $('#cv').bind('mousemove', function (e) {
        //console.log(e);
        //console.log(e.pageX, e.pageY);
        console.log(drawing);
        if(drawing) {
            ctx.lineTo(e.pageX, e.pageY);
            ctx.stroke();
        }
    });
    
    $(document).bind('mouseup', function(e) {
        drawing = false;
    });
});