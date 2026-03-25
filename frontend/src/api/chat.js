import client from './client'

export const sendChatMessage = (message) =>
  client.post('/chat', { message })


export const getInterviews = () =>
  client.get('/interviews')