const express = require("express");
const app  = express();
const port = 3000;

// ルーティングの設定
app.get("/", (req, res) =>{
  res.sendFile(`${__dirname}/Home.html`);
  console.log("/ へアクセスがありました");
});

app.get("/img/:file", (req, res) =>{
  const file = req.params.file;

  res.sendFile(`${__dirname}/img/${file}`);
  console.log(`/image/${file} へアクセスがありました`);
});

app.get("/css/:file", (req, res) =>{
  const file = req.params.file;
  
  res.sendFile(`${__dirname}/css/${file}`);
  console.log(`/css/${file} へアクセスがありました`);
});

// HTTPサーバを起動する
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});