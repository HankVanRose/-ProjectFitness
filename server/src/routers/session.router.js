const router = require('express').Router();

const { Session, Plan, UserDay, Day, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

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

    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.route('/:planId/user/:userId/').get(async (req, res) => {
  try {
    const { userId, planId } = req.params;
    const plan = await Session.findOne({
      where: { userId, planId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).json({ plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch films',
    });
  }
});

//! создание сессии юзера + userdays на каждый день из плана
router.route('/').post(async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const plan = await Session.create({ userId, planId });

    const foundDays = await Day.findAll({ where: { planId } });
    const foundDaysId = foundDays.map((el) => el.id);

    // console.log('\n\n\n\n\n\n\n\n\n', foundDaysId);

    const userDaysPromises = foundDaysId.map((dayId) => {
      return UserDay.create({ userId, dayId });
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

router.patch('/:dayId', verifyAccessToken, async (req, res) => {
  try {
    const { dayId } = req.params;
    const { isCompleted, userId, points } = req.body;

    if (typeof isCompleted !== 'boolean') {
      return res
        .status(400)
        .json({ error: 'isCompleted должно быть булевым значением.' });
    }
    console.log('points', points);
    const userDay = await UserDay.findOne({
      where: {
        userId,
        dayId,
      },
    });

    if (points) {
      const findUser = await User.findOne({ where: { id: userId } });
      findUser.points += points;
      await findUser.save();
    }

   

    // console.log(
    //   '\n\n\n\n\n\n\n\n\n105105\n\n\n\n\n\n\n\n\n105105\n\n\n\n\n\n\n\n\n105105',
    //   userDay,
    //   '\n\n\n\n\n\n\n\n\n105105\n\n\n\n\n\n\n\n\n105105',

    // );

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
