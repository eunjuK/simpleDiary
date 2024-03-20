import React, { useEffect, useState } from "react";

const UnmoutTest = () => {

  useEffect(() => {
    console.log("Mount!")
    return () => {
      // Unmount 시점에 실행
      // console.log("Unmount!");
    }
  }, [])
  return <div>Unmout Testing Component</div>
}

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return <div style={{ padding: 20}}>
    <button onClick={ toggle }>On/Off</button>
    {isVisible && <UnmoutTest />}
  </div>;
};

export default Lifecycle;