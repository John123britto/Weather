import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState([
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
    'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Visakhapatnam', 'Indore', 'Thane', 'Bhopal', 'Patna', 'Vadodara', 'Ghaziabad'
  ]);
  const [text1, setText1] = useState();
  const [n, setSel] = useState('');
  const [res, setRes] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const a = '970653275695282b9229feed041f984d';

  const getTemperatureClass = (temp) => {
    if (temp < 10) return 'veryCold';
    if (temp < 20) return 'cold';
    if (temp < 30) return 'moderate';
    if (temp < 40) return 'warm';
    return 'hot';
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=${a}&units=metric`);
        if (response.ok) {
          const data = await response.json();
          setText1(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (n) {
      fetchWeather();
    }
  }, [n]);

  const onChange2 = () => {
    setRes(n);
    setButtonClicked(true);
  };

  const onChange1 = (event) => {
    setSel(event.target.value);
  };

  return (
    <div className="App">
      <h1>Weather</h1>
      <select value={n} onChange={onChange1}>
        {text.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={onChange2}>Click</button>

      {buttonClicked && text1 && (
        <div className={`smallBox ${getTemperatureClass(text1.main.temp)}`}>
          {text1.main.temp} °C
        </div>
      )}
    </div>
  );
}

export default App;
