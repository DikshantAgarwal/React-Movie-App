import React from "react";

const SearchBox = (props) => {
  return (
    <div className="col">
      <input
        className="form-control"
        value={props.searchValue}
        onChange={(e)=>props.setSearchValue(e.target.value)}
        placeholder="Type to Search"
      ></input>
    </div>
  );
};

export default SearchBox;
