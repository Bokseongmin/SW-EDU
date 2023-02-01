const express = require('express');
const app = express();

// public을 외부에서 접속 할 수 있도록 static 설정 하기.
app.use(express.static('public'));

app.listen(3000, function() {
    console.log("노드js 서버 실행 중 : 3000");
});

// 숙제 1 : 오전에 하던 Slider 완성
// 숙제 2 : 무료템플릿 수정해서 firebase에 deploy
// 숙제 3 : 배운 내용 Note 정리해서 게시판에 올리기