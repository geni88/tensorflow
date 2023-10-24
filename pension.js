import http from 'http';
import fs from 'fs';
import path from "path";
const file_name = "/Users/jin/Documents/academy/hedonic/tensorflow.js-1/pension.csv";
// const server = http.createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" }); //header 정보 세팅 
//     const csvPension = fs.readFile(file_name, "utf8", function (err, data) {
//         res.end(data);
//         return data;
//     });
// });

// server.listen(8080, function () {
//     console.log("The server is running at port 8080...")
// });


const csvPension = fs.readFileSync(file_name, "utf-8");
import tf from '@tensorflow/tfjs';

const csvP = csvPension.toString();

function csvToJSON(csv_string) {

    // 1. 문자열을 줄바꿈으로 구분 => 배열에 저장
    const rows = csv_string.split("\r\n");

    // 줄바꿈을 \n으로만 구분해야하는 경우, 아래 코드 사용
    // const rows = csv_string.split("\n");


    // 2. 빈 배열 생성: CSV의 각 행을 담을 JSON 객체임
    const jsonArray = [];
    const jsonArray2 = [];



    // 3. 제목 행 추출 후, 콤마로 구분 => 배열에 저장
    const header = rows[0].split(",");

    // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
    for (let i = 2; i < rows.length; i++) {

        // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
        // let obj = {};

        // 각 내용 행을 콤마로 구분
        let row = rows[i].split(",");
        const obj = Number(row[0]);
        const obj2 = Number(row[1]);
        // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
        // for (let j = 0; j < header.length; j++) {
        //     obj[header[j]] = row[j];
        // }

        // 각 내용 행의 객체를 jsonArray배열에 담기
        jsonArray.push(obj);
        jsonArray2.push(obj2);

    }

    // 5. 완성된 JSON 객체 배열 반환
    //리턴값 오브젝트로 받기
    return { jsonArray, jsonArray2 };

    // 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용
    // return JSON.stringify(jsonArray);
}

const arr_num = csvToJSON(csvP).jsonArray;
const arr_result = csvToJSON(csvP).jsonArray2;
export { arr_num, arr_result };

// for (let i = 0; i < arr_num.length; i++) {
//     console.log(typeof arr_num[i]);
// }
// console.log(typeof arr_num[0])
// 3. JSON 변환 결과 확인
console.log(arr_num);
console.log(arr_result);

/* 출력결과
  [
    { '제품명': '대나무빨대', '가격': '1500', '갯수': '10' },
    { '제품명': '법랑커피잔', '가격': '15000', '갯수': '20' }
  ]
*/

// /*-----------------------------------------------
var 원인 = tf.tensor(arr_num);
var 결과 = tf.tensor(arr_result);

// 2. 모델의 모양을 만듭니다. 
var X = tf.input({ shape: [1] });
var Y = tf.layers.dense({ units: 1 }).apply(X);
var model = tf.model({ inputs: X, outputs: Y });

var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError }

model.compile(compileParam);
var fitParam = {
    epochs: 100,
    callbacks: {
        onEpochEnd:
            function (epoch, logs) {
                console.log('epoch', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss));
            }
    }
}
/*
tfvis.show.modelSummary({ name: '요약', tab: '모델' }, model);

// 3. 데이터로 모델을 학습시킵니다. 
//         var fitParam = {epochs: 100}
var _history = [];
var fitParam = {
    epochs: 100,
    callbacks: {
        onEpochEnd:
            function (epoch, logs) {
                console.log('epoch', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss));
                _history.push(logs);
                tfvis.show.history({ name: 'loss', tab: '역사' }, _history, ['loss']);
            }
    }
   
} // loss 추가 예제
 */
// /*-----------------------------------------------
model.fit(원인, 결과, fitParam).then(function (result) {

    // 4. 모델을 이용합니다. 
    // 4.1 기존의 데이터를 이용
    var 예측한결과 = model.predict(원인);
    예측한결과.print();

});

// 4.2 새로운 데이터를 이용
var 회차 = [184, 185, 186, 187, 188]
var choose = tf.tensor(회차);
var 로또번호 = model.predict(choose);
로또번호.print();
// ------------------------------------------------ */
