// id 속성이 clickBtn인 요소의 DOM 셀렉트
var clickBtn = document.getElementById("clickBtn");
// id 값이 같은 요소는 1개 뿐이다.
var heading = document.getElementById("heading");
var aa = document.getElementsByClassName("aa");
console.log(clickBtn);
console.dir(clickBtn);
// 선택된 DOM 요소에 이벤트 핸들러 걸기
clickBtn.onclick = function(event) {
    // 클릭이벤트가 발생하면 이벤트를 console에 출력.
    //console.dir(event);
    console.dir(document);
    document.bgColor = "yellow";
    document.title = "Hello";
    console.log(heading);
    heading.style.backgroundColor = "red";
}

// 문서의 거의 모든 요소가 객체가 될수 있다.
// 함수를 변수에 참조 시킨다.
// 함수를 배열에도 담을 수 있다.
// 함수를 다른 함수의 인자로 사용. (callback 함수)