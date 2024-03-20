import React, { useState, useEffect } from 'react';

const CounterA = React.memo(({ count }) => {
  useEffect(()=> {
    console.log(`counterA Update - count: ${count}`)
  })
  return <div>{count}</div>
});
const CounterB = React.memo(({ obj }) => {
  console.log(`counterA Update - count: ${obj.count}`)
  return <div>{obj.count}</div>
});

const OptimizeTest = () => {
  const [count, setcount] = useState(1);
  const [obj, setObj] = useState({
    count: 1
  });
  
  return <div style={{padding:50}}>
    <div>
      <h2>Counter A</h2>
      <CounterA count={count} />
      <button
        type="button"
        onClick={() => setcount(count)}>
        A Button
      </button>
    </div>
    <div>
      <h2>Counter B</h2>
      <CounterB obj={obj} />
      <button
         type="button"
         onClick={() => 
        setObj({
          count: obj.count
        })
      }>
        B Button
      </button>
    </div>
  </div>
};

export default OptimizeTest;