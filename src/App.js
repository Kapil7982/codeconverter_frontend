import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [code, setCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [debugOutput, setDebugOutput] = useState('');
  const [qualityOutput, setQualityOutput] = useState('');

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleConvertCode = async () => {
    try {
      const response = await axios.post('https://kapil7982.pythonanywhere.com/api/convert', {
        code,
        targetLanguage,
      });
      console.log(response.data)
      setOutput(response.data.output.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDebugCode = async () => {
    try {
      const response = await axios.post('https://kapil7982.pythonanywhere.com/api/debug', {
        code,
        targetLanguage,
      });
      console.log(response.data.debuggingOutput)
      setDebugOutput(response.data.debuggingOutput);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQualityCheck = async () => {
    try {
      const response = await axios.post('https://kapil7982.pythonanywhere.com/api/quality', {
        code,
        targetLanguage,
      });
      console.log(response.data.qualityOutput)
      setQualityOutput(response.data.qualityOutput);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <select value={targetLanguage} onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
          <option value="ruby">Ruby</option>
        </select>
        <button onClick={handleConvertCode}>Convert Code</button>
        <button id="debugCode" onClick={handleDebugCode}>Debug</button>
        <button id="checkQuality" onClick={handleQualityCheck}>Quality Check</button>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder="Enter your code here..."
          rows={10}
          cols={80}
        />
      </div>
      <div className="right-section">
        <h3>Converted Code:</h3>
        <pre className="output">{output}</pre>

        <h3>Debugging Output:</h3>
        <pre className="output">{debugOutput.content}</pre>

        <h3>Quality Check Output:</h3>
        <pre className="output">{qualityOutput.content}</pre>
      </div>
    </div>
  );
};

export default App;
