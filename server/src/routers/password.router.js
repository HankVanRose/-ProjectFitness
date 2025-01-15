const { Client } = require('pg');
const nodemailer = require('nodemailer');
const router = require('express').Router();
const bcrypt = require('bcrypt');

const client = new Client({
  connectionString: process.env.DB,
});

client.connect();

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Или любой другой почтовый сервис
  auth: {
    user: 'vanroseaxl1@gmail.com',  
    pass: 'njja kzsp nsya xbuv',  
  },
});

async function sendOtp(email, otp) {
    const mailOptions = {
        from: '👻 BEFIT 👻 vanroseaxl1@gmail.com',
        to: email,
        subject: 'Ваш OTP код для восстановления пароля',
        text: `Ваш OTP код: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
}
 
router.post('/request-reset', async (req, res) => {
    const { email } = req.body;

    try {
        const result = await client.query('SELECT * FROM User WHERE email=$1', [email]);
        const user = result.rows[0];
        console.log('\n\n\n\nn\n\n\n\n\n\n\n\n\n', email, '\n\n\n\nn\n\n\n\n\n\n\n\n\n');

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Генерация OTP кода
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiration = new Date(Date.now() + 10 * 60000); // 10 минут

        await client.query('UPDATE users SET otp=$1, otp_expiration=$2 WHERE email=$3', [otp, otpExpiration, email]);
        await sendOtp(email, otp);

        res.status(200).json({ message: 'OTP код отправлен на ваш email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Восстановление пароля
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const result = await client.query('SELECT * FROM Users WHERE email=$1', [email]);
        const user = result.rows[0];
       

        if (!user || user.otp !== otp || new Date() > new Date(user.otp_expiration)) {
            return res.status(400).json({ message: 'Неверный OTP или OTP истек' });
        }

        // Хеширование нового пароля
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await client.query('UPDATE Users SET password=$1, otp=NULL, otp_expiration=NULL WHERE email=$2', [hashedPassword, email]);

        res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;