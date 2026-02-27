// Centralized user-facing messages for the chat app
export const messages = {
  welcome: "Welcome to the chat room!",
  userJoined: (username: string) => `${username} joined the room.`,
  userLeft: (username: string) => `${username} left the room.`,
  sendMessagePlaceholder: "Type a message...",
  emptyRoom: "No messages yet. Start the conversation!",
  error: "Something went wrong. Please try again.",
  connecting: "Connecting...",
  reconnecting: "Reconnecting...",
  disconnected: "You have been disconnected.",
  copy: "Copy",
  copySuccess: "Copied!",
  roomIdLabel: "ROOM ID",
  selfDestructLabel: "Self-Destruct",
  destroyNowLabel: "Destroy Now",
};
