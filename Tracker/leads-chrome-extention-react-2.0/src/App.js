/*global chrome*/

import {useState} from 'react';
import List from './components/List'
import { SaveBtn, DeleteBtn, DisplayBtn, TabBtn} from "./components/Buttons"


function App() {
  const [myLeads, setMyLeads] = useState([]);
  const [leadValue, setLeadValue] = useState({
    inputVal: "",
  });

  //these items are used for  the state of localStorage
  const [display, setDisplay] = useState(false)

  // set localStorage keys as constants
  const LOCAL_VALUE = "localValue"
  const URL_VALUE = "URLValue"

  // getLocalValue() is a utility function that retrieves from localStorage or returns
  // the default array if nothing in localStorage, and parses the JSON
  function getLocalValue(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  // retrieve localStorage using the keys declared above "localValue" and "URLValue"
  const localStoredValues = getLocalValue(LOCAL_VALUE);
  const URLStoredValues = getLocalValue(URL_VALUE);

  // passing all localStoredValues items from localStorage and includes new value from input field
  // then assigning to updateLocalArray
  let updateLocalArray = [...localStoredValues, leadValue.inputVal];

  // setLocalValue() is a utility function that passes a key and value which can later be used
  //to retrieve localStorage items
  function setLocalValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const tabBtn = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      setMyLeads((prev) => [...prev, url]);

      // passing all URLStoredValues items from localStorage and includes new value from url(current url)
      // then assigning to updateURLArray
      let updateURLArray = [...URLStoredValues, url];

      //using setLocalValue() utility function to pass key (URL_VALUE) and value (updateURLArray)
      setLocalValue(URL_VALUE, updateURLArray);
    });
    setDisplay(false);
  };

  //handles change of input value
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLeadValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveBtn = () => {
    setMyLeads((prev) => [...prev, leadValue.inputVal]);
    setDisplay(false);

    //using setLocalValue() utility function to pass key (LOCAL_VALUE) and value (updateLocalArray)
     setLocalValue(LOCAL_VALUE, updateLocalArray);
  };

  const displayBtn = () => {
    setDisplay(true);
  };

  const deleteBtn = () => {
    window.localStorage.clear();
    setMyLeads([]);
  };

  const listItem = myLeads.map((led) => {
    return <List key={led} val={led} />;
  });

  //interates through localStorage items returns each as undordered list item
  const displayLocalItems = localStoredValues.map((item) => {
    return <List key={item} val={item} />;
  });

  const displayTabUrls = URLStoredValues.map((url) => {
    return <List key={url} val={url} />;
  });

  return (
    <main>
      <input
        name="inputVal"
        value={leadValue.inputVal}
        type="text"
        onChange={handleChange}
        required
      />

      <SaveBtn saveBtn={saveBtn} />
      <TabBtn tabBtn={tabBtn} />
      <DisplayBtn displayBtn={displayBtn} />
      <DeleteBtn deleteBtn={deleteBtn} />

      <ul>{listItem}</ul>

      {/* displays === true show localstorage items in unordered list 
          else hide localstorage items */}
      {display && (
        <ul>
          {displayLocalItems}
          {displayTabUrls}
        </ul>
      )}
    </main>
  );
}

export default App