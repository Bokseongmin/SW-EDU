console.log("Promise Exam");

function task() {
    console.log("task 실행...");
    setTimeout(function () {
        console.log("task 실행 끝");
        fullfilled("실행 결과");
    }, 1000);
}
function fullfilled(result) {
    console.log("task 실행 후 >>> fullfilled 실행 >>> ", result);
}
function rejected(err) {
    console.log("rejected 실행 >>>", err);
}

new Promise(task).then(fullfilled, rejected);