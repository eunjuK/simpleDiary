import { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);
  return <section className="DiaryList">
    <h2 className="title">List</h2>
    <p className="text">{diaryList.length}개의 일기</p>
    <div className="list">
      {diaryList.map((it) => (
        <DiaryItem key={ it.id } { ...it } />
      ))}
    </div>
  </section>
};

DiaryList.defaultProps = {
  diaryList: []
};

export default DiaryList;