const router = require('express').Router();
const {
  Day,
  Exercise,
  DayExercise,
  Plan,
  UserDay,
} = require('../../db/models');

router.get('/:id', async (req, res) => {
  try {
    const days = await Day.findAll({
      where: { planId: req.params.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Exercise,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: UserDay,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
 
     
        
 
        },
 
      ],
      order: [['id']],
    });
    // console.log('\n\n\n\n\n\n\n\n', days);
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
    //!! POINT NE FLOAT A NUMBER
    await Promise.all(
      days.map(async (day) => {
        const newDay = await Day.create({ planId: newPlan.id, points: +day.points  });
        const dayExercises = day.Exercises.map((exercise) => ({
          dayId: newDay.id,
          exerciseId: exercise.id,
        }));
        await DayExercise.bulkCreate(dayExercises);
      }),
    );


    // const dayWithExercises = await Day.findAll({
    //   where: { planId: newPlan.id },
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    //   include: [
    //     {
    //       model: Exercise,
    //       attributes: { exclude: ['createdAt', 'updatedAt'] },
    //     },
    //     {
    //       model: UserDay,
    //       attributes: { exclude: ['createdAt', 'updatedAt'] },
    //     },
    //   ],
    // });

    res.status(201).end()
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to create new day',
    });
  }
});

module.exports = router;
