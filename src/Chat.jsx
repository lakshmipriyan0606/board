import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const handleMessageSubmit = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Socket.io Example</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleMessageSubmit}>Send</button>
      <p>Received Message: {receivedMessage}</p>
    </div>
  );
}

export default App;
