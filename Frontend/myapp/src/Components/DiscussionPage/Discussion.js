import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import CommentsComponent from './CommentsComponent'; 

export default function Discussion() {
  const location = useLocation();
  const { item } = location.state || {};
  const [ws, setWs] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null); 
  const [connected, setConnected] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const cookieData = Cookies.get('user_data');
    if (cookieData) {
      const [name] = cookieData.split(',');
      setUsername(name);
    }
  }, []);

  const initializeWebSocket = useCallback(() => {
    if (username && item) {
      const topic = item.title;
      const webSocket = new WebSocket(`ws://localhost:8000/ws/${username}?topic=${topic}`);

      webSocket.onopen = () => {
        setConnected(true);
        console.log("WebSocket connected");
      };

      webSocket.onmessage = () => {
        fetchComments();
      };

      webSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnected(false);
      };

      webSocket.onclose = () => {
        console.log("WebSocket closed");
        setConnected(false);
      
      };

      setWs(webSocket);

      return () => {
        if (webSocket.readyState === WebSocket.OPEN) {
          webSocket.close();
        }
      };
    }
  }, [username, item]);

  useEffect(() => {
    const cleanup = initializeWebSocket();
    return cleanup;
  }, [initializeWebSocket]);

  const getPreviousmessage=async(e)=>
  {

  }
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      if (inputValue && ws && connected) {
        if (editingCommentId) {
          console.log(editingCommentId)
          await axios.patch(`http://localhost:8000/edit/${editingCommentId}/${editingCommentId.content}${encodeURIComponent(inputValue)}`, {}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setEditingCommentId(null);
        } else {
          ws.send(inputValue);
        }
        setInputValue("");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message;
      setError(`Failed to update comment: ${errorMessage}`);
      console.error('Axios error:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/${item.title}/comments`);
      setComments(result.data);
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [item.title]);

  const deleteComment = async (comment_id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${comment_id}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== comment_id)
      );
    } catch (err) {
      setError('Failed to delete comment');
      console.error(err);
    }
  };

  const editComment = (comment_id, content) => {
    setInputValue(content);
    setEditingCommentId(comment_id);
    document.getElementById("form").style.display = "block";
  };



  return (
    <div
      className="flex justify-center bg-fixed items-center min-h-screen bg-gray-100 p-4 font-playfair"
      style={{
        backgroundImage: `url(${item.urlToImage[3]})`,
      }}
    >
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">{item.title}</h1>

        {error && <p className="text-red-500">{error}</p>}

        <CommentsComponent comments={comments} deleteComment={deleteComment} editComment={editComment} user={username} />

        <div className="text-center mt-6">
          <button
            onClick={() => document.getElementById("form").style.display = "block"}
            id="connect"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
          >
            Comment
          </button>
        </div>

        <form
          onSubmit={sendMessage}
          id="form"
          style={{ display: 'none' }}
          className="mt-4"
        >
          <input
            type="text"
            id="messageText"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoComplete="off"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Write your comment..."
          />
          <button
            type="submit"
            className="mt-2 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
          >
            {editingCommentId ? 'Update' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
