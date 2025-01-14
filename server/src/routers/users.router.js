const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');
const fs = require('fs').promises;
const path = require('path');
const upload = require('../middlewares/multer');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { gender: { [Op.iLike]: `%${search}%` } },
          { goal: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalUsers: count,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/upload-avatar', verifyAccessToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }
    const userId = res.locals.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      await fs.unlink(req.file.path);
      return res.status(404).jsom({ message: 'Пользователь не найден' });
    }

    if (user.avatar) { //удаляем предыдущий файл
      const oldAvatarPath = path.join(__dirname, '..', user.avatar);
      try {
        await fs.unlink(oldAvatarPath);
      } catch (error) {
        console.error('Ошибка при удалении старого аватара:', error);
      }
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    await user.update({ avatar: avatarUrl });
    console.log('Обновлённый пользователь:', await User.findByPk(userId));
    const { accessToken, refreshToken } = generateToken({ user });

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({
        success: true,
        user: user,
        accessToken,
      });
  } catch (error) {
    console.error('Upload avatar error:', error);
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    res.status(500).json({ message: 'Ошибка при загрузке автара' });
  }
});

module.exports = router;
