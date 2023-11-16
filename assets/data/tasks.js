import {images} from '../../constants';

export const tasks = [
  {
    id: 1,
    title: 'Đóng gói hàng hóa',
    description:
      'Đóng gói sản phẩm cho khách hàng, đảm bảo rằng chúng được đóng gói đúng cách và an toàn.',
    date: '09/11/2023',
    time: '23:00',
    completed: true,
    images: [images.hieu, images.image, images.image, images.image],
    priority: 'High',
    details: [
      {id: 1, title: 'Bước 1', text: 'Lấy sản phẩm từ kho', completed: true},
      {id: 2, title: 'Bước 2', text: 'Đặt sản phẩm vào hộp', completed: true},
      {id: 3, title: 'Bước 3', text: 'Đóng hộp và dán nhãn', completed: true},
    ],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 2,
    title: 'Kiểm tra hàng hóa',
    description:
      'Kiểm tra sản phẩm để đảm bảo chất lượng và nguyên vẹn. Nếu có sản phẩm hỏng, thông báo cho quản lý hoặc khách hàng.',
    date: '10/11/2023',
    time: '23:00',
    completed: false,
    images: [images.hieu, images.image, images.image, images.image],
    priority: 'Medium',
    details: [
      {id: 1, title: 'Bước 1', text: 'Kiểm tra sản phẩm từng chi tiết', completed: true},
      {id: 2, title: 'Bước 2', text: 'Ghi chú về sản phẩm hỏng (nếu có)', completed: false},
      {id: 3, title: 'Bước 3', text: 'Báo cáo cho quản lý nếu cần', completed: true},
    ],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 3,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '11/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'Low',
    details: [
      {id: 1, title: 'Bước 1', text: 'Lấy sản phẩm từ kho', completed: true},
      {id: 2, title: 'Bước 2', text: 'Sắp xếp sản phẩm trên kệ theo danh mục', completed: false},
      {id: 3, title: 'Bước 3', text: 'Kiểm tra sự sắp xếp đúng đắn', completed: false},
    ],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 4,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '09/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'High',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 5,
    title: 'Đóng gói hàng hóa',
    description:
      'Đóng gói sản phẩm cho khách hàng, đảm bảo rằng chúng được đóng gói đúng cách và an toàn.',
    date: '10/11/2023',
    time: '23:00',
    completed: true,
    images: [],
    priority: 'High',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 6,
    title: 'Kiểm tra hàng hóa',
    description:
      ' Kiểm tra sản phẩm để đảm bảo chất lượng và nguyên vẹn. Nếu có sản phẩm hỏng, thông báo cho quản lý hoặc khách hàng.',
    date: '10/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'High',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 7,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '10/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'Medium',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 8,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '11/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'Low',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 9,
    title: 'Đóng gói hàng hóa',
    description:
      'Đóng gói sản phẩm cho khách hàng, đảm bảo rằng chúng được đóng gói đúng cách và an toàn.',
    date: '11/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'Medium',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 10,
    title: 'Kiểm tra hàng hóa',
    description:
      ' Kiểm tra sản phẩm để đảm bảo chất lượng và nguyên vẹn. Nếu có sản phẩm hỏng, thông báo cho quản lý hoặc khách hàng.',
    date: '11/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'High',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 11,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '11/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'Medium',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 12,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '11/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'Low',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 13,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '11/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'Low',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
  {
    id: 14,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '11/11/2023',
    time: '23:00',
    completed: false,
    images: [],
    priority: 'Low',
    details: [],
    taskAssignee: [],
    maxAssignee: 6
  },
];
