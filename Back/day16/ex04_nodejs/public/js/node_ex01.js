console.log("Promise Exam");

function task() {
    console.log("task 실행");
    fullfilled("실행 결과");
}
function fullfilled(result) {
    console.log("fullfilled 실행 >>> ", result);
}
function rejected(err) {
    console.log("rejected 실행 >>>", err);
}

new Promise(task).then(fullfilled, rejected);