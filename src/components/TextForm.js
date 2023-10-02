import React, { useState, useEffect } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    // Initialize the SpeechSynthesisUtterance and SpeechSynthesis objects
    const synth = window.speechSynthesis;
    const msg = new SpeechSynthesisUtterance();
    setSpeechSynthesis(synth);

    msg.onend = () => {
      // Speech has ended
      setSpeaking(false);
    };

    return () => {
      // Cleanup and cancel speaking when the component unmounts
      if (speechSynthesis && speaking) {
        speechSynthesis.cancel();
        setSpeaking(false);
      }
    };
  }, [speaking, speechSynthesis]);

  const handleUpClick = () => {
    const newText = text.toUpperCase();
    setText(newText);
    props.showAlert('Converted to uppercase!', 'success');
  };

  const handleLoClick = () => {
    const newText = text.toLowerCase();
    setText(newText);
    props.showAlert('Converted to lowercase!', 'success');
  };

  const handleClearClick = () => {
    setText('');
    props.showAlert('Text Cleared!', 'success');
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert('Copied to Clipboard!', 'success');
  };

  const handleExtraSpaces = () => {
    const newText = text.split(/[ ]+/);
    setText(newText.join(' '));
    props.showAlert('Extra spaces removed!', 'success');
  };

  const speak = () => {
    if (speechSynthesis && !speaking) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = text;
      speechSynthesis.speak(msg);
      setSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis && speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return (
    <>
      <div className="container my-3">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            id="myBox"
            placeholder="Please enter a text here"
            onChange={handleOnChange}
            rows="8"
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          Convert to Lowercase
        </button>
        <button
          disabled={text.length === 0}
          type="submit"
          onClick={speak}
          className="btn btn-warning mx-1"
        >
          Speak
        </button>
        {speaking && (
          <button
            type="submit"
            onClick={stopSpeaking}
            className="btn btn-danger mx-1"
          >
            Stop
          </button>
        )}
        <button
          disabled={text.length === 0}
          type="submit"
          onClick={handleClearClick}
          className="btn btn-warning mx-2"
        >
          Clear
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
        >
          Copy Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>
      </div>

      <div className="container my-3">
        <h2>Your Text Summary here:</h2>
        <p>
          {text.split(/\s+/).filter((element) => element.length !== 0).length}{' '}
          Words and {text.length} Characters
        </p>
        <p>{0.008 * text.split(' ').length} Minutes read</p>
        <h3>Preview Text:</h3>
        <p className="container preview">{text}</p>
      </div>
    </>
  );
}
