var ctx;

var socket;

//라인 색상 굵기 설정
var shape = {
    color : 'white',
    width : 3,
    change: function() {
        var color = $('#pen_color option:selected').val();
        var width = $('#pen_width option:selected').val();
        shape.setShape(color, width);
    },
    setShape : function(color, width) {
        if(color != null) {
            this.color = color;
        }
        if(width != null) {
            this.width = width;
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        
        ctx.clearRect(703, 0, 860, 90);
        ctx.beginPath();
        ctx.moveTo(710, 55);
        ctx.lineTo(800, 55);
        ctx.stroke();
    }
}

var msg = {
    line : {
        send : function(type, x , y) {
            socket.emit('linesend', {'type':type,'x':x,'y':y,'color':shape.color,'width':shape.width});
        }
    }
}

// 그리기 부분에 대한 설정
var draw = {
    drawing : false,
    start : function(e) {
        ctx.beginPath();
        ctx.moveTo(e.pageX, e.pageY);
        this.drawing = true;
        
        msg.line.send('start', e.pageX, e.pageY);
    },
    move : function (e) {
        if(this.drawing === true) {
            ctx.lineTo(e.pageX, e.pageY);
            ctx.stroke();
            
            msg.line.send('move', e.pageX, e.pageY);
        }
    },
    end : function(e) {
        //shape.drawing = false;
        this.drawing = false;
        $('#cv').bind('mousemove', null);
        
        msg.line.send('end');
    },
    clear : function(e) {
        ctx.clearRect(0, 0, cv.width, cv.height);
        
        msg.line.send('clear');
    },
    drawfromServer : function(data) {
        //console.log(data.type);
        if(data.type == 'start') {
            ctx.beginPath();
            ctx.moveTo(data.x, data.y);
            ctx.strokeStyle = data.color;
            ctx.lineWidth = data.width;
        }
        if(data.type == 'move') {
            console.log(data.x, data.y);
            ctx.lineTo(data.x, data.y);
            ctx.stroke();
        }
        if(data.type == 'end') {
        }
        if(data.type == 'clear') {
            ctx.clearRect(0,0,cv.width, cv.height);
            shape.setShape();
        }
    }
}

var color_map = [
    {'value':'white', 'name':'하얀색'},
    {'value':'red', 'name':'빨간색'},
    {'value':'orange', 'name':'주황색'},
    {'value':'yellow', 'name':'노란색'},
    {'value':'blue', 'name':'파랑색'},
    {'value':'black', 'name':'검은색'}
];

$(document).ready(function () {
    ctx = $('#cv')[0].getContext('2d');
    
    // Canvas 사이즈 변경
    $('#cv').attr('width', '860px');
    $('#cv').attr('height', '640px');
    
    draw.drawing = false;
    $('#cv').on('mousedown', draw.start);
    $('#cv').on('mousemove', draw.move);
    $('#cv').on('mouseup', draw.end);
    $('select').on('change', shape.change);
    
    shape.setShape();
    
    $('#clear').bind('click', draw.clear);
    
    
    $.each(color_map, function(idx, item) {
        var optionTag = "<option value='"+ item.value +"'>" +
            item.name + "</option>";
        $("#pen_color").append(optionTag);
    });
    
    for(var i=1; i<16; i++) {
        var optionTag ="<option value='"+i+"'>"+i+"</option>";
        $("#pen_width").append(optionTag);
    }
    
    // socket 전역 설정 - 서버 URL 동적 사용
    socket = io.connect('http://'+window.location.host);
    //console.log(window.location.host);
    
    socket.on('linesend_tocllinet', function(data) {
        //console.log(data);
        draw.drawfromServer(data);
    });
    
});

