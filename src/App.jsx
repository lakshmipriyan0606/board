import React, { useEffect, useState } from "react";
import Board from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import io from "socket.io-client";

const socket = io("http://localhost:5000"); 

const App = () => {
  const [board, setBoard] = useState({
    columns: [
      {
        id: 1,
        title: "Card 1",
        cards: [
          {
            id: 1,
            title: "Card title 1",
            description: "Card content",
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content",
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content",
          },
        ],
      },
      {
        id: 2,
        title: "Card 2",
        cards: [
          {
            id: 9,
            title: "Card title 9",
            description: "Card content",
          },
        ],
      },
      {
        id: 3,
        title: "Card 3",
        cards: [
          {
            id: 10,
            title: "Card title 10",
            description: "Card content",
          },
          {
            id: 11,
            title: "Card title 11",
            description: "Card content",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("board_updated", (updatedBoard) => {
      setBoard(updatedBoard);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDragEnd = (board, laneId, newPosition, cardId) => {
    const updatedColumns = board.columns.map((column) => {
      if (column.id === laneId) {
        const updatedCards = column.cards.map((card) => {
          if (card.id === cardId) {
            return {
              ...card,
              someUpdatedField: newPosition, 
            };
          }
          return card;
        });

        return {
          ...column,
          cards: updatedCards,
        };
      }
      return column;
    });

    const updatedBoard = {
      ...board,
      columns: updatedColumns,
    };
    socket.emit("board_update", updatedBoard);
  };

  function UncontrolledBoard() {
    return (
      <Board
        allowRemoveLane
        onLaneRemove={console.log}
        onCardRemove={console.log}
        onLaneRename={console.log}
        initialBoard={board}
        allowAddCard={{ on: "top" }}
        onCardNew={console.log}
        onCardDragEnd={handleDragEnd} 
      />
    );
  }

  return (
    <>
      <UncontrolledBoard />
    </>
  );
};

export default App;