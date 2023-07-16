import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { TaskbarContext } from './TaskbarContext';
import TextEditor from './TextEditor';

const StyledExplorerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-start;
  box-sizing: border-box;
  overflow: auto; 
  flex-grow: 1;
`;


const File = styled.div`
  padding: 10px;
  background-color: #fff;
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function FileExplorer() {
  const { openApp } = useContext(TaskbarContext);
  const [fileSystem, setFileSystem] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const files = keys.map((key) => {
      const item = localStorage.getItem(key);
      try {
        const parsedItem = JSON.parse(item);
        if (parsedItem && parsedItem.content && parsedItem.content.blocks) {
          return {
            name: key,
            content: parsedItem.content
          };
        } else {
          return null;
        }
      } catch (e) {
        console.log(`Error parsing item with key ${key}: ${e}`);
        return null;
      }
    }).filter(item => item !== null);

    setFileSystem(files);
  }, []);

  const openFile = (fileName, fileContent) => {
    openApp("Text Editor", <TextEditor initialFile={{ fileName, fileContent }} />);
  };

  return (
    <StyledExplorerContainer>
      {fileSystem.map((file) => 
        <File key={file.name} onClick={() => openFile(file.name, file.content)}>{file.name}</File>
      )}
    </StyledExplorerContainer>
  );
}

export default FileExplorer;
