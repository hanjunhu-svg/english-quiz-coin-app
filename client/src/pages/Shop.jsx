import React, { useState, useEffect, useContext } from 'react';
import { shopAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Shop.css';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);
  const { user, updateUserCoin } = useContext(AuthContext);

  useEffect(() => {
    loadShopItems();
  }, []);

  const loadShopItems = async () => {
    try {
      const response = await shopAPI.getItems();
      setItems(response.data);
    } catch (error) {
      console.error('상점 아이템 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (itemId) => {
    if (user.coin < items.find(item => item._id === itemId).price) {
      alert('코인이 부족합니다.');
      return;
    }

    setPurchasing(itemId);
    try {
      const response = await shopAPI.purchaseItem(itemId);
      updateUserCoin(response.data.remainingCoin);
      alert(`${response.data.item} 구매 완료!`);
    } catch (error) {
      alert(error.response?.data?.message || '구매 실패');
    } finally {
      setPurchasing(null);
    }
  };

  if (loading) {
    return <div className="shop-container"><p>로딩 중...</p></div>;
  }

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>🛍️ 상점</h1>
        <p className="coin-display">현재 코인: 💰 {user?.coin || 0}</p>
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <div key={item._id} className="shop-item">
            <div className="item-header">
              <h3>{item.name}</h3>
              <span className={`item-type ${item.type}`}>{item.type}</span>
            </div>
            
            <p className="item-description">{item.description}</p>
            
            <div className="item-footer">
              <span className="price">💰 {item.price}</span>
              <button
                className="purchase-btn"
                onClick={() => handlePurchase(item._id)}
                disabled={purchasing === item._id || user?.coin < item.price}
              >
                {purchasing === item._id ? '구매 중...' : '구매'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
