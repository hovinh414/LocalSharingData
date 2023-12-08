// P2PService.js
import {
  createServer,
  createClient,
  serverSendMessage,
  serverSendImage,
  serverSendFile,
  clientSendMessage,
  clientSendImage,
  clientSendFile,
  cleanUp,
} from './P2PModule';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onCreateGroup} from './FunctionsP2P';
import {images} from '../constants';

let defaultChatList = [
  {
    chatId: 1,
    img: images.hieu,
    deviceName: 'Hieu',
    messages: [],
  },
  {
    chatId: 2,
    img: images.profile,
    deviceName: 'Lâm Alile',
    messages: [],
  },
];

class P2PService {
  constructor() {
    this.server = null;
    this.client = null;
    this.isServer = false;
    this.isInitialized = false;
    this.ipAddress = null;

    // biến messages dùng để trung gian giữa hiển thị và lưu
    this.messages = [];
    this.messageUpdateCallback = null;
    this.chatList = [];

    this.loadChatHistory();
  }

  setMessageUpdateCallback(callback) {
    this.messageUpdateCallback = callback;
  }

  //load từ async
  loadChatHistory = async () => {
    try {
      const chatHistory = await AsyncStorage.getItem('chatHistory');
      if (chatHistory) {
        this.chatList = JSON.parse(chatHistory);
      } else {
        this.updateChatHistory(defaultChatList);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  updateChatHistory = async newChatList => {
    try {
      this.chatList = newChatList;
      await AsyncStorage.setItem('chatHistory', JSON.stringify(newChatList));
    } catch (error) {
      console.error('Error initializing chat history:', error);
    }
  };

  addChatToChatList = chat => {
    this.chatList = [chat, ...this.chatList];
    this.saveChatHistory(); // Save chatList after adding a new chat
    // this.messageUpdateCallback(this.chatList); // Notify the UI about the update
  };

  //lưu xuống async
  saveChatHistory = async () => {
    try {
      await AsyncStorage.setItem('chatHistory', JSON.stringify(this.chatList));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  updateAndSaveMessages = async newMessage => {
    this.messages = [...this.messages, newMessage];
    this.saveChatHistory(); // Save messages to AsyncStorage
    if (this.messageUpdateCallback) {
      this.messageUpdateCallback(this.messages); // Notify the UI about the update
    }
  };

  getIpAddress = async () => {
    const state = await NetInfo.fetch();
    console.log(['DEVICES IP'], state.details.ipAddress);
    this.ipAddress = state.details.ipAddress;
  };

  initialize = async isOwner => {
    if (!this.isInitialized) {
      this.getIpAddress();

      if (isOwner) {
        console.log('[INFO] Creating the group...');
        onCreateGroup();

        this.server = createServer(this.ipAddress);
        this.isServer = true;
      } else {
        this.client = createClient();
        this.isServer = false;
      }
      // Thêm logic xử lý cho server và client ở đây
      this.isInitialized = true;
    }
  };

  onSendMessage = text => {
    if (!text) {
      return;
    }

    if (this.isServer) {
      serverSendMessage(text);
    } else {
      clientSendMessage(text);
    }
  };

  onSendImage = async image => {
    if (!image) {
      return;
    }

    const newMessage = {
      _id: Math.random().toString(),
      image: image.uri,
      createdAt: new Date(),
      user: {
        _id: 1, // Tin nhắn của phía người nhắn
      },
    };

    if (this.isServer) {
      serverSendImage(image);
    } else {
      clientSendImage(image);
    }
  };

  onSendFile = async file => {
    if (!file) {
      return;
    }

    const newMessage = {
      _id: Math.random().toString(),
      text: file.name,
      createdAt: new Date(),
      user: {
        _id: 1, // Tin nhắn của phía người nhắn
      },
    };

    if (this.isServer) {
      serverSendFile(file);
    } else {
      clientSendFile(file);
    }
  };

  cleanUp = () => {
    cleanUp();
    this.server = null;
    this.client = null;
    this.isServer = false;
    this.ipAddress = null;
    this.isInitialized = false;
  };
}

const p2pService = new P2PService();
export default p2pService;
export const getP2PServiceInstance = () => {
  return p2pService;
};
