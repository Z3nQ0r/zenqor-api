require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Zenqor Panel</title>
        <style>
          body {
            background: #0f172a;
            color: white;
            font-family: monospace;
            text-align: center;
            padding: 40px;
          }
          h1 { color: #00f7ff; }
          .box {
            background: #1e293b;
            padding: 20px;
            margin: 10px;
            border-radius: 10px;
          }
          button {
            padding: 10px 20px;
            background: #00f7ff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>ZENQOR PANEL</h1>

        <div class="box">
          <p>Status API</p>
          <button onclick="checkStatus()">Check</button>
          <p id="result"></p>
        </div>

        <script>
          function checkStatus() {
            fetch('/api/status')
              .then(res => res.json())
              .then(data => {
                document.getElementById('result').innerText =
                  JSON.stringify(data);
              });
          }
        </script>
      </body>
    </html>
  `);
});

app.use("/api", require("./routes/api"));

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running...");
});
