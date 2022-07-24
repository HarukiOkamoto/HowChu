const express = require("express");
const app  = express();
const port = 3000;

//publicフォルダ内のファイル読み込み
app.use(express.static('public'));


// ルーティングの設定
app.get("/", (req, res) =>{
  res.sendFile(`${__dirname}/public/Home.html`);
  console.log("/ へアクセスがありました");
});

// HTTPサーバを起動する
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});