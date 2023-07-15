import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Folder = styled.div`
  padding: 10px;
  background-color: lightgray;
  margin-bottom: 5px;
`;

const File = styled.div`
  padding: 10px;
  background-color: #fff;
  margin: 5px 0;
`;

const Button = styled.button`
  margin-right: 10px;
`;

const FileOrFolder = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.type === 'folder') {
    return (
      <Folder>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'} 
        </Button>
        {item.name}
        {isOpen && item.children.map((child) => <FileOrFolder key={child.name} item={child} />)}
      </Folder>
    );
  } else if (item.type === 'file') {
    return <File>{item.name}</File>;
  } else {
    return null;
  }
};

function FileExplorer() {
  const [fileSystem, setFileSystem] = useState([]);

  useEffect(() => {
    const initialFileSystem = [
      {
        type: 'folder',
        name: 'Folder 1',
        children: [
          {
            type: 'file',
            name: 'File 1',
            content: 'This is File 1.'
          },
          {
            type: 'file',
            name: 'File 2',
            content: 'This is File 2.'
          }
        ]
      },
      {
        type: 'file',
        name: 'File 3',
        content: 'This is File 3.'
      }
    ];

    setFileSystem(initialFileSystem);
  }, []);

  return (
    <div>
      {fileSystem.map((item) => <FileOrFolder key={item.name} item={item} />)}
    </div>
  );
}

export default FileExplorer;
