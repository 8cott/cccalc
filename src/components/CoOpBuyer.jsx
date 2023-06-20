import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

// Function to round to the nearest dollar
const roundToNearest = (value, nearest) => {
  return Math.round(value / nearest) * nearest;
};

const CoOpBuyer = () => {
  const [values, setValues] = useState({
    // Default Values
    purchasePrice: 1500000,
    downPaymentPercentage: 20,
    downPaymentAmount: 300000,
    loanPercentage: 80,
    loanAmount: 1200000,
    attorneyFees: 3000,
    lienSearchFee: 350,
    bankAttorney: 1400,
    appraisal: 800,
    mortgageOriginationFee: 1500,
    ucc1: 125,
    applicationFees: 750,
    moveInFees: 500,
    transferFiling: 100,
    mansionTax: 0,
    isSponsorSale: false,
    nycTransferTaxes: 0,
    nysTransferTaxes: 0,
    sponsorAttorneyFees: 3000,
  });

  useEffect(() => {

    let calculatedMansionTax = 0;
    if (values.purchasePrice >= 25000000) {
      calculatedMansionTax = values.purchasePrice * 0.039;
    } else if (values.purchasePrice >= 20000000) {
      calculatedMansionTax = values.purchasePrice * 0.0375;
    } else if (values.purchasePrice >= 15000000) {
      calculatedMansionTax = values.purchasePrice * 0.035;
    } else if (values.purchasePrice >= 10000000) {
      calculatedMansionTax = values.purchasePrice * 0.0325;
    } else if (values.purchasePrice >= 5000000) {
      calculatedMansionTax = values.purchasePrice * 0.0225;
    } else if (values.purchasePrice >= 3000000) {
      calculatedMansionTax = values.purchasePrice * 0.015;
    } else if (values.purchasePrice >= 2000000) {
      calculatedMansionTax = values.purchasePrice * 0.0125;
    } else if (values.purchasePrice >= 1000000) {
      calculatedMansionTax = values.purchasePrice * 0.01;
    }
    calculatedMansionTax = roundToNearest(calculatedMansionTax, 1);
    setValues((prevValues) => ({
      ...prevValues,
      mansionTax: calculatedMansionTax,
    }));
  }, [values.purchasePrice, values.loanAmount]);

  useEffect(() => {
    if (!values.isSponsorSale) {
      setValues((prevValues) => ({
        ...prevValues,
        nycTransferTaxes: 0,
        nysTransferTaxes: 0,
        sponsorAttorneyFees: 0,
      }));
    } else {
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
        sponsorAttorneyFees: 3000,
      }));
    }
  }, [values.isSponsorSale, values.purchasePrice]);

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
          downPaymentAmount: Math.round(
            (parsedValue * prevValues.downPaymentPercentage) / 100
          ),
          loanAmount: Math.round(
            parsedValue - (parsedValue * prevValues.downPaymentPercentage) / 100
          ),
        }));
        break;
      case 'downPaymentPercentage':
        setValues((prevValues) => ({
          ...prevValues,
          downPaymentPercentage: parsedValue,
          downPaymentAmount: Math.round(
            (prevValues.purchasePrice * parsedValue) / 100
          ),
          loanAmount: Math.round(
            prevValues.purchasePrice -
              (prevValues.purchasePrice * parsedValue) / 100
          ),
          loanPercentage: 100 - parsedValue,
        }));
        break;
      case 'downPaymentAmount':
        setValues((prevValues) => ({
          ...prevValues,
          downPaymentAmount: parsedValue,
          downPaymentPercentage: Math.round(
            (parsedValue / prevValues.purchasePrice) * 100
          ),
          loanAmount: Math.round(prevValues.purchasePrice - parsedValue),
          loanPercentage:
            100 - Math.round((parsedValue / prevValues.purchasePrice) * 100),
        }));
        break;
      case 'loanPercentage':
        setValues((prevValues) => ({
          ...prevValues,
          loanPercentage: parsedValue,
          loanAmount: Math.round(
            (prevValues.purchasePrice * parsedValue) / 100
          ),
          downPaymentAmount: Math.round(
            prevValues.purchasePrice -
              (prevValues.purchasePrice * parsedValue) / 100
          ),
          downPaymentPercentage: 100 - parsedValue,
        }));
        break;
      case 'loanAmount':
        setValues((prevValues) => ({
          ...prevValues,
          loanAmount: parsedValue,
          downPaymentAmount: Math.round(prevValues.purchasePrice - parsedValue),
          downPaymentPercentage: Math.round(
            ((prevValues.purchasePrice - parsedValue) /
              prevValues.purchasePrice) *
              100
          ),
          loanPercentage:
            100 -
            Math.round(
              ((prevValues.purchasePrice - parsedValue) /
                prevValues.purchasePrice) *
                100
            ),
        }));
        break;
      case 'isSponsorSale':
        setValues((prevValues) => ({
          ...prevValues,
          isSponsorSale: newValue,
          nycTransferTaxes: newValue ? 0 : prevValues.nycTransferTaxes,
          nysTransferTaxes: newValue ? 0 : prevValues.nysTransferTaxes,
          sponsorAttorneyFees: newValue ? 0 : prevValues.sponsorAttorneyFees,
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

  // Function to calculate total closing costs
  const calculateTotalClosingCosts = () => {
    const {
      attorneyFees,
      lienSearchFee,
      bankAttorney,
      appraisal,
      mortgageOriginationFee,
      ucc1,
      applicationFees,
      moveInFees,
      transferFiling,
      mansionTax,
      nycTransferTaxes,
      nysTransferTaxes,
      sponsorAttorneyFees,
    } = values;

    const total =
      attorneyFees +
      lienSearchFee +
      bankAttorney +
      appraisal +
      parseFloat(mortgageOriginationFee) +
      ucc1 +
      applicationFees +
      moveInFees +
      transferFiling +
      parseFloat(mansionTax) +
      parseFloat(nycTransferTaxes) +
      parseFloat(nysTransferTaxes) +
      sponsorAttorneyFees;

    return total.toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // DISPLAY --------------------------------------------------|
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
        <h3>Loan</h3>
      </div>
      <div>
        <label>Down Payment Percentage: </label>
        <CurrencyInput
          suffix="%"
          decimalsLimit={0}
          value={values.downPaymentPercentage}
          onValueChange={(value) =>
            handleInputChange(value, 'downPaymentPercentage')
          }
        />
      </div>
      <div>
        <label>Down Payment Amount: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.downPaymentAmount}
          onValueChange={(value) =>
            handleInputChange(value, 'downPaymentAmount')
          }
        />
      </div>
      <div>
        <label>Loan Percentage: </label>
        <CurrencyInput
          suffix="%"
          decimalsLimit={0}
          value={values.loanPercentage}
          onValueChange={(value) => handleInputChange(value, 'loanPercentage')}
        />
      </div>
      <div>
        <label>Loan Amount: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.loanAmount}
          onValueChange={(value) => handleInputChange(value, 'loanAmount')}
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
      <div>
        <label>Lien Search Fee: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.lienSearchFee}
          onValueChange={(value) => handleInputChange(value, 'lienSearchFee')}
        />
      </div>
      <h3>Bank</h3>
      <div>
        <label>Bank Attorney: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.bankAttorney}
          onValueChange={(value) => handleInputChange(value, 'bankAttorney')}
        />
      </div>
      <div>
        <label>Appraisal: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.appraisal}
          onValueChange={(value) => handleInputChange(value, 'appraisal')}
        />
      </div>
      <div>
        <label>Mortgage Origination Fee: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.mortgageOriginationFee}
          onValueChange={(value) =>
            handleInputChange(value, 'mortgageOriginationFee')
          }
        />
      </div>
      <div>
        <label>UCC 1 Filing: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.ucc1}
          onValueChange={(value) =>
            handleInputChange(value, 'ucc1')
          }
        />
      </div>
      <h3>Building</h3>
      <div>
        <label>Application Fees/Credit Check: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.applicationFees}
          onValueChange={(value) => handleInputChange(value, 'applicationFees')}
        />
      </div>
      <div>
        <label>Move-in Fees/Deposit: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.moveInFees}
          onValueChange={(value) => handleInputChange(value, 'moveInFees')}
        />
      </div>
      <h3>Government & Title</h3>
      <div>
        <label>Transfer Tax Filing Fee: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.transferFiling}
          onValueChange={(value) => handleInputChange(value, 'transferFiling')}
        />
      </div>
      <div>
        <label>Mansion Tax: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={values.mansionTax}
          onValueChange={(value) => handleInputChange(value, 'mansionTax')}
        />
      </div>
      <div>
        <h3>New Development / Sponsor Sale</h3>
        <div>
          <input
            type="checkbox"
            checked={values.isSponsorSale}
            onChange={(e) =>
              handleInputChange(e.target.checked, 'isSponsorSale')
            }
          />
          <label>Sponsor Sale</label>
        </div>
        <fieldset disabled={!values.isSponsorSale}>
          <div>
            <label>NYC Transfer Taxes:</label>
            <CurrencyInput
              intlConfig={{ locale: 'en-US', currency: 'USD' }}
              value={values.isSponsorSale ? values.nycTransferTaxes : 0}
              onValueChange={(value) =>
                handleInputChange(value, 'nycTransferTaxes')
              }
            />
          </div>
          <div>
            <label>NYS Transfer Taxes:</label>
            <CurrencyInput
              intlConfig={{ locale: 'en-US', currency: 'USD' }}
              value={values.isSponsorSale ? values.nysTransferTaxes : 0}
              onValueChange={(value) =>
                handleInputChange(value, 'nysTransferTaxes')
              }
            />
          </div>
          <div>
            <label>Sponsor Attorney Fees:</label>
            <CurrencyInput
              intlConfig={{ locale: 'en-US', currency: 'USD' }}
              value={values.isSponsorSale ? values.sponsorAttorneyFees : 0}
              onValueChange={(value) =>
                handleInputChange(value, 'sponsorAttorneyFees')
              }
            />
          </div>
        </fieldset>
      </div>
      <h2>
        Total Closing Costs: {calculateTotalClosingCosts().toLocaleString()}
      </h2>
    </div>
  );
};

export default CoOpBuyer;
