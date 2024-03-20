import React, { memo, useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  created_date
}) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if(localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){
      onEdit(id, localContent);
      toggleIsEdit();
    }
    onEdit(id, localContent);
  };

  return (
    <article className="DiaryItem">
      <div className="row">
        <p className="item_text"><span>Author :</span>{ author }</p>
        <p className="item_text"><span>Emotion :</span>{ emotion }</p>
      </div>
      <div className="row row_date">
        <p className="item_text"><span>Date</span>{ new Date(created_date).toLocaleString() }</p>
      </div>
      <div className="row row_content">
        <span className="blind">Content</span>
        {isEdit ? (
          <>
            <textarea
              className="textarea"
              ref={ localContentInput }
              value={ localContent }
              onChange={(e) => setLocalContent(e.target.value)} />
          </>
        ) : (
          <><p className="item_text">{ content }
          </p></>
        )}
      </div>
      <div className="row">
        {isEdit ? <>
          <button
          type="button"
          className="btn"
          onClick={ handleQuitEdit }>취소</button>
          <button
          type="button"
          className="btn"
          onClick={ handleEdit }>완료</button>
        </> : <>
          <button
            type="button"
            className="btn"
            onClick={ handleRemove }>삭제하기</button>
          <button
          type="button"
          className="btn"
          onClick={ toggleIsEdit }>수정하기</button>
        </>}
      </div>
    </article>
  );
};

export default memo(DiaryItem);