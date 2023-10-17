import './App.css';
import React, { useState } from 'react';

function App() {
  const [userNumbers, setUserNumbers] = useState({
    userList: new Array(20).fill(null),
    currentNumber: randNumber(),
    currentLocationRequest: 0,
  });

  const addNumberToList = (location, number) => {
    setUserNumbers((prevUserNumbers) => {
      const updatedUserList = [...prevUserNumbers.userList];
      updatedUserList[location] = number;
      
      const isOrdered = testIfOrdered(updatedUserList);

      // Give a new number
      const newNumber = randNumber();
      
      return { ...prevUserNumbers, userList: updatedUserList, currentNumber: newNumber, isOrdered };
    });
  };

  const setRequestedLocation = (location) => {
    setUserNumbers((prevUserNumbers) => ({ ...prevUserNumbers, currentLocationRequest: location }));
  };

  // Get rid of nulls and check if the list is ordered
  const testIfOrdered = (numberedList) => {
    const filteredList = numberedList.filter((item) => item !== null);
    for (let i = 0; i < filteredList.length - 1; i++) {
      if (filteredList[i] > filteredList[i + 1]) {
        return false; // The list is not ordered
      }
    }
    return true; // The list is ordered
  };

  const orderedMessage = (isOrdered) => {
    return isOrdered ? 'Your list is ordered' : 'Your list is no longer ordered';
  };

  return (
    <div className="App">
      <h1>Random Number Challenge!</h1>
      <b>Random Number: {userNumbers.currentNumber}</b>
      <p><b>{orderedMessage(userNumbers.isOrdered)}</b></p>
      <MyForm addNumberToList={addNumberToList} setRequestedLocation={setRequestedLocation} userList={userNumbers.userList} currentNumber={userNumbers.currentNumber} />
    </div>
  );
}

const MyForm = ({ addNumberToList, setRequestedLocation, userList, currentNumber }) => {
  const [location, setLocation] = useState('');

  const handleChangeLocation = (event) => {
    const newLocation = event.target.value;

    if (newLocation >= 1 && newLocation <= 20) {
      setLocation(newLocation);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (location !== null && location !== '') {
      const locationIndex = Number(location) - 1;
      addNumberToList(locationIndex, currentNumber);
      setLocation(''); // Clear
      setRequestedLocation(locationIndex);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>Location (1-20):</label>
        <input
          type="number"
          min="1"
          max="20"
          value={location}
          onChange={handleChangeLocation}
        />
      </p>
      <p>
        <button type="submit">Submit</button>
      </p>
      <ul>
        {userList.map((item, index) => (
          <li key={index}>{index + 1}: {item !== null ? item : ''}</li>
        ))}
      </ul>
    </form>
  );
};

function randNumber() {
  const randomInteger = Math.floor(Math.random() * 1000) + 1;
  return randomInteger;
}

export default App;

