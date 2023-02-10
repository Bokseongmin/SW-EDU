// FrontEx01.js
// 사용자 정의 플러그인 추가
// jquery CDN보다 아래에 위치 해야 한다.
$.fn.myPlugin = function(data) {
    console.log("Data : " + data);
    $(this)
        .text(data)
        .css({
            "color":"green",
            "background-color": "pink"
        });
    // 메서드 체인이 가능하도록 this를 반환
    return this;
};