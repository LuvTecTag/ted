import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ScenariosComponent({ scenarios }) {
  const navigate = useNavigate();
  return (
    <div className="scenarios-grid">
      {scenarios.map((scenario) => (
        <button
          key={scenario.id}
          className="scenario-card"
          onClick={() => navigate(`/${scenario.title.includes('生日') ? 'birthday' : 'wedding'}`)}
        >
          <h3>{scenario.title}</h3>
          <p>{scenario.description}</p>
        </button>
      ))}
    </div>
  );
}