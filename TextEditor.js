import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Toolbar = styled.div`
  background-color: #f3f3f3;
  padding: 10px;
`;

const ToolbarButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  margin-right: 10px;
  &:hover {
    outline: 1px solid #000;
  }
  &.active {
    outline: 1px solid #000;
  }
`;

const EditorWrapper = styled.div`
  background-color: #fff;
  padding: 10px;
  height: 100%;
  overflow: auto;
`;

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  };

  const toggleBlockType = (blockType) => {
    setEditorState(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  };

  const currentStyle = editorState.getCurrentInlineStyle();
  const blockType = RichUtils.getCurrentBlockType(editorState);

  return (
    <Container>
      <Toolbar>
        <ToolbarButton 
          className={currentStyle.has('BOLD') ? 'active' : ''} 
          onMouseDown={(e) => { e.preventDefault(); toggleInlineStyle('BOLD'); }} 
          title="Bold (Ctrl+B)"
        >
          <b>B</b>
        </ToolbarButton>
        <ToolbarButton 
          className={currentStyle.has('ITALIC') ? 'active' : ''} 
          onMouseDown={(e) => { e.preventDefault(); toggleInlineStyle('ITALIC'); }} 
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton 
          className={currentStyle.has('UNDERLINE') ? 'active' : ''} 
          onMouseDown={(e) => { e.preventDefault(); toggleInlineStyle('UNDERLINE'); }} 
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </ToolbarButton>
        <ToolbarButton 
          className={blockType === 'unordered-list-item' ? 'active' : ''} 
          onMouseDown={(e) => { e.preventDefault(); toggleBlockType('unordered-list-item'); }} 
          title="Bullet list"
        >
          &#8226; List
        </ToolbarButton>
        <ToolbarButton 
          className={blockType === 'ordered-list-item' ? 'active' : ''} 
          onMouseDown={(e) => { e.preventDefault(); toggleBlockType('ordered-list-item'); }} 
          title="Numbered list"
        >
          1. List
        </ToolbarButton>
        <ToolbarButton 
          className={blockType === 'blockquote' ? 'active' : ''} 
          onMouseDown={(e) => { e.preventDefault(); toggleBlockType('blockquote'); }} 
          title="Quote"
        >
          &ldquo; Quote
        </ToolbarButton>
      </Toolbar>
      <EditorWrapper>
        <Editor 
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Write something..."
          ref={editor}
          spellCheck={true}
        />
      </EditorWrapper>
    </Container>
  );
}

export default TextEditor;
