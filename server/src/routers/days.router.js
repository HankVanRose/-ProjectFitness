const router = require('express').Router();
const { where } = require('sequelize');
const {
  Day,
  Exercise,
  DayExercise,
  Plan,
  UserDay,
} = require('../../db/models');

router.get('/:planId/user/:userId', async (req, res) => {
  try {
    console.log(req.params);
    const userDays = await UserDay.findAll({
      where: { userId: req.params.userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Day,
          where: { planId: req.params.planId },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Exercise,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
      order: [['id']],
    });
    // console.log('userDays', userDays.map(el => el.get({plain: true})));

    const days = await Day.findAll({
      where: { planId: req.params.planId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Exercise,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: UserDay,
          where: { userId: req.params.userId },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      order: [['id']],
    });
    // console.log(days.map(el => el.get({plain: true})));

    res.status(200).json(days);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch days',
    });
  }
});

//! создаем день с упражнениями
router.post('/', async (req, res) => {
  const { planId, points, exerciseIds } = req.body;

  try {
    const newDay = await Day.create({ planId, points });

    if (exerciseIds && exerciseIds.length > 0) {
      const dayExercises = exerciseIds.map((exerciseId) => ({
        dayId: newDay.id,
        exerciseId,
      }));
      await DayExercise.bulkCreate(dayExercises);
    }

    const dayWithExercises = await Day.findByPk(newDay.id, {
      include: {
        model: Exercise,
      },
    });
    res.status(201).json(dayWithExercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to create new day',
    });
  }
});

//! новый план с днем и упражнениями(не знаю будет ли работать если + несколько дней)
router.post('/newPlan/day/exercises', async (req, res) => {
  const {
    days,
    name,
    image,
    shortDescription,
    longDescription,
    equipment,
    difficulty,
    weeksDuration,
    slogan,
    weeksDescription,
    numOfTrainings,
  } = req.body;

  try {
    const newPlan = await Plan.create({
      name,
      image,
      shortDescription,
      longDescription,
      equipment,
      difficulty,
      weeksDuration,
      numOfTrainings,
      slogan,
      weeksDescription,
    });
    //! POINTs AND CALORIES - NUMBER
    await Promise.all(
      days.map(async (day) => {
        const newDay = await Day.create({
          planId: newPlan.id,
          points: +day.points,
          calories: +day.calories,
          title: day.title,
          description: day.description,
          type: day.type,
          target: day.target,
          rounds: day.rounds,
        });
        const dayExercises = day.Exercises.map((exercise) => ({
          dayId: newDay.id,
          exerciseId: exercise.id,
        }));
        await DayExercise.bulkCreate(dayExercises);
      })
    );
    res.status(201).json(newPlan.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to create new day',
    });
  }
});

module.exports = router;
