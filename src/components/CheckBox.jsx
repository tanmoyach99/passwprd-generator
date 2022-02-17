import React from "react";

const CheckBox = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <input type="checkbox" checked={value} onChange={onChange} />
    </div>
  );
};

export default CheckBox;
