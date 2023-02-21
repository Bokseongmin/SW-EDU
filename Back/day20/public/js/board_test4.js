var ctx;

//라인 색상 굵기 설정
var shape = {
    color : 'white',
    width : 1,
    setShape : function(color, width) {
        if(color != null) {
            this.color = color;
        }
        if(width != null) {
            this.width = width;
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
    }
}

// 그리기 부분에 대한 설정
var draw = {
    drawing : false,
    start : function(e) {
        ctx.beginPath();
        ctx.moveTo(e.pageX, e.pageY);
        this.drawing = true;
        console.log("mousedown >>> ", this.drawing);
    },
    move : function (e) {
        console.log("mousemove >>> ", this.drawing);
        if(this.drawing === true) {
            ctx.lineTo(e.pageX, e.pageY);
            ctx.stroke();
        }
    },
    end : function(e) {
        this.drawing = false;
        console.log('mouseup >>>> ', this.drawing);
        $('#cv').bind('mousemove', null);
    }
}

$(document).ready(function () {
    ctx = $('#cv')[0].getContext('2d');
    
    // Canvas 사이즈 변경
    $('#cv').attr('width', '860px');
    $('#cv').attr('height', '640px');
    
    draw.drawing = false;
    $('#cv').bind('mousedown', draw.start);
    $('#cv').bind('mousemove', draw.move);
    $('#cv').bind('mouseup', draw.end);
    
    
    shape.setShape();
});

