const express = require('express');
const ShopItem = require('../models/ShopItem');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// 상점 아이템 조회
router.get('/items', async (req, res) => {
  try {
    const items = await ShopItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 아이템 구매
router.post('/purchase', authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    if (!itemId) {
      return res.status(400).json({ message: '아이템 ID가 필요합니다.' });
    }

    const item = await ShopItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    const user = await User.findById(userId);
    if (user.coin < item.price) {
      return res.status(400).json({ message: '코인이 부족합니다.' });
    }

    // 재고 확인
    if (item.availableStock !== -1 && item.availableStock <= 0) {
      return res.status(400).json({ message: '재고가 부족합니다.' });
    }

    // 구매 처리
    user.coin -= item.price;
    user.purchasedItems.push({
      itemId: item._id,
      purchasedAt: new Date()
    });
    await user.save();

    // 재고 감소
    if (item.availableStock !== -1) {
      item.availableStock -= 1;
      await item.save();
    }

    res.status(200).json({
      message: '구매 성공!',
      item: item.name,
      remainingCoin: user.coin,
      purchasedItems: user.purchasedItems
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 구매 아이템 조회
router.get('/purchases', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    const purchases = await Promise.all(
      user.purchasedItems.map(async (item) => {
        const shopItem = await ShopItem.findById(item.itemId);
        return {
          ...shopItem.toObject(),
          purchasedAt: item.purchasedAt
        };
      })
    );

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

module.exports = router;
