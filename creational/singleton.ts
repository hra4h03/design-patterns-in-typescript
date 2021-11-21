type Message = {
  userId: string;
  text: string;
};

type User = {
  id: number;
  name: string;
};

// Singleton pattern provides one global instance for a whole application
class ChatRoom {
  private static instance: ChatRoom;

  static getInstance() {
    if (!ChatRoom.instance) {
      ChatRoom.instance = new ChatRoom();
    }

    return ChatRoom.instance;
  }

  private constructor(
    public users: User[] = [],
    public messages: Message[] = []
  ) {}

  addMember(user: User) {
    this.users.push(user);
  }

  sendMessage(message: Message) {
    this.messages.push(message);
  }
}

//  new ChatRoom() will return an error because the constructor is private
const chatRoom = ChatRoom.getInstance();

// in other part of the application we could request the same instance
const secondChatRoom = ChatRoom.getInstance();

console.log(secondChatRoom === chatRoom); // true
