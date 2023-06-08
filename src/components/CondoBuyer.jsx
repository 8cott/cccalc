import { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

const CondoBuyer = () => {
  const [purchasePrice, setPurchasePrice] = useState(1500000);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);
  const [loanPercentage, setLoanPercentage] = useState(80);
  const [downPaymentAmount, setDownPaymentAmount] = useState(300000);
  const [loanAmount, setLoanAmount] = useState(1200000);
  const [attorneyFees, setAttorneyFees] = useState(3000);
  const [bankApplication, setBankApplication] = useState(500);
  const [bankAttorney, setBankAttorney] = useState(1250);
  const [appraisal, setAppraisal] = useState(500);
  const [mortgageRecordingTax, setMortgageRecordingTax] = useState(0);
  const [mortgageOriginationFee, setMortgageOriginationFee] = useState(0);
  const [applicationFees, setApplicationFees] = useState(750);
  const [moveInFees, setMoveInFees] = useState(500);
  const [titleInsurance, setTitleInsurance] = useState((purchasePrice * 0.0045).toFixed(2));
  const [recordingFees, setRecordingFees] = useState(250);
  const [municipalSearches, setMunicipalSearches] = useState(400);
  const [residentialDeedTransfersTitle, setResidentialDeedTransfersTitle] = useState(75);
  const [feeCloser, setFeeCloser] = useState(300);
  const [mansionTax, setMansionTax] = useState(0);
  
  useEffect(() => {
    const calculatedRecordingTax =
      loanAmount < 500000 ? (loanAmount * 0.018) : (loanAmount * 0.01925);
    setMortgageRecordingTax(calculatedRecordingTax);

    const calculatedOriginationFee = loanAmount * 0.0075;
    setMortgageOriginationFee(calculatedOriginationFee);

    const calculatedTitleInsurance = (purchasePrice * 0.0045).toFixed(2);
    setTitleInsurance(calculatedTitleInsurance);

    let calculatedMansionTax = 0;
    if (purchasePrice >= 25000000) {
      calculatedMansionTax = purchasePrice * 0.039;
    } else if (purchasePrice >= 20000000) {
      calculatedMansionTax = purchasePrice * 0.0375;
    } else if (purchasePrice >= 15000000) {
      calculatedMansionTax = purchasePrice * 0.035;
    } else if (purchasePrice >= 10000000) {
      calculatedMansionTax = purchasePrice * 0.0325;
    } else if (purchasePrice >= 5000000) {
      calculatedMansionTax = purchasePrice * 0.0225;
    } else if (purchasePrice >= 3000000) {
      calculatedMansionTax = purchasePrice * 0.015;
    } else if (purchasePrice >= 2000000) {
      calculatedMansionTax = purchasePrice * 0.0125;
    } else if (purchasePrice >= 1000000) {
      calculatedMansionTax = purchasePrice * 0.01;
    }
    setMansionTax(calculatedMansionTax.toFixed(2));
  }, [purchasePrice, loanAmount]);

  const handlePurchasePriceChange = (value) => {
    setPurchasePrice(value);
    recalculateValues(value, downPaymentPercentage);
  };

  const handleDownPaymentPercentageChange = (value) => {
    setDownPaymentPercentage(value);
    setLoanPercentage(100 - value);
    const calculatedDownPayment = (value / 100) * purchasePrice;
    setDownPaymentAmount(calculatedDownPayment);
    const calculatedLoan = purchasePrice - calculatedDownPayment;
    setLoanAmount(calculatedLoan);
  };

  const handleDownPaymentAmountChange = (value) => {
    setDownPaymentAmount(value);
    const calculatedPercentage = (value / purchasePrice) * 100;
    setDownPaymentPercentage(calculatedPercentage);
    const calculatedLoan = purchasePrice - value;
    setLoanAmount(calculatedLoan);
    setLoanPercentage(100 - calculatedPercentage);
  };

  const handleLoanPercentageChange = (value) => {
    setLoanPercentage(value);
    setDownPaymentPercentage(100 - value);
    const calculatedLoan = (value / 100) * purchasePrice;
    setLoanAmount(calculatedLoan);
    const calculatedDownPayment = purchasePrice - calculatedLoan;
    setDownPaymentAmount(calculatedDownPayment);
  };

  const handleLoanAmountChange = (value) => {
    setLoanAmount(value);
    const calculatedDownPayment = purchasePrice - value;
    setDownPaymentAmount(calculatedDownPayment);
    const calculatedPercentage = (calculatedDownPayment / purchasePrice) * 100;
    setDownPaymentPercentage(calculatedPercentage);
    setLoanPercentage(100 - calculatedPercentage);
  };

  const recalculateValues = (newPurchasePrice, newDownPaymentPercentage) => {
    const calculatedDownPayment = (newDownPaymentPercentage / 100) * newPurchasePrice;
    setDownPaymentAmount(calculatedDownPayment);
    const calculatedLoan = newPurchasePrice - calculatedDownPayment;
    setLoanAmount(calculatedLoan);
    setLoanPercentage(100 - newDownPaymentPercentage);
  };

  const handleAttorneyFeesChange = (value) => {
    setAttorneyFees(value);
  };
  
  const handleBankApplicationChange = (value) => {
    setBankApplication(value);
  };

  const handleBankAttorneyChange = (value) => {
    setBankAttorney(value);
  };

  const handleAppraisalChange = (value) => {
    setAppraisal(value);
  };
  
  const handleMortgageRecordingTaxChange = (value) => {
    setMortgageRecordingTax(value);
  };
  
  const handleMortgageOriginationFeeChange = (value) => {
    setMortgageOriginationFee(value);
  };
  
  const handleApplicationFeesChange = (value) => {
    setApplicationFees(value);
  };
  
  const handleMoveInFeesChange = (value) => {
    setMoveInFees(value);
  };
  
  const handleRecordingFeesChange = (value) => {
    setRecordingFees(value);
  };
  
  const handleMunicipalSearchesChange = (value) => {
    setMunicipalSearches(value);
  };
  
  const handleResidentialDeedTransfersTitleChange = (value) => {
    setResidentialDeedTransfersTitle(value);
  };
  
  const handleFeeCloserChange = (value) => {
    setFeeCloser(value);
  };
  
  const handleMansionTaxChange = (value) => {
    setMansionTax(value);
  };

  
  return (
    <div>
      <h2>Closing Costs Calculator</h2>
      <div>
        <label>Purchase Price: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          decimalsLimit={0}
          value={purchasePrice}
          onValueChange={(value) => handlePurchasePriceChange(value)}
        />
      </div>
      <div>
        <label>Down Payment Percentage: </label>
        <CurrencyInput
          suffix="%"
          decimalsLimit={0}
          value={downPaymentPercentage}
          onValueChange={(value) => handleDownPaymentPercentageChange(value)}
        />
      </div>
      <div>
        <label>Down Payment Amount: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={downPaymentAmount}
          onValueChange={(value) => handleDownPaymentAmountChange(value)}
        />
      </div>
      <div>
        <label>Loan Percentage: </label>
        <CurrencyInput
          suffix="%"
          decimalsLimit={0}
          value={loanPercentage}
          onValueChange={(value) => handleLoanPercentageChange(value)}
        />
      </div>
      <div>
        <label>Loan Amount: </label>
        <CurrencyInput
          intlConfig={{ locale: 'en-US', currency: 'USD' }}
          value={loanAmount}
          onValueChange={(value) => handleLoanAmountChange(value)}
        />
      </div>

    <h3>Attorney</h3>
    <label>Attorney Fees: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={attorneyFees}
      onValueChange={(value) => handleAttorneyFeesChange(value)}
    />
     <h3>Bank</h3>
        <div>
          <label>Bank Application: </label>
          <CurrencyInput
            intlConfig={{ locale: 'en-US', currency: 'USD' }}
            value={bankApplication}
            onValueChange={(value) => handleBankApplicationChange(value)}
          />
        </div>
        <div>
          <label>Bank Attorney: </label>
          <CurrencyInput
            intlConfig={{ locale: 'en-US', currency: 'USD' }}
            value={bankAttorney}
            onValueChange={(value) => handleBankAttorneyChange(value)}
          />
        </div>
        <div>
          <label>Appraisal: </label>
          <CurrencyInput
            intlConfig={{ locale: 'en-US', currency: 'USD' }}
            value={appraisal}
            onValueChange={(value) => handleAppraisalChange(value)}
          />
        </div>
        <div>
        <label>Mortgage Recording Tax: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={mortgageRecordingTax}
      onValueChange={(value) => handleMortgageRecordingTaxChange(value)}
    />
        </div>
        <div>
        <label>Mortgage Origination Fee: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={mortgageOriginationFee}
      onValueChange={(value) => handleMortgageOriginationFeeChange(value)}
    />
        </div>
        <h3>Building</h3>
  <div>
    <label>Application Fees/Credit Check: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={applicationFees}
      onValueChange={(value) => handleApplicationFeesChange(value)}
    />
  </div>
  <div>
    <label>Move-in Fees/Deposit: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={moveInFees}
      onValueChange={(value) => handleMoveInFeesChange(value)}
    />
  </div>
  <h3>Government & Title</h3>
  <div>
    <label>Title Insurance: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={titleInsurance}
      onValueChange={(value) => setTitleInsurance(value)}
    />
  </div>
  <div>
    <label>Recording Fees: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={recordingFees}
      onValueChange={(value) => handleRecordingFeesChange(value)}
    />
  </div>
  <div>
    <label>Municipal Searches: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={municipalSearches}
      onValueChange={(value) => handleMunicipalSearchesChange(value)}
    />
  </div>
  <div>
    <label>Residential Deed Transfers Title: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={residentialDeedTransfersTitle}
      onValueChange={(value) => handleResidentialDeedTransfersTitleChange(value)}
    />
  </div>
  <div>
    <label>Fee Closer: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={feeCloser}
      onValueChange={(value) => handleFeeCloserChange(value)}
    />
  </div>
  <div>
    <label>Mansion Tax: </label>
    <CurrencyInput
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      value={mansionTax}
      onValueChange={(value) => handleMansionTaxChange(value)}
    />
  </div>
      </div>
  );
};

export default CondoBuyer;