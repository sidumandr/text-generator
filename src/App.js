import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { React, useEffect, useState } from "react";
import { fetchParagraphs } from "./redux/textSlice";

function App() {
  const [inputValue, setInputValue] = useState(4);
  const [selectedFormat, setSelectedFormat] = useState("text");
  const dispatch = useDispatch();

  const paragraphs = useSelector((state) => state.text.paragraphs);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue > 0) {
      dispatch(fetchParagraphs({ count: inputValue, format: selectedFormat }));
    }
  }, [inputValue, selectedFormat, dispatch]);

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  return (
    <div className="App">
      <h1>TEXT GENERATOR</h1>
      <div className="controls">
        <label htmlFor="count">Paragraf Sayısı:</label>
        <input
          type="number"
          value={inputValue}
          min="1"
          onChange={handleInputChange}
        />

        <select value={selectedFormat} onChange={handleFormatChange}>
          <option value="text">Text</option>
          <option value="html">HTML</option>
        </select>
      </div>
      <div>
        {selectedFormat === "html"
          ? paragraphs.map((paragraph, i) => (
              <div
                key={i}
                dangerouslySetInnerHTML={{ __html: `<p> ${paragraph} </p>` }}
              />
            ))
          : paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </div>
    </div>
  );
}

export default App;
