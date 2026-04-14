const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// чтобы сервер принимал данные формы
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// обработка формы
app.post("/send", async (req, res) => {
    console.log("BODY:", req.body);
    const { name, email, message } = req.body;

    // SMTP Mail.ru
    const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: "egor.skliar13@mail.ru", // МОЯ ПОЧТА
            pass: "gvYOGQTgrgKgWcArV8jw" // пароль приложения
        }
    });

    try {
        await transporter.sendMail({
            from: "egor.skliar13@mail.ru",
            to: "egor.skliar13@mail.ru",
            subject: "Новый вопрос с сайта Feel & Move",
            html: `
                <h2>Новый вопрос с сайта</h2>
                <p><b>Имя:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Сообщение:</b><br>${message}</p>
            `
        });

        res.sendStatus(200);
    } catch (error) {
        console.error("Ошибка отправки:", error);
        res.sendStatus(500);
    }
});

// запуск сервера
app.listen(3000, () => {
    console.log("Сервер запущен: http://localhost:3000");
});