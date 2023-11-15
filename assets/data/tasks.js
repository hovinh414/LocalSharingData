import {images} from '../../constants';

export const tasks = [
  {
    id: 1,
    title: 'Đóng gói hàng hóa',
    description:
      'Đóng gói sản phẩm cho khách hàng, đảm bảo rằng chúng được đóng gói đúng cách và an toàn.',
    date: '2023-11-09',
    completed: true,
    images: [images.hieu, images.image, images.image, images.image],
    priority: 'High',
    details: [
      {id: 1, title: 'Bước 1', text: 'Lấy sản phẩm từ kho'},
      {id: 2, title: 'Bước 2', text: 'Đặt sản phẩm vào hộp'},
      {id: 3, title: 'Bước 3', text: 'Đóng hộp và dán nhãn'},
    ],
  },
  {
    id: 2,
    title: 'Kiểm tra hàng hóa',
    description:
      'Kiểm tra sản phẩm để đảm bảo chất lượng và nguyên vẹn. Nếu có sản phẩm hỏng, thông báo cho quản lý hoặc khách hàng.',
    date: '2023-11-10',
    completed: false,
    images: [images.hieu, images.image, images.image, images.image],
    priority: 'Medium',
    details: [
      {id: 1, title: 'Bước 1', text: 'Kiểm tra sản phẩm từng chi tiết'},
      {id: 2, title: 'Bước 2', text: 'Ghi chú về sản phẩm hỏng (nếu có)'},
      {id: 3, title: 'Bước 3', text: 'Báo cáo cho quản lý nếu cần'},
    ],
  },
  {
    id: 3,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '2023-11-11',
    completed: false,
    images: ['image5.jpg', 'image6.jpg'],
    priority: 'Low',
    details: [
      {id: 1, title: 'Bước 1', text: 'Lấy sản phẩm từ kho'},
      {id: 2, title: 'Bước 2', text: 'Sắp xếp sản phẩm trên kệ theo danh mục'},
      {id: 3, title: 'Bước 3', text: 'Kiểm tra sự sắp xếp đúng đắn'},
    ],
  },
  {
    id: 4,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '2023-11-09',
    completed: false,
    images: ['image7.jpg', 'image8.jpg'],
    priority: 'High',
    details: [],
  },
  {
    id: 5,
    title: 'Đóng gói hàng hóa',
    description:
      'Đóng gói sản phẩm cho khách hàng, đảm bảo rằng chúng được đóng gói đúng cách và an toàn.',
    date: '2023-11-10',
    completed: true,
    images: ['image1.jpg', 'image2.jpg'],
    priority: 'High',
    details: [],
  },
  {
    id: 6,
    title: 'Kiểm tra hàng hóa',
    description:
      ' Kiểm tra sản phẩm để đảm bảo chất lượng và nguyên vẹn. Nếu có sản phẩm hỏng, thông báo cho quản lý hoặc khách hàng.',
    date: '2023-11-10',
    completed: false,
    images: ['image3.jpg', 'image4.jpg'],
    priority: 'High',
    details: [],
  },
  {
    id: 7,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '2023-11-10',
    completed: false,
    images: ['image5.jpg', 'image6.jpg'],
    priority: 'Medium',
    details: [],
  },
  {
    id: 8,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '2023-11-11',
    completed: false,
    images: ['image7.jpg', 'image8.jpg'],
    priority: 'Low',
    details: [],
  },
  {
    id: 9,
    title: 'Đóng gói hàng hóa',
    description:
      'Đóng gói sản phẩm cho khách hàng, đảm bảo rằng chúng được đóng gói đúng cách và an toàn.',
    date: '2023-11-11',
    completed: false,
    images: ['image1.jpg', 'image2.jpg'],
    priority: 'Medium',
    details: [],
  },
  {
    id: 10,
    title: 'Kiểm tra hàng hóa',
    description:
      ' Kiểm tra sản phẩm để đảm bảo chất lượng và nguyên vẹn. Nếu có sản phẩm hỏng, thông báo cho quản lý hoặc khách hàng.',
    date: '2023-11-11',
    completed: false,
    images: ['image3.jpg', 'image4.jpg'],
    priority: 'High',
    details: [],
  },
  {
    id: 11,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '2023-11-11',
    completed: false,
    images: ['image5.jpg', 'image6.jpg'],
    priority: 'Medium',
    details: [],
  },
  {
    id: 12,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '2023-11-11',
    completed: false,
    images: ['image7.jpg', 'image8.jpg'],
    priority: 'Low',
    details: [],
  },
  {
    id: 13,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '2023-11-11',
    completed: false,
    images: ['image7.jpg', 'image8.jpg'],
    priority: 'Low',
    details: [],
  },
  {
    id: 14,
    title: 'Sắp xếp sản phẩm lên kệ',
    description:
      'Sắp xếp hàng hóa lên kệ, đảm bảo rằng cửa hàng luôn có hàng tồn kho sẵn sàng cho khách hàng',
    date: '2023-11-11',
    completed: false,
    images: ['image7.jpg', 'image8.jpg'],
    priority: 'Low',
    details: [],
  },
];
