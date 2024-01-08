function LangComp(props) {
    return (
      <option key={props.code} value={props.code}>
        {props.name}
      </option>
    );
  }
  
  export default LangComp;