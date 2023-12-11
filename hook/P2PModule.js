import TcpSocket from 'react-native-tcp-socket';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  sendMessage,
  sendFile,
  receiveMessage,
  receiveFile,
} from 'react-native-wifi-p2p';
import {getP2PServiceInstance} from './P2PService';
import {PORT, SERVER_IP} from '@env';

let server;
let client;
let socketRef;
let receiveInterval;

export const createServer = ipAddress => {
  if (server) {
    return server;
  }

  server = TcpSocket.createServer(socket => {
    console.log('Client connected:', socket.remoteAddress, socket.remotePort);

    socketRef = socket;

    console.log(socketRef);

    socket.on('error', error => {
      console.error('An error ocurred with client socket ', error);
    });

    socket.on('close', error => {
      console.log('Closed connection with ', socket.address());
    });
  });

  server.listen({port: Number(PORT), host: ipAddress}, () => {
    console.log('Server is up and running on', Number(PORT), ipAddress);

    receiveInterval = setInterval(() => {
      serverReceiveMessage();
      serverReceiveImage();
      serverReceiveFile();
    }, 100);
  });

  server.on('error', error => {
    console.error('An error ocurred with the server', error);
  });

  server.on('close', () => {
    console.log('Server closed connection');
  });

  return server;
};
export const createClient = () => {
  if (client) {
    return client;
  }

  client = TcpSocket.createConnection(
    {port: Number(PORT), host: SERVER_IP}, // Thay thế 'SERVER_IP' bằng địa chỉ IP thực tế
    () => {
      console.log('Connected to server');
      client.write('Hello server from client!');
    },
  );

  client.on('data', async data => {
    const receivedData = await JSON.parse(data.toString());
    console.log(receivedData);
    let newMessage;

    // Kiểm tra loại dữ liệu

    // Xử lý tin nhắn văn bản
    if (receivedData.type === 'text') {
      console.log('Received text from client:', receivedData.data);

      const receivedText = receivedData.data.toString();
      newMessage = {
        _id: Math.random().toString(),
        text: receivedText,
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      };
      // Xử lý tin nhắn hình ảnh
    } else if (receivedData.type === 'image') {
      console.log('Received image from client:', receivedData.data);
      const receivedImage = await receivedData.data.uri;
      newMessage = {
        _id: Math.random().toString(),
        image: `${receivedImage}`,
        createdAt: new Date(),
        user: {
          _id: 2, // Tin nhắn của phía người nhắn
        },
      };
      // Xứ lý tin nhắn file
    } else if (receivedData.type.startsWith('file/')) {
      console.log('Received file from client:', receivedData.data);
      const receivedFile = await receivedData.data.name;
      console.log(receivedFile);
      newMessage = {
        _id: Math.random().toString(),
        text: `${receivedFile}`,
        createdAt: new Date(),
        user: {
          _id: 2, // Tin nhắn của phía người nhắn
        },
      };
    } else if (receivedData.type === 'chat'){
      console.log('Received chat from server:', receivedData.data);
    }
  });

  client.on('error', error => {
    console.error('An error occurred with the client socket', error);
  });

  client.on('close', () => {
    console.log('Client closed connection');
  });

  return client;
};
export const serverSendMessage = text => {
  if (socketRef) {
    const newData = {
      type: 'text',
      data: text.toString(),
    };
    socketRef.write(JSON.stringify(newData));
  } else {
    console.log('SocketRef has not been initialized');
  }
};
export const serverSendImage = image => {
  if (socketRef) {
    const newData = {
      type: 'image',
      data: image,
    };
    socketRef.write(JSON.stringify(newData));
  } else {
    console.log('SocketRef has not been initialized');
  }
};
export const serverSendFile = file => {
  if (socketRef) {
    const newData = {
      type: 'file/' + file.type,
      data: file,
    };
    socketRef.write(JSON.stringify(newData));
  } else {
    console.log('SocketRef has not been initialized');
  }
};
const serverReceiveMessage = () => {
  // Server use this function to receive message from client
  receiveMessage()
    .then(text => {
      const newMessage = {
        _id: Math.random().toString(),
        text: text,
        createAt: new Date(),
        user: {
          _id: 2, // Tin nhắn của phía người nhận
        },
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );
    })
    .catch(err => console.log('[FATAL] Unable to receive messages: ', err));
};
const serverReceiveImage = () => {
  receiveFile()
    .then(image => {
      const newMessage = {
        _id: Math.random().toString(),
        image: image,
        createAt: new Date(),
        user: {
          _id: 2, // Tin nhắn của phía người nhận
        },
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );
    })
    .catch(err => console.log('[FATAL] Unable to receive messages: ', err));
};
const serverReceiveFile = () => {
  receiveFile('/')
    .then(file => {
      console.log(file);
      const newMessage = {
        _id: Math.random().toString(),
        text: '[FILE]: ' + file.uri,
        createAt: new Date(),
        user: {
          _id: 2, // Tin nhắn của phía người nhận
        },
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );
    })
    .catch(err => console.log('[FATAL] Unable to receive file: ', err));
};

export const clientSendMessage = text => {
  sendMessage(text)
    .then(metaInfo =>
      console.log('[INFO] Send client message successfully', metaInfo),
    )
    .catch(err => console.log('[FATAL] Unable to send client message: ', err));
};
export const clientSendImage = async image => {
  sendMessage(image.fileName);

  const uri = await image.originalPath.toString();

  console.log(uri);
  // only client can use sendMessage function
  sendFile(uri)
    .then(metaInfo =>
      console.log('[INFO] Send client image successfully', metaInfo),
    )
    .catch(err => console.log('[FATAL] Unable to send client image: ', err));
};
export const clientSendFile = file => {
  sendFile(file.uri)
    .then(metaInfo =>
      console.log('[INFO] Send client file successfully', metaInfo),
    )
    .catch(err => console.log('[FATAL] Unable to send client file: ', err));
};

export const cleanUp = () => {
  if (server) {
    server.close();
    server = null;
  }

  if (client) {
    client.end();
    client = null;
  }

  if (receiveInterval) {
    clearInterval(receiveInterval);
    receiveInterval = null;
  }
};
