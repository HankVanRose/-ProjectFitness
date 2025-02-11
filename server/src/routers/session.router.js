const router = require('express').Router();

const cookieConfig = require('../../configs/cookieConfig');
const { Session, Plan, UserDay, Day, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const generateToken = require('../utils/generateToken');

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

router.get('/plans/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const plans = await Session.findAll({
      where: { userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Plan,
          attributes: ['name', 'image', 'numOfTrainings'],
        },
      ],
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
    const { isCompleted, userId, points, calories } = req.body;

    if (typeof isCompleted !== 'boolean') {
      return res
        .status(400)
        .json({ error: 'isCompleted должно быть булевым значением.' });
    }
    const userDay = await UserDay.findOne({
      where: {
        userId,
        dayId,
      },
      include: [
        {
          model: Day,
        },
      ],
    });

    if (!userDay) {
      return res.status(404).json({ error: 'Запись не найдена.' });
    }
    1;

    const findUser = await User.findOne({ where: { id: userId } });

    if (points && calories) {
      findUser.points += points;
      findUser.calories += calories;

      await findUser.save();
    }

    const { accessToken, refreshToken } = generateToken({ user: findUser });

    userDay.isCompleted = isCompleted;
 
    if (!userDay.plannedOn) {
      const today = new Date();
      const date = new Date(today.setDate(today.getDate() - 1))
        .toISOString()
        .split('T')[0];

      userDay.plannedOn = date;
    }

    const session = await Session.findOne({
      where: {
        userId,
        planId: userDay.Day.planId,
      },
    });

    const allUserDays = await UserDay.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Day,
          where: { planId: session.planId },
        },
      ],
    });

    const allUserDaysCompleted = allUserDays.every(
      (day) => day.isCompleted === true
    );

    if (allUserDaysCompleted) {
      session.isCompleted = true;
      await session.save();
    }

 
    await userDay.save();
    res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({
        message: 'Профиль успешно обновлен',
        user: findUser,
        userDay,
        accessToken,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Произошла ошибка при обновлении записи.' });
  }
});

//! удаляем план у пользователя и userDays, связанные с этим планом
router.delete('/', async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const foundDays = await Day.findAll({ where: { planId } });
    const foundDaysId = foundDays.map((el) => el.id);

    foundDaysId.map((dayId) => {
      return UserDay.destroy({ where: { userId, dayId } });
    }); // Ожидаем завершения всех операций
    await Session.destroy({ where: { userId, planId } });
    res.status(200).json({ message: 'План удален у пользователя' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to delete the plan',
    });
  }
});

module.exports = router;
