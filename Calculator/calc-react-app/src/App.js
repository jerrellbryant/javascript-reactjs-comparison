import {useState} from "react";
import './App.css';
import Results from "./components/Results"

function App() {
  const [min] = useState(0);
  const [calcMed, setCalcMed] = useState(0);
  const [CalcAvg, setCalcAvg] = useState(0);

  const [inputValue, setInputValue] = useState({
    val1: 0,
    val2: 0,
    val3: 0,
  });

  const handleChange = event => {
    const {name, value} = event.target;
    setInputValue(prev => {
      return {
        ...prev,
        [name]: parseFloat(value)
      }
    })

  }

  const average = () => {
    const avg = (inputValue.val1 + inputValue.val2 + inputValue.val3) / 3;

     setCalcAvg(avg);
  }

  const median = () => {
      const arr = [inputValue.val1, inputValue.val2, inputValue.val3]
      const med = Math.floor(arr.length /2)
      const nums = [...arr].sort((a, b) => a-b)
      const result = arr.length % 2 !== 0 ? nums[med] : (nums[med - 1] + nums[med]) / 2
      
       setCalcMed(result);
  };

  const handleSubmit = event => {
    event.preventDefault()
    average()
    median()

  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit} className="form">
          <input
            name="val1"
            value={inputValue.val1}
            type="number"
            min={min}
            onChange={handleChange}
            required
          />
          <input
            name="val2"
            value={inputValue.val2}
            type="number"
            min={min}
            onChange={handleChange}
            required
          />
          <input
            name="val3"
            value={inputValue.val3}
            type="number"
            min={min}
            onChange={handleChange}
            required
          />
          <button onSubmit={handleSubmit} type="submit">
            Calculate
          </button>
        </form>
        <Results average={CalcAvg} median={calcMed} />
      </div>
    </main>
  );
}

export default App;
