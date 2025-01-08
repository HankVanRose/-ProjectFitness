const router = require('express').Router();
const { Exercise } = require('../../db/models');


router.route('/').get(async (req, res) => {
  try {
    const plans = await Exercise.findAll();
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch films',
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
      error: 'Failed to fetch films',
    });
  }
});

module.exports = router;
