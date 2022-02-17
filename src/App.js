import { useState } from "react";
import "./App.css";
import CheckBox from "./components/CheckBox";

function App() {
  const [password, setPassword] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    number: false,
    symbols: false,
  });
  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    console.log(password.uppercase);
    setPassword({
      ...password,
      uppercase: !password.uppercase,
    });
  };
  const handleChangeLowercase = () => {
    setPassword({
      ...password,
      lowercase: !password.lowercase,
    });
  };
  const handleChangeNumber = () => {
    setPassword({
      ...password,
      number: !password.number,
    });
  };
  const handleChangeSymbols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols,
    });
  };
  const setPasswordLength = (val) => {
    setPassword({
      ...password,
      length: val,
    });
  };
  const generatePassword = () => {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const charCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowercaseLetters = charCodes.map((letter) =>
      String.fromCharCode(letter)
    );
    const uppercaseLetters = lowercaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, number, symbols } = password;

    const generateWord = (length, uppercase, lowercase, number, symbols) => {
      const availableCharacters = [
        ...(uppercase ? uppercaseLetters : []),
        ...(lowercase ? lowercaseLetters : []),
        ...(number ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      console.log(shuffleArray(availableCharacters));
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(""));
      return characters;
    };
    generateWord(length, uppercase, lowercase, number, symbols);
  };
  return (
    <div className="wrapper">
      <div className="container wrapper-box">
        <h2>Password generator</h2>
        <div className="password-box">
          <input
            type="text"
            value={handleText}
            onChange={(e) => setHandleText(e.target.value)}
          />
          <button
            className="btn copy-button"
            onClick={() => {
              if (handleText.length > 0) {
                navigator.clipboard.writeText(handleText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 3000);
              }
            }}
          >
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </div>
        <br />
        <div className="word-criteria__box">
          <div>
            <label htmlFor=" "> Password length </label>
          </div>
          <div>
            {" "}
            <input
              type="number"
              name=""
              id=""
              value={password.length}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="word-criteria__box">
        <div>
          <label htmlFor=" "> Include uppercase letter </label>
        </div>
        <div>
          {" "}
          <CheckBox
            value={password.uppercase}
            onChange={handleChangeUppercase}
          />
        </div>
      </div>
      <div className="word-criteria__box">
        <div>
          <label htmlFor=" "> Include lowercase letter </label>
        </div>
        <div>
          {" "}
          <CheckBox
            value={password.lowercase}
            onChange={handleChangeLowercase}
          />
        </div>
      </div>
      <div className="word-criteria__box">
        <div>
          <label htmlFor=" "> Include Numbers </label>
        </div>
        <div>
          {" "}
          <CheckBox value={password.number} onChange={handleChangeNumber} />
        </div>
      </div>
      <div className="word-criteria__box">
        <div>
          <label htmlFor=" "> Include symbols </label>
        </div>
        <div>
          {" "}
          <CheckBox value={password.symbols} onChange={handleChangeSymbols} />
        </div>
      </div>
      <button className="btn btn-generator" onClick={generatePassword}>
        {" "}
        Password generate
      </button>
    </div>
  );
}

export default App;
