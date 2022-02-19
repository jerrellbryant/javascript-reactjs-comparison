const List = props => {
    return (
      <li>
        <a href={props.val} target="_blank" rel="noreferrer">
          {props.val}
        </a>
      </li>
    );
}

export default List