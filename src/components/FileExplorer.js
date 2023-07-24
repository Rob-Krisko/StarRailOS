import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { TaskbarContext } from './TaskbarContext';
import TextEditor from './TextEditor';
import fileIcon from '../assets/text-icon.png'; // Imported file icon
import plusIcon from '../assets/plus-icon.png'; // Import your plus icon here
import deleteIcon from '../assets/delete-icon.png'; // Import your delete icon here

const StyledExplorerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
`;

const FileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000; // Add a border to make the container more distinct
  padding: 10px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FileIcon = styled.img`
  width: 50px; // Adjust as needed
  height: 50px; // Adjust as needed
`;

const FileName = styled.span`
  margin-top: 10px;
  text-align: center;
  word-break: break-word;
`;

const NewFileButton = styled.button`
  background: url(${plusIcon}) no-repeat center center; // Plus icon for the button
  background-size: contain;
  height: 50px; // Adjust as needed
  border: none;
  cursor: pointer;
  display: flex; 
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const DeleteFileButton = styled.button`
  background: url(${deleteIcon}) no-repeat center center; // Delete icon for the button
  background-size: contain;
  width: 20px; // Adjust as needed
  height: 20px; // Adjust as needed
  border: none;
  cursor: pointer;
  margin-top: 5px;
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

  const deleteFile = (fileName) => {
    const confirmation = window.confirm("Are you sure you want to delete this file?");
    if (confirmation) {
      localStorage.removeItem(fileName);
      setFileSystem(fileSystem.filter(file => file.name !== fileName));
    }
  };

  const createNewFile = () => {
    openApp("Text Editor", <TextEditor initialFile={null} />);
  };

  return (
    <StyledExplorerContainer>
      {fileSystem.map((file) => (
        <FileWrapper key={file.name}>
          <FileIcon src={fileIcon} alt="file icon" onClick={() => openFile(file.name, file.content)} />
          <FileName>{file.name}</FileName>
          <DeleteFileButton onClick={() => deleteFile(file.name)} />
        </FileWrapper>
      ))}
      <NewFileButton onClick={createNewFile} />
    </StyledExplorerContainer>
  );
}

export default FileExplorer;