import { useState } from 'react';
import CondoBuyer from './components/CondoBuyer';
import CondoSeller from './components/CondoSeller';
import CoOpBuyer from './components/CoOpBuyer';
import CoOpSeller from './components/CoOpSeller';
import TownhouseBuyer from './components/TownhouseBuyer';
import TownhouseSeller from './components/TownhouseSeller';
import Footer from './components/Footer';
import './App.css'

const App = () => {
  const [mode, setMode] = useState('buying');
  const [propertyType, setPropertyType] = useState('condo');

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const renderContent = () => {
    if (mode === 'buying') {
      switch (propertyType) {
        case 'condo':
          return <CondoBuyer />;
        case 'co-op':
          return <CoOpBuyer />;
        case 'townhouse':
          return <TownhouseBuyer />;
        default:
          return null;
      }
    } else if (mode === 'selling') {
      switch (propertyType) {
        case 'condo':
          return <CondoSeller />;
        case 'co-op':
          return <CoOpSeller />;
        case 'townhouse':
          return <TownhouseSeller />;
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingBottom: '60px', // Provide some padding at the bottom for the footer
  };

  const contentStyles = {
    flex: 1,
    minHeight: 'calc(100vh - 120px)', // Adjust this value based on your design to leave enough space for the footer
  };

  const footerStyles = {
    padding: '20px',
    textAlign: 'center',
    marginTop: '20px',
  };
  
  return (
    <div style={containerStyles}>
      <h1>NYC Closing Costs Calculator</h1>
      <div>
        <label>
          <input
            type="radio"
            value="buying"
            checked={mode === 'buying'}
            onChange={handleModeChange}
          />
          Buying
        </label>
        <label>
          <input
            type="radio"
            value="selling"
            checked={mode === 'selling'}
            onChange={handleModeChange}
          />
          Selling
        </label>
      </div>
      {mode === 'buying' && (
        <div>
          <label>
            <input
              type="radio"
              value="condo"
              checked={propertyType === 'condo'}
              onChange={handlePropertyTypeChange}
            />
            Condo
          </label>
          <label>
            <input
              type="radio"
              value="co-op"
              checked={propertyType === 'co-op'}
              onChange={handlePropertyTypeChange}
            />
            Co-op
          </label>
          <label>
            <input
              type="radio"
              value="townhouse"
              checked={propertyType === 'townhouse'}
              onChange={handlePropertyTypeChange}
            />
            Townhouse
          </label>
        </div>
      )}
      {mode === 'selling' && (
        <div>
          <label>
            <input
              type="radio"
              value="condo"
              checked={propertyType === 'condo'}
              onChange={handlePropertyTypeChange}
            />
            Condo
          </label>
          <label>
            <input
              type="radio"
              value="co-op"
              checked={propertyType === 'co-op'}
              onChange={handlePropertyTypeChange}
            />
            Co-op
          </label>
          <label>
            <input
              type="radio"
              value="townhouse"
              checked={propertyType === 'townhouse'}
              onChange={handlePropertyTypeChange}
            />
            Townhouse
          </label>
        </div>
      )}
      <div style={contentStyles}>
        {renderContent()}
      </div>
      <Footer style={footerStyles} />
    </div>
  );
};

export default App;