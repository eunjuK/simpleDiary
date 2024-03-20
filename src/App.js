/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useEffect, useRef, useReducer } from "react";
import DiaryEditor from './simpleDiary/DiaryEditor';
import DiaryList from './simpleDiary/DiaryList';
import './App.css';

// https://jsonplaceholder.typicode.com/comments

const reducer = (state, action) => {
  let newState = [];

  switch(action.type) {
    // return값 = reducer가 반환하는 값 = 새로운 상태의 값
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    // eslint-disable-next-line no-lone-blocks
    case 'EDIT': {
      newState = state.map((it) => 
        it.id === action.targetId ? 
        { ...it, content: action.newContent } : it);
      };
      break;
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());
    
    const initData = res.slice(0, 20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) + 1,
        created_date : new Date().getTime(),
        id : dataId.current++
      };
    });

    dispatch({ type: "INIT", data: initData })
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback(
    (author, content, emotion) => {
      dispatch({
        type: 'CREATE',
        data: { author, content, emotion, id: dataId.current }
      });
      dataId.current += 1;
    }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId})
  }, []);

  const onEdit = useCallback((targetId, newContent) =>{
    dispatch({ type: "EDIT", targetId, newContent})
  }, []);

  // 재생성 되지 않게 묶어주는 역할
  const memoizeDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return {goodCount, badCount, goodRatio};
    }, [data.length]
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizeDispatches}>
        <h1 className="title">Simple Diary</h1>
        <DiaryEditor />
        <dl className="emotionInfo">
          <dt>All : </dt>
          <dd>{ data.length }</dd>
          <dt>Good : </dt>
          <dd>{ goodCount }</dd>
          <dt>Bad : </dt>
          <dd>{ badCount }</dd>
          <dt>Good Ratio : </dt>
          <dd>{ goodRatio }%</dd>
        </dl>
        <DiaryList />
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
