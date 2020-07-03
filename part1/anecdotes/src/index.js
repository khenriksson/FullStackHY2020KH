import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(
      new Array(anecdotes.length + 1).join("0").split("").map(parseFloat)
  );
  const [maxIndex, setIndex] = useState(0)



  const setRandom =  () => {
      const rand = Math.floor(Math.random() * anecdotes.length);
      setSelected(rand);
  };

  const vote = () => {
      const copy = [...votes]
      copy[selected]++
      setVote(copy)
      mostVotesIndex()

  }

  const mostVotesIndex = () => {
      const indexOfMaxValue = votes.reduce(
          (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
          0,
      );

     setIndex(indexOfMaxValue);
  }

  return (
      <div>
          <h1>Anecdote of the day</h1>
          {props.anecdotes[selected]} <br />
          <p>has {votes[selected]} votes</p>
          <Button handleClick={setRandom} text="next anecdote" />
          <Button handleClick={vote} text="vote" />
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[maxIndex]}</p>
      </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)