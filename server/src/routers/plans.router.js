const router = require('express').Router();
const { Plan } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.route('/').get(async (req, res) => {
  try {
    const plans = await Plan.findAll();
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
    const plan = await Plan.findByPk(id);
    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch films',
    });
  }
});

router.patch('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      image,
      shortDescription,
      equipment,
      difficulty,
      numOfTrainings,
      longDescription,
      slogan,
      weeksDescription,
    } = req.body;

    const plan = await Plan.findByPk(id);

    if (plan) {
      plan.name = name;
      plan.image = image;
      plan.shortDescription = shortDescription;
      plan.equipment = equipment;
      plan.difficulty = difficulty;
      plan.numOfTrainings = numOfTrainings;
      plan.longDescription = longDescription;
      plan.slogan = slogan;
      plan.weeksDescription = weeksDescription;

      await plan.save();
    }
    if (!plan) {
      return res.status(404).json({ error: 'Ошибка' });
    }

    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch films',
    });
  }
});





router.delete('/:id' , async (req, res) => {
  try {
    const { id } = req.params;
    

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ message: 'План не найден' });
      
    }
    await plan.destroy();
    

    res.status(200).json({ message: 'План удален' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch films',
    });
  }
});

module.exports = router;
