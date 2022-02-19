const SaveBtn = props => {
    return (
    <button onClick={props.saveBtn}>
      Save Lead
    </button>
    )
}

const TabBtn = props => {
  return (
  <button onClick={props.tabBtn}>
    Save Tab
    </button>
    )
}

const DeleteBtn = props => {
    return (
      <button className="delete-btn" onClick={props.deleteBtn}>
        Delete Leads
      </button>
    );
}

const DisplayBtn = props => {
  return (
  <button onClick={props.displayBtn}>
    Display Leads
    </button>
  )
};

export {SaveBtn, DeleteBtn, DisplayBtn, TabBtn}