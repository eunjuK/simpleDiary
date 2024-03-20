import { useCallback, useMemo, useEffect, useRef, useState } from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import OptimizeTest from "./OptimizeTest";
// import Lifecycle from "./Lifecycle";

// https://jsonplaceholder.typicode.com/comments

// const dummyList = [
//   {
//     id: 1,
//     author: "Kkk",
//     content: "Hello~",
//     emotion: 5,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 2,
//     author: "aaaa",
//     content: "It's me.",
//     emotion: 4,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     author: "bbbbbbbb",
//     content: "Wow~",
//     emotion: 1,
//     created_date: new Date().getTime()
//   }
// ];

function App() {
  const [data, setData] = useState([]);
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
      }
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback(
    (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author,
        content,
        emotion,
        created_date,
        id : dataId.current
      };
      dataId.current += 1;
      setData(data => [newItem, ...data]
    );
  }, []);

  const onRemove = useCallback((targetId) => {
    // console.log(newDiaryList);
    setData(data => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetid, newContent) => {
    setData((data) =>
      data.map((it) => 
        it.id === targetid ? { ...it, content:newContent } : it
      )
    )
  }, []);

  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return {goodCount, badCount, goodRatio};
    }, [data]
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <h1 className="title">Simple Diary</h1>
      <DiaryEditor onCreate={ onCreate } />
      <dl className="emotionInfo">
        <dt>All : </dt>
        <dd>{ data.length }</dd>
        <dt>Good : </dt>
        <dd>{ goodCount }</dd>
        <dt>Bad : </dt>
        <dd>{ badCount }</dd>
        <dt>Good Ratio : </dt>
        <dd>{ goodRatio }</dd>
      </dl>
      <DiaryList onEdit={ onEdit } onRemove={ onRemove } diaryList={ data } />
    </div>
  );
  // { data }
}

export default App;
