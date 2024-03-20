import React, { memo, useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {

  const { onCreate } = useContext(DiaryDispatchContext);

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = () => {
    if(state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if(state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);

    alert("Success Save!");
    setState({
      author: "",
      content: "",
      emotion: 1
    });
  };

  const authorInput = useRef();
  const contentInput = useRef();

  return <article className="diaryEditor">
    <h2 className="subTitle">Today</h2>

    {/* input */}
    <form action="" className="form">
      <div className="row">
        <label htmlFor="author" className="label">Author</label>
        <input 
          ref={ authorInput }
          type="text"
          name="author"
          id="author"
          className="input"
          placeholder="Name"
          value={ state.author }
          onChange={ handleChangeState }
          />
      </div>

      {/* textarea */}
      <div className="row">
        <label htmlFor="content" className="label">Content</label>
        <textarea
          ref={ contentInput }
          name="content"
          id="content"
          className="textarea"
          placeholder="Content"
          rows="5"
          value={ state.content }
          onChange={ handleChangeState }
          ></textarea>
      </div>

      {/* select */}
      <div className="row">
        <label htmlFor="emotion" className="label">Emotion</label>
        <select 
          name="emotion"
          id="emotion"
          className="select"
          value={ state.emotion }
          onChange={ handleChangeState }
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <button
        className="btn_save"
        onClick={ handleSubmit }
      >Save</button>
    </form>
  </article>;
};

export default memo(DiaryEditor);