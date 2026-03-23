require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Zenqor Panel</title>
    <style>
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #0f172a, #020617);
        color: #fff;
      }

      .header {
        padding: 20px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        letter-spacing: 2px;
        color: #00f7ff;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
      }

      .card {
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 30px;
        width: 300px;
        text-align: center;
        box-shadow: 0 0 25px rgba(0,255,255,0.2);
      }

      .card h2 {
        margin-bottom: 20px;
        font-size: 18px;
        color: #aaa;
      }

      button {
        padding: 10px 25px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(90deg, #00f7ff, #00c3ff);
        color: black;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
      }

      button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px #00f7ff;
      }

      #result {
        margin-top: 20px;
        font-size: 13px;
        color: #00f7ff;
        word-break: break-all;
      }
    </style>
  </head>

  <body>
    <div class="header">ZENQOR CONTROL PANEL</div>

    <div class="container">
      <div class="card">
        <h2>API STATUS</h2>
        <button onclick="checkStatus()">CHECK</button>
        <div id="result"></div>
      </div>
    </div>

    <script>
      function checkStatus() {
        fetch('/api/status')
          .then(res => res.json())
          .then(data => {
            document.getElementById('result').innerText =
              JSON.stringify(data, null, 2);
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
