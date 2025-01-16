const router = require('express').Router();
const { Exercise } = require('../../db/models');

router.route('/').get(async (req, res) => {
  try {
    const Exercises = await Exercise.findAll();
    res.status(200).json(Exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch exercises',
    });
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Exercise.findByPk(id);
    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch exercise',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {name,
      image,
      shortDescription,
      longDescription,
      shortMuscleGroup,
      longMuscleGroup,
      type,
      equipment,
      points,
      calories,
      muscleImage} = req.body;

      const newExercise = await Exercise.create({
        name,
        image,
        shortDescription,
        longDescription,
        shortMuscleGroup,
        longMuscleGroup,
        type,
        equipment,
        points,
        calories,
        muscleImage,
      });
      res.status(201).json(newExercise);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
})

module.exports = router;
