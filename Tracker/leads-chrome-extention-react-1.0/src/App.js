/*global chrome*/

import { useState } from "react";
import List from "./components/List";
import { SaveBtn, DeleteBtn, DisplayBtn, TabBtn } from "./components/Buttons";

function App() {
  const [myLeads, setMyLeads] = useState([]);
  const [leadValue, setLeadValue] = useState({
    inputVal: "",
  });

  //these items are used for  the state of localStorage
  const [display, setDisplay] = useState(false);

  // Retrieves from localStorage using key "localValue" or returns
  // the default array if nothing in localStorage, and parses the JSON.
  // This is for input values saved to localstorage
  const localStoredValues = JSON.parse(
    localStorage.getItem("localValue") || "[]"
  );

  // passing all localStoredValues items from localStorage and includes new value from input field
  // then assigning to updateLocalArray
  let updateLocalArray = [...localStoredValues, leadValue.inputVal];

  // Retrieves from localStorage using key "URLValue" or returns
  // the default array if nothing in localStorage, and parses the JSON.
  //This is for URLs saved to localstorage
  const URLStoredVAlues = JSON.parse(localStorage.getItem("URLValue") || "[]");

  const tabBtn = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      setMyLeads((prev) => [...prev, url]);

      // passing all URLStoredValues items from localStorage and includes new value from url(current url)
      // then assigning to updateURLArray
      let updateURLArray = [...URLStoredVAlues, url];

      //passes a key (URLValue) and value (updateURLArray) to store in localStorage, 
      //and stringify(). Above using getItem(URValue) I retrieve the value updateURLArray from
      //localStorage
      localStorage.setItem("URLValue", JSON.stringify(updateURLArray));
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

    //passes a key (localValue) and value (updateLocalArray) to store in localStorage,
    //and stringify(). Above using getItem(localValue) I retrieve the value updateLocalArray from
    //localStorage
    localStorage.setItem("localValue", JSON.stringify(updateLocalArray));
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

  const displayTabUrls = URLStoredVAlues.map((url) => {
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

export default App;
