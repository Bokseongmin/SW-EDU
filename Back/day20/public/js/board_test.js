$(document).ready(function() {
    var ctx = $('#cv').get(0).getContext('2d'); //3D 그래픽은 '2d' 대신 'webgl'인자 사용
    // 캔바스 크기 조절을 하려면 캔바스에 직접 조정한다. 안그러면 비율이 깨지거나 확대 된다.
    $('#cv').attr("width", '860px').attr("height", '645px');
    
    // 사각형 그리기
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(10,5,200,200);
    
    // 원 그리기
    ctx.strokeStyle = "#ffff00";
    ctx.lineWidth = 5;
    ctx.beginPath();
    //arc(x, y, 반지름, 시작각도, 원주율) - 원주율은 2가 정원 1이 반원이다.
    ctx.arc(200,200,100,0,2*Math.PI);
    ctx.stroke();
    
    // 선 그리기
    ctx.strokeStyle = "ff00ff";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(200,200);
    ctx.stroke();
});

