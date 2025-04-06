import React, { useContext, useState, useEffect } from 'react';
import { MaterialsContext } from '../App';
import './BirthdayPage.css';

export default function BirthdayPage() {
  const materials = useContext(MaterialsContext);
  const [layout, setLayout] = useState('grid');

  // 生成随机位置的装饰元素
  const generateRandomElements = (type, count) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      const style = {
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 90}%`,
        animationDelay: `${Math.random() * 5}s`
      };
      elements.push(
        <div 
          key={`${type}-${i}`} 
          className={type} 
          style={style}
        />
      );
    }
    return elements;
  };

  return (
    <div className="page-container">
      {/* 装饰元素 */}
      {generateRandomElements('balloon', 10)}
      {generateRandomElements('confetti', 15)}
      {generateRandomElements('candle-light', 8)}
      
      <h2>生日祝福场景</h2>
      <div className="layout-selector">
        <select value={layout} onChange={(e) => setLayout(e.target.value)}>
          <option value="grid">网格布局</option>
          <option value="carousel">轮播布局</option>
        </select>
      </div>
      
      <div className={`materials-${layout}`}>
        {materials.map(material => (
          <div key={material.id} className="material-item">
            {material.type === 'image' ? (
              <img src={material.file.preview} alt="上传图片" />
            ) : (
              <video controls>
                <source src={material.file.preview} type={material.file.type} />
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}