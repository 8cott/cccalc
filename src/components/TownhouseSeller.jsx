import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

const roundToNearest = (value, nearest) => {
  return Math.round(value / nearest) * nearest;
};

// Default Values
const TownhouseSeller = () => {
  const [values, setValues] = useState({
    // Purchase Price
    purchasePrice: 1500000,
    // Broker
    commissionPercentage: 6,
    commissionAmount: 90000,
    // Attorney
    attorneyFees: 3000,
    // Bank
    payoffFees: 1400,
    // Government & Title
    nycTransferTaxes: 0,
    nysTransferTaxes: 0,
    ucc: 125,
    // Rocording & Closing
    titleCloserFee: 375,
  });

  useEffect(() => {
    const nycTransferTaxes =
      values.purchasePrice < 500000
        ? values.purchasePrice * 0.01
        : values.purchasePrice * 0.01425;

    const nysTransferTaxes =
      values.purchasePrice < 3000000
        ? values.purchasePrice * 0.004
        : values.purchasePrice * 0.0065;

    setValues((prevValues) => ({
      ...prevValues,
      nycTransferTaxes: roundToNearest(nycTransferTaxes, 1),
      nysTransferTaxes: roundToNearest(nysTransferTaxes, 1),
    }));
  }, [values.purchasePrice]);

  const handleInputChange = (newValue, changedField) => {
    let parsedValue = parseFloat(newValue);
    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    switch (changedField) {
      case 'purchasePrice':
        setValues((prevValues) => ({
          ...prevValues,
          purchasePrice: parsedValue,
          commissionAmount: Math.round(
            (parsedValue * prevValues.commissionPercentage) / 100
          ),
        }));
        break;
      case 'commissionPercentage':
        setValues((prevValues) => ({
          ...prevValues,
          commissionPercentage: parsedValue,
          commissionAmount: Math.round(
            (prevValues.purchasePrice * parsedValue) / 100
          ),
        }));
        break;
      case 'commissionAmount':
        setValues((prevValues) => ({
          ...prevValues,
          commissionAmount: parsedValue,
          commissionPercentage: Math.round(
            (parsedValue / prevValues.purchasePrice) * 100
          ),
        }));
        break;
      default:
        setValues((prevValues) => ({
          ...prevValues,
          [changedField]: parsedValue,
        }));
        break;
    }
  };

  const calculateTotalClosingCosts = () => {
    const {
      // Broker
      commissionAmount,
      // Attorney
      attorneyFees,
      // Bank
      payoffFees,
      // Government & Title
      nycTransferTaxes,
      nysTransferTaxes,
      ucc,
      // Recording & Closing
      titleCloserFee,
    } = values;

    const total =
      // Broker
      parseFloat(commissionAmount) +
      // Attorney
      attorneyFees +
      // Bank
      payoffFees +
      // Government & Title
      parseFloat(nycTransferTaxes) +
      parseFloat(nysTransferTaxes) +
      ucc +
      // Recording & Closing
      titleCloserFee;

    return total.toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Display
  return (
    <div>
      <h2>Closing Costs Calculator</h2>
      <div>
        <label>Purchase Price: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          decimalsLimit={0}
          value={values.purchasePrice}
          onValueChange={(value) => handleInputChange(value, 'purchasePrice')}
        />
      </div>
      <div>
        <h3>Broker</h3>
      </div>
      <div>
        <label>Commission Percentage: </label>
        <CurrencyInput
          suffix='%'
          decimalsLimit={0}
          value={values.commissionPercentage}
          onValueChange={(value) =>
            handleInputChange(value, 'commissionPercentage')
          }
        />
      </div>
      <div>
        <label>Commission Amount: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.commissionAmount}
          onValueChange={(value) =>
            handleInputChange(value, 'commissionAmount')
          }
        />
      </div>
      <h3>Attorney</h3>
      <div>
        <label>Attorney Fees: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.attorneyFees}
          onValueChange={(value) => handleInputChange(value, 'attorneyFees')}
        />
      </div>
      <h3>Bank</h3>
      <div>
        <label>Payoff Fees: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.payoffFees}
          onValueChange={(value) => handleInputChange(value, 'payoffFees')}
        />
      </div>
      <h3>Government & Title</h3>
      <div>
        <label>NYC Transfer Taxes:</label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.nycTransferTaxes}
          onValueChange={(value) =>
            handleInputChange(value, 'nycTransferTaxes')
          }
        />
      </div>
      <div>
        <label>NYS Transfer Taxes:</label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.nysTransferTaxes}
          onValueChange={(value) =>
            handleInputChange(value, 'nysTransferTaxes')
          }
        />
      </div>
      <div>
        <label>UCC-3 Filing Fee: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.ucc}
          onValueChange={(value) => handleInputChange(value, 'ucc')}
        />
      </div>
      <div>
        <h3>Recording & Closing:</h3>
        <div>
          <label>Pick-up/Payoff Fee to Title Closer:</label>
          <CurrencyInput
            intlConfig={{ locale: 'en-US', currency: 'USD' }}
            value={values.titleCloserFee}
            onValueChange={(value) =>
              handleInputChange(value, 'titleCloserFee')
            }
          />
        </div>
      </div>
      <h2>
        Total Closing Costs: {calculateTotalClosingCosts().toLocaleString()}
      </h2>
    </div>
  );
};

export default TownhouseSeller;
