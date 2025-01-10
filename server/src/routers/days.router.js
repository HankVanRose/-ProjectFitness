const router = require('express').Router();
const { Day, Exercise, DayExercise, Plan } = require('../../db/models');

router.get('/:id', async (req, res) => {
  try {
    const days = await Day.findAll({
      where: { planId: req.params.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Exercise,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    });
    console.log('\n\n\n\n\n\n\n\n',  days);
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
    points,
    exerciseIds,
    name,
    image,
    shortDescription,
    longDescription,
    equipment,
    difficulty,
    weeksDuration,
    numOfSessions,
    slogan,
    weeksDescription,
    sessionsPerWeek,
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
      numOfSessions,
      slogan,
      weeksDescription,
      sessionsPerWeek,
    });

    const newDay = await Day.create({ planId: newPlan.id, points });

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
    res.status(201).json({ day: dayWithExercises, plan: newPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to create new day',
    });
  }
});

module.exports = router;
