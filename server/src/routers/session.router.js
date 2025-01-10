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

//! все названия сессии юзера
router.route('/plans/:userId').get(async (req, res) => {
  try {
    const { userId } = req.params;

    const plans = await Session.findAll({
      where: { userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Plan,
        attributes: ['name'],
      },
    });

    const planNames = plans.map((plan) => plan.Plan.name);
    const planNamesWithSpaces = planNames.join(' ');

    res.json(planNamesWithSpaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.route('/:userId').get(async (req, res) => {
  try {
    const { userId } = req.params;
    const plan = await Session.findAll({
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
    console.log('\n\n\n\n\n\n\n\n\n', foundDaysId);
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
module.exports = router;
