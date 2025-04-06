import React, { useContext, useState, useEffect } from 'react';
import { MaterialsContext } from '../App';
import './WeddingPage.css';

export default function WeddingPage() {
  const materials = useContext(MaterialsContext);
  const [layout, setLayout] = useState('grid');
  const [hearts, setHearts] = useState([]);

  // 创建随机飘落的爱心
  useEffect(() => {
    const createHeart = () => {
      const newHeart = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 5,
        size: 15 + Math.random() * 30
      };
      setHearts(prev => [...prev, newHeart]);
      
      // 移除爱心
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, newHeart.duration * 1000);
    };

    // 每隔一段时间创建新爱心
    const interval = setInterval(createHeart, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wedding-page">
      {/* 飘落的爱心 */}
      {hearts.map(heart => (
        <div 
          key={heart.id} 
          className="heart" 
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            animation: `heartFall ${heart.duration}s linear infinite`
          }}
        >
          ❤
        </div>
      ))}
      
      <div className="wedding-content">
        <h2>婚礼祝福场景</h2>
        <div className="layout-selector">
          <select value={layout} onChange={(e) => setLayout(e.target.value)}>
            <option value="grid">网格布局</option>
            <option value="carousel">轮播布局</option>
          </select>
        </div>
        
        <div className={`materials-${layout}`}>
          {materials && materials.length > 0 ? materials.map(material => (
            <div key={material.id} className="material-item">
              {material.type === 'image' ? (
                <img src={material.file.preview} alt="上传图片" />
              ) : (
                <video controls>
                  <source src={material.file.preview} type={material.file.type} />
                </video>
              )}
            </div>
          )) : (
            <div className="no-materials">
              <p>暂无上传的图片或视频，请返回首页上传</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}