import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(20);
  const [hasLower, setHasLower] = useState<boolean>(true);
  const [hasUpper, setHasUpper] = useState<boolean>(true);
  const [hasNumber, setHasNumber] = useState<boolean>(true);
  const [hasSymbol, setHasSymbol] = useState<boolean>(true);

  const getRandomLower = (): string =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);

  const getRandomUpper = (): string =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);

  const getRandomNumber = (): string =>
    String.fromCharCode(Math.floor(Math.random() * 10) + 48);

  const getRandomSymbol = (): string => {
    const symbols: string = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  type RandomFunc = {
    [key: string]: () => string;
  };

  const randomFunc: RandomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  const handleGenerate = (): void => {
    setPassword(
      generatePassword(
        Number(hasLower),
        Boolean(hasUpper),
        Boolean(hasNumber),
        Boolean(hasSymbol),
        Boolean(length)
      )
    );
  };

  const handleCopyToClipboard = (): void => {
    if (!password) return;

    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const handleLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setLength(parseInt(event.target.value));

  const handleLowerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setHasLower(event.target.checked);

  const handleUpperChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setHasUpper(event.target.checked);

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setHasNumber(event.target.checked);

  const handleSymbolChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setHasSymbol(event.target.checked);


  const generatePassword = (
    length: number,
    lower: boolean,
    upper: boolean,
    number: boolean,
    symbol: boolean
  ): string => {
    let generatedPassword: string = "";
    const typesCount: number =
      (lower ? 1 : 0) + (upper ? 1 : 0) + (number ? 1 : 0) + (symbol ? 1 : 0);
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );
  
    if (typesCount === 0) return "";
  
    for (let i = 0; i < length; i++) {
      const randomTypeIndex = Math.floor(Math.random() * typesArr.length);
      const type = typesArr[randomTypeIndex];
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    }
  
    return generatedPassword;
  };
  

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="card">
        <div className="form-group">
          <label htmlFor="length">Password length</label>
          <input
            type="number"
            id="length"
            name="length"
            value={length}
            min="8"
            max="40"
            onChange={handleLengthChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lower">Include lowercase letters</label>
          <input
            type="checkbox"
            id="lower"
            name="lower"
            checked={hasLower}
            onChange={handleLowerChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="upper">Include uppercase letters</label>
          <input
            type="checkbox"
            id="upper"
            name="upper"
            checked={hasUpper}
            onChange={handleUpperChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Include numbers</label>
          <input
            type="checkbox"
            id="number"
            name="number"
            checked={hasNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="symbol">Include symbols</label>
          <input
            type="checkbox"
            id="symbol"
            name="symbol"
            checked={hasSymbol}
            onChange={handleSymbolChange}
          />
        </div>
        <button className="btn generate-btn" onClick={handleGenerate}>
          Generate Password
        </button>
        {password && (
          <div className="form-group">
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              readOnly
            />
            <button
              className="btn copy-btn"
              onClick={handleCopyToClipboard}
              title="Copy to clipboard"
            ></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
