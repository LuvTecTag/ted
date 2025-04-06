import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ children }) => {
  return (
    <div className="home-container">
      {children ? (
        children
      ) : (
        <>
          <h1>欢迎使用祝福泡泡生成器</h1>
          <div className="scenario-selection">
            <Link to="/wedding" className="scenario-card wedding-card">
              <h2>婚礼祝福场景</h2>
              <p>点击进入婚礼祝福模板</p>
            </Link>
            <Link to="/birthday" className="scenario-card birthday-card">
              <h2>生日祝福场景</h2>
              <p>点击进入生日祝福模板</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;