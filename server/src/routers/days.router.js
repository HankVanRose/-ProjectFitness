const router = require('express').Router();
const { Day, Exercise, DayExercise } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const days = await Day.findAll({
      include: {
        model: Exercise,
      },
    });
    res.status(200).json(days);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch days',
    });
  }
});

// router.get('/dayexercise', async (req, res) => {
//   try {
//     const days = await DayExercise.findAll({
//       include: {
//         model: Exercise,
//       },
//     });
//     res.status(200).json(days);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: 'Failed to fetch days',
//     });
//   }
// });

// router.post('/', async (req, res) => {
//     const { planId, points, exerciseIds } = req.body;

//   try {
//     const newDay = await Day.create({ planId, points });

//     if (exerciseIds && exerciseIds.length > 0) {

//     }
//     res.status(200).json(days);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: 'Failed to fetch day',
//     });
//   }
// });

module.exports = router;
 