import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { wordList } from "./wordList.js";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [word, setWord] = useState({nl:"", pl:""});  // zapytać o podkreślanie word.nl
  const [summary, setSummary] = useState<string>("Powodzenia!");
  const [secondSubmit, setSecondSubmit] = useState<boolean>(false);
  useEffect(() => {setWord(drawRandomWord(wordList))}, []);


const changeText = (newText: string) => {
  setInputText(newText);
}
  
  const verifyWord = (e: any, inputText: string) => {
    e.preventDefault();
    console.log(word.nl)
    const positiveAnswer = checkAnswer(inputText, word.nl);

    if (positiveAnswer && secondSubmit) {
      setWord(drawRandomWord(wordList));
      setSecondSubmit(false);
      setSummary("Powodzenia!");
      setInputText("");
    } else if (positiveAnswer) {
      setSecondSubmit(true);
      setSummary("BRAWO! Prawidłowa odpowiedź!");
    } else {
      setSummary("Spróbuj jeszcze raz, pierwsza litera słowa to: " + word.nl[0] + ".");
      setInputText("");
    }
  }

  const checkAnswer = (inputText:string, word:string) => {
    return (inputText === word);
  }
  
  // jak zatypować tablice obiektów
  const drawRandomWord = (wordList:any) => {
    const random = Math.floor(Math.random() * wordList.length);
    return wordList[random];
  }

  return (
    <div className="App">
      <p>Wpisz po holendersku: {word.pl}</p>
      <form onSubmit={(e) =>verifyWord(e, inputText)}>
        <input type="text"
          placeholder="Wpisz odpowiedź"
          value={inputText}
          onChange={(e) => changeText(e.target.value)}>
        </input>
      </form>
    <p>{summary}</p>
    </div>
  );
}

export default App;
