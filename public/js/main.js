const recordBtn = document.querySelector(".record-btn");
const player = document.querySelector(".audio-player");


if (navigator.mediaDevices.getUserMedia) {

  // 建立一個串流空陣列，用來存放 blob
  var chunks = [];
  // 透過 constraints 來限制要跟用戶取用的功能
  const constraints = { audio: true };
  // 取得用戶授權 audio
  navigator.mediaDevices.getUserMedia(constraints).then(
    stream => {
      console.log(stream)
      console.log("授權成功！");

      // 建立一個 mediaRecorder 實例，可以利用 mediaRecorder API
      const mediaRecorder = new MediaRecorder(stream);

      // 按下 record button 時
      recordBtn.onclick = () => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          recordBtn.textContent = "record";
          console.log("錄音结束");
        } else {
          // 每一秒則回傳 blob
          mediaRecorder.start(1000);
          console.log("錄音中...");
          recordBtn.textContent = "stop";
        }
        console.log("錄音器狀態：", mediaRecorder.state);
      };

      // 當 mediaRecorder 接收到檔案時
      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
        console.log(chunks)
      };

      // 當 mediaRecorder 停止時
      mediaRecorder.onstop = e => {

        var blob = new Blob(chunks, { type: "audio/mp3; codecs=opus" });
        console.log(blob)
        chunks = [];
        var audioURL = window.URL.createObjectURL(blob);
        player.src = audioURL;

        // 先建立一個 formData 實例，用於上傳檔案給伺服器
        var formData = new FormData();

        // 將 blob 轉換成 file
        function blobToFile(theBlob, fileName) {
          //A Blob() is almost a File() - it's just missing the two properties below which we will add
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        }
        var myFile = blobToFile(blob, 'audioRecord.mp3')

        formData.append("myrecord", myFile, 'audioRecord.mp3');
        console.log('formData:', formData)

        axios.post('/speechToText', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            console.log(response.data)
            $('.dogpic').attr('src', `${response.data.url}`)
            $('.topic').text(`${response.data.speech}`)
          })
          .catch(err => {
            console.log(err)
          })

        // 取得所有串流的裝置，並全部關閉
        // stream.getTracks().forEach(function (track) {
        //   track.stop()
        // })
      };
    },
    () => {
      console.error("授權失败！");
    }
  );
} else {
  console.error("瀏灠器不支持 getUserMedia");
}

