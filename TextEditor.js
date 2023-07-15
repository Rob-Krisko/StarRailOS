import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import styled from 'styled-components';

const StyledEditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  justify-content: space-between;
  box-sizing: border-box;
`;

const StyledToolbar = styled.div`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ddd;
  background: #f3f3f3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const StyledEditor = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  background: #fff;
  flex: 1;
  padding: 10px 5px;
  border-radius: 5px;
  overflow: auto;
`;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
  margin: 0;
  
  &:hover, &:focus {
    outline: 1px solid #ddd;
  }

  &.active {
    outline: 1px solid #ddd;
  }
`;

function useLocalStorageEvent() {
  const [storageEvent, setStorageEvent] = useState(null);

  useEffect(() => {
    const handleStorageChange = (event) => {
      setStorageEvent(event);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return storageEvent;
}

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [docTitle, setDocTitle] = useState("");

  const onChange = (editorState) => {
    setEditorState(editorState);
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const toggleInlineStyle = (inlineStyle) => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, inlineStyle)
    );
  }

  const saveDocument = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    localStorage.setItem(docTitle, JSON.stringify({title: docTitle, content: raw}));
    console.log('Document saved with title: ', docTitle);
  }

  const loadDocument = (title, content) => {
    if (title && content) {
      const loadedState = EditorState.createWithContent(convertFromRaw(content));
      setEditorState(loadedState);
      setDocTitle(title);
      console.log('Loaded document with title: ', title);
    } else {
      console.log('No document found with title: ', title);
    }
  }

  useEffect(() => {
    const loadFileFromLocalStorage = () => {
      const loadedFile = localStorage.getItem('loadFile');
      if (loadedFile) {
        const { fileName, fileContent } = JSON.parse(loadedFile);
        loadDocument(fileName, fileContent);
      }
    };
    
    loadFileFromLocalStorage();
  }, [loadDocument]);

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <StyledEditorContainer>
      <StyledToolbar>
        <div>
          <Button 
            onClick={() => toggleInlineStyle('BOLD')}
            className={currentStyle.has('BOLD') ? 'active' : ''}
          >
            <b>B</b>
          </Button>
          <Button 
            onClick={() => toggleInlineStyle('ITALIC')}
            className={currentStyle.has('ITALIC') ? 'active' : ''}
          >
            <i>I</i>
          </Button>
          <Button 
            onClick={() => toggleInlineStyle('UNDERLINE')}
            className={currentStyle.has('UNDERLINE') ? 'active' : ''}
          >
            <u>U</u>
          </Button>
        </div>
        <div>
          <input value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="Document name" />
          <Button onClick={saveDocument}>💾</Button>
          <Button onClick={() => loadDocument(docTitle)}>📂</Button>
        </div>
      </StyledToolbar>

      <StyledEditor>
        <Editor 
          editorState={editorState} 
          onChange={onChange} 
          handleKeyCommand={handleKeyCommand} 
        />
      </StyledEditor>
    </StyledEditorContainer>
  )
}

export default TextEditor;
