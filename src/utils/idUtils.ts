import { v4 as uuidv4 } from 'uuid';

export const generateMessageId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const generateConversationId = () => {
  return uuidv4();
}; 