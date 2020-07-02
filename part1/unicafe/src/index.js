import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};



const App = () => {

    
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState(0)

const setToGood = newValue =>() => {
    setAll(allFeedback + 1)
    setGood(newValue);
    console.log(good)
};

const setToNeutral= newValue => () => {
    setAll(allFeedback + 1);
    setNeutral(newValue);
    console.log(neutral);

};

const setToBad = newValue => ()=>{
    setAll(allFeedback + 1);
    setBad(newValue);
    console.log(bad);
};

const average =  (good - bad) / allFeedback


const positive = (good/allFeedback) * 100 

const Statistics = (props) => {
  const { text, value } = props;
  if (allFeedback === 0) {
    return  <p>No feedback given</p>
  } else {
  return (
      <>
          
              <tbody>
                  <tr>
                      <td>{text} </td>
                      <td> {value}</td>
                  </tr>
              </tbody>

      </>
  );
  }
};


if (allFeedback === 0 ) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={setToGood(good + 1)} text='good' />
        <Button handleClick={setToNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={setToBad(bad + 1)} text='bad' />

        <h1>statistics</h1>
        <p> No feedback given</p>
      </div>
    );
} else {

  return (
    <div>
        
      <h1>give feedback</h1>
      <Button handleClick={setToGood(good + 1)} text='good' />
      <Button handleClick={setToNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={setToBad(bad + 1)} text='bad' />
      <h1>statistics</h1>

<table>
      <Statistics text='good' value={good}></Statistics>
      <Statistics text='neutral' value={neutral}></Statistics>
      <Statistics text='bad' value={bad}></Statistics>
      <Statistics text='all' value={allFeedback}></Statistics>
      <Statistics text='average' value={average}></Statistics>
      <Statistics text='positive' value={positive}></Statistics>
      </table>
    </div>
  );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));

