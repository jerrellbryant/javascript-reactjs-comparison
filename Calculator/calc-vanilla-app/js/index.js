 /*
        1. Put together an HTML form with 3 input fields and a submit button
        2. Add validation to ensure that only positive integers can be entered
        3. Add logic so that when the submit button is clicked, it calculates the
         average and the median of the entered values, and display those back to the user
    
    */

  const form = document.getElementById('math-form');

  const average = (val1, val2, val3) => { 
      return (val1 + val2 + val3) / 3
    }

  const median = arr => {
      const med = Math.floor(arr.length / 2)
        nums = [...arr].sort((a, b) => a - b)
       return arr.length % 2 !== 0 ? nums[med]: (nums[med - 1] + nums[med]) / 2
  }


  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const val1 = parseFloat(document.getElementById('value1').value),
          val2 = parseFloat(document.getElementById('value2').value),
          val3 = parseFloat(document.getElementById('value3').value);

    const aver_val = average(val1, val2, val3);
    const med_val = median([val1, val2, val3]);

    document.getElementById('average').innerHTML = aver_val;
    document.getElementById('median').innerHTML = med_val;

  })