
let myLeads = [];
const saveButton = document.querySelector(".input-btn"),
  deleteButton = document.querySelector(".delete-btn"),
  saveTabButton = document.querySelector(".tab-btn"),
  displayButton = document.querySelector(".display-btn"),
  input = document.querySelector(".input-el"),
  ulEl = document.querySelector(".ul-el"),
  leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
}

 saveTabButton.addEventListener("click", () => {

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })

  
 })


/* when called renderLeads() will loop through myLeads array
    then add the input text to listItems variable, which is then 
    given the value to the ul element innerHTML
*/
const render = leads => {
let listItems = " ";
  for (const lead of leads) {
    listItems += `
        <li>
            <a href="${lead}" target="_blank">
                ${lead}
            </a>
        </li>`;
  }
  ulEl.innerHTML = listItems;
};

  /* when the button is clicked the text renderLeads() will be called
    and the text will be stored in myLeads array
*/
  saveButton.addEventListener("click", () => {
    myLeads.push(input.value);
    input.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });

  deleteButton.addEventListener("click", () => {
    myLeads = [];
    localStorage.clear();
    render(myLeads);
  })

  displayButton.addEventListener("click", () => {
    render(myLeads);
  });
