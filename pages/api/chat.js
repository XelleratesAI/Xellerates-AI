import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://127.0.0.1:8000/chat', req.body);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error communicating with the chatbot backend', error);
      res.status(500).json({ error: 'Error communicating with the chatbot backend' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}