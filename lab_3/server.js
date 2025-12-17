const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));

let items = []

app.get("/", (req, res) => {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td>${item.title}</td>
          <td>${item.director}</td>
          <td>${item.genre}</td>
          <td>${item.rating}</td>
          <td>
            <form method="POST" action="/delete/${item.id}" style="display:inline">
              <button type="submit">❌ Удалить</button>
            </form>
          </td>
        </tr>
      `
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Вариант 7. Фильмотека</title>
      <style>
        table { border-collapse: collapse; width: 500px; }
        td, th { border: 1px solid #ccc; padding: 8px; }
        button { cursor: pointer; }
        form { margin: 0; }
      </style>
    </head>
    <body>
      <h2>Список фильмов</h2>

      <table>
        <tr>
          <th>Название</th>
          <th>Режисёр</th>
          <th>Жанр</th>
          <th>Рейтинг</th>
        </tr>
        ${rows}
      </table>

      <form method="POST" action="/add">
        <h3>Добавить фильм</h3>
        <input name="title" placeholder="Название" required />
        <input name="director" placeholder="Режисёр" required />
        <input name="genre" placeholder="Жанр" required />
        <input name="rating" type="number" placeholder="Рейтинг" required/>
        <button type="submit">Добавить</button>
      </form>
    </body>
    </html>
  `);
});

app.post("/add", (req, res) => {
  const { title, director, genre, rating } = req.body

  items.push({
    id: Date.now(),
    title,
    director,
    genre,
    rating,
  });

  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  items = items.filter((item) => item.id !== id);

  res.redirect("/");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});