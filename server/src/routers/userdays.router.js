const router = require('express').Router();
const {
  UserDay,
  Day,
  Exercise,
  DayExercise,
  Plan,
} = require('../../db/models');
const { Op } = require('sequelize');

// Get all UserDays for a specific user within a date range (for calendar view)
router.get('/user/:userId/calendar', async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query; // Format: YYYY-MM-DD

    const userDays = await UserDay.findAll({
      where: {
        userId,
        plannedOn: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Day,
          include: [
            {
              model: Exercise,
              through: DayExercise,
              attributes: ['id', 'name', 'shortDescription'],
            },
          ],
        },
      ],
    });

    // Transform data for calendar view
    const calendarData = userDays.reduce((acc, userDay) => {
      const date = userDay.plannedOn;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(userDay);
      return acc;
    }, {});

    res.status(200).json(calendarData);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching calendar data', error: error.message });
  }
});

// Get UserDays for a specific date
router.get('/user/:userId/date/:date', async (req, res) => {
  try {
    const { userId, date } = req.params;

    const userDays = await UserDay.findAll({
      where: {
        userId,
        plannedOn: date,
      },
      include: [
        {
          model: Day,
          include: [
            {
              model: Exercise,
              through: DayExercise,
              attributes: ['id', 'name', 'shortDescription'],
            },
            {
              model: Plan,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(userDays);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching date trainings', error: error.message });
  }
});

// Update plannedOn date for UserDay
router.patch('/plan/:userDayId', async (req, res) => {
  try {
    const { userDayId } = req.params;
    const { plannedOn } = req.body;

    const userDay = await UserDay.findByPk(userDayId);
    if (!userDay) {
      return res.status(404).json({ message: 'Training day not found' });
    }

    userDay.plannedOn = plannedOn;
    console.log('datedatedatedatedate', plannedOn);

    await userDay.save();

    // Fetch updated UserDay with related data
    const updatedUserDay = await UserDay.findByPk(userDayId, {
      include: [
        {
          model: Day,
          include: [
            {
              model: Exercise,
              through: DayExercise,
            },
            {
              model: Plan,
            },
          ],
        },
      ],
    });

    res.json(updatedUserDay);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating planned date', error: error.message });
  }
});

// Update UserDay completion status
router.patch('/:userDayId', async (req, res) => {
  try {
    const { userDayId } = req.params;
    const { isCompleted } = req.body;

    const userDay = await UserDay.findByPk(userDayId);
    if (!userDay) {
      return res.status(404).json({ message: 'Training day not found' });
    }

    userDay.isCompleted = isCompleted;
    const date = new Date().toISOString().split('T')[0];
    userDay.plannedOn = date;

    await userDay.save();

    // Fetch updated UserDay with related data
    const updatedUserDay = await UserDay.findByPk(userDayId, {
      include: [
        {
          model: Day,
          include: [
            {
              model: Exercise,
              through: DayExercise,
            },
            {
              model: Plan,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(updatedUserDay);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating training day', error: error.message });
  }
});

// Get all unplanned UserDay for a user
router.get('/unplanned/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const unplannedDays = await UserDay.findAll({
      where: {
        userId,
        plannedOn: null,
      },
      include: [
        {
          model: Day,
          include: [
            {
              model: Exercise,
              through: DayExercise,
              attributes: ['id', 'name', 'shortDescription'],
            },
            {
              model: Plan,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(unplannedDays);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: 'Error fetching unplanned days', error: error.message });
  }
});
// get all userDays of 1 user
router.get('/all/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const unplannedDays = await UserDay.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Day,
          include: [
            {
              model: Exercise,
              through: DayExercise,
              attributes: ['id', 'name', 'shortDescription'],
            },
            {
              model: Plan,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(unplannedDays);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: 'Error fetching unplanned days', error: error.message });
  }
});
router.get('/soonest/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day

    const unplannedDays = await UserDay.findAll({
      where: {
        userId,
        plannedOn: {
          [Op.gte]: today, // Greater than or equal to today
        },
      },
      limit: 4,
      order: [['plannedOn', 'ASC']], // This will get the closest dates first
      include: [
        {
          model: Day,
          include: [
            {
              model: Exercise,
              through: DayExercise,
              attributes: ['id', 'name', 'shortDescription'],
            },
            {
              model: Plan,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(unplannedDays);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: 'Error fetching unplanned days', error: error.message });
  }
});

router.patch('/note/:useDayId', async (req, res) => {
  try {
    const { note } = req.body;


    console.log('Received request body:', req.body);

    const userDay = await UserDay.findByPk(req.body.userDayId);

    console.log('Found userDay:', userDay);
   
    userDay.note = note;
    await userDay.save();

    const updatedUserDay = await UserDay.findByPk(req.body.userDayId, {
      include: [
        {
          model: Day,
          include: [
            {
              model: Exercise,
              through: DayExercise,
            },
            {
              model: Plan,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(updatedUserDay);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      message: 'Error updating training day',
      error: error.message,
    });
  }
});

module.exports = router;
