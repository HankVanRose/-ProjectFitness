const router = require('express').Router();

const { Session, Plan, UserDay, Day } = require('../../db/models');

//! все сессии
router.route('/').get(async (req, res) => {
  try {
    const plans = await Session.findAll();
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch films',
    });
  }
});

//! все сессия по айди

// router.route('/:id').get(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const plan = await Session.findByPk(id);
//     res.status(200).json(plan);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: 'Failed to fetch films',
//     });
//   }
// });

//! все сессии юзера с планами (только названия и картинки)
//! [
//!  {
//!     "id": 1,
//!     "planId": 2,
//!     "userId": 1,
//!     "isCompleted": false,
//!     "Plan": {
//!       "name": "CrossFit HELL",
//!       "image": "https://fitni.ru/wp-content/uploads/2017/07/1500225443_maxresdefault.jpg"
//!     }
//!   }]
router.route('/plans/:userId').get(async (req, res) => {
  try {
    const { userId } = req.params;

    const plans = await Session.findAll({
      where: { userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Plan,
        attributes: ['name', 'image'],
      },
    });

    // const planNames = plans.map((plan) => plan.Plan.name);
    // const planNamesWithSpaces = planNames.join(' ');

    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.route('/:userId').get(async (req, res) => {
  try {
    const { userId } = req.params;
    const plan = await UserDay.findAll({
      where: { userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch films',
    });
  }
});

//! создание сессии юзера

router.route('/').post(async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const plan = await Session.create({ userId, planId });
    const foundDays = await Day.findAll({ where: { planId } });
    const foundDaysId = foundDays.map((el) => el.id);

    const userDaysPromises = foundDaysId.map((dayId, index) => {
      return UserDay.create({ userId, dayId, order: index + 1 });
    }); // Ожидаем завершения всех операций
    const result = await Promise.all(userDaysPromises);
    res.status(200).json({ plan, userDays: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch days',
    });
  }
});

router.route('/:id').patch(async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    if (typeof isCompleted !== 'boolean') {
      return res
        .status(400)
        .json({ error: 'isCompleted должно быть булевым значением.' });
    }

    const userDay = await UserDay.findByPk(id);

    if (!userDay) {
      return res.status(404).json({ error: 'Запись не найдена.' });
    }

    userDay.isCompleted = isCompleted;
    await userDay.save();

    return res.status(200).json(userDay);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Произошла ошибка при обновлении записи.' });
  }
});

module.exports = router;
