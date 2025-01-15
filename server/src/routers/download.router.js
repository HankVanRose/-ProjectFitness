const express = require('express');
const { User, Session, Plan } = require('../../db/models');
const ExcelJS = require('exceljs');

const router = express.Router();

router.get('/excel/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const results = await User.findAll({
      where: { id },
      include: [
        {
          model: Session,
          include: {
            model: Plan,
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        },
      ],
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'id',
          'password',
          'avatar',
          'isAdmin',
        ],
      },
    });

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ error: 'Данные не найдены для данного пользователя.' });
    }

    const data = results.map((result) => {
      const plainResult = result.get({ plain: true });
      const plans = plainResult.Sessions.map((session) => session.Plan.name);

      return {
        ['Имя пользователя']: plainResult.username,
        ['Email']: plainResult.email,
        ['Возраст']: plainResult.age,
        ['Пол']: plainResult.gender,
        ['Вес']: plainResult.weight,
        ['Рост']: plainResult.height,
        ['Баллы']: plainResult.points,
        ['Сожженные калории']: plainResult.calories,
        ['Цель']: plainResult.goal,
        ['Планы']: plans,
      };
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Results');

    worksheet.columns = [
      { header: 'Имя пользователя', key: 'Имя пользователя', width: 25 },
      { header: 'Email', key: 'Email', width: 25 },
      { header: 'Возраст', key: 'Возраст', width: 10 },
      { header: 'Пол', key: 'Пол', width: 10 },
      { header: 'Вес', key: 'Вес', width: 10 },
      { header: 'Рост', key: 'Рост', width: 10 },
      { header: 'Баллы', key: 'Баллы', width: 10 },
      { header: 'Сожженные калории', key: 'Сожженные калории', width: 20 },
      { header: 'Цель', key: 'Цель', width: 25 },
      { header: 'Планы', key: 'Планы', width: 35 },
    ];

    data.forEach((record) => {
      const plans = record['Планы'];

      const userRow = {
        'Имя пользователя': record['Имя пользователя'],
        Email: record['Email'],
        Возраст: record['Возраст'],
        Пол: record['Пол'],
        Вес: record['Вес'],
        Рост: record['Рост'],
        Баллы: record['Баллы'],
        'Сожженные калории': record['Сожженные калории'],
        Цель: record['Цель'],
        Планы: plans.length > 0 ? plans.join(', ') : 'Нет планов',
      };
      worksheet.addRow(userRow);

      plans.forEach((plan) => {
        worksheet.addRow({
          'Имя пользователя': '',
          Email: '',
          Возраст: '',
          Пол: '',
          Вес: '',
          Рост: '',
          Баллы: '',
          'Сожженные калории': '',
          Цель: '',
          Планы: '',
        });
      });
    });

    worksheet.eachRow((row) => {
      row.alignment = { vertical: 'middle', horizontal: 'center' };
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    const buf = await workbook.xlsx.writeBuffer();
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.send(buf);
  } catch (error) {
    console.error('Ошибка при получении результатов:', error);
    res.status(500).json({ error: 'Ошибка при получении результатов.' });
  }
});

module.exports = router;
