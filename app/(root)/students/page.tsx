'use client';

import { Table, Button, Input, Tag, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '@/services/studentService';
import convertToVNTime from '@/utils/convertVNTime';

// Định nghĩa cấu trúc dữ liệu cho một Student
interface StudentType {
  key: string;
  name: string;
  email: string;
  phone: string;
  createAt: string;
}

export default function ManageStudentsPage() {
  
  const {isPending, data} = useQuery({
    queryKey: ['students'],
    queryFn: getAllStudents
  })

  if (isPending) return 'Loading'

  const columns: ColumnsType<StudentType> = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text) => <span style={{ color: '#262626' }}>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '35%',
      render: (text) => <span style={{ color: '#595959' }}>{text}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
      render: (text) => <span style={{ color: '#595959' }}>{text}</span>
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      render: (text) => <span style={{ color: '#595959' }}>{convertToVNTime(text)}</span>
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            style={{ 
              backgroundColor: '#1890ff', 
              borderRadius: 4, 
              padding: '4px 16px',
              height: '32px'
            }}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            style={{ 
              backgroundColor: '#f5222d', 
              borderRadius: 4, 
              padding: '4px 16px',
              height: '32px'
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ 
      background: '#fff', 
      padding: '32px', 
      borderRadius: 16, 
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      minHeight: 'calc(100vh - 112px)'
    }}>
      {/* Tiêu đề trang */}
      <h1 style={{ 
        fontSize: '28px', 
        fontWeight: 'bold', 
        marginBottom: '32px', 
        color: '#000',
        fontFamily: 'sans-serif'
      }}>
        Manage Students
      </h1>

      {/* Thanh công cụ phía trên bảng (Số lượng, Thêm mới, Bộ lọc) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        {/* Số lượng học sinh */}
        <span style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#000' 
        }}>
          {data.data.total} Students
        </span>

        {/* Khối Actions bên phải */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Nút Add Student với viền xanh text xanh */}
          <Button 
            icon={<PlusOutlined />} 
            style={{ 
              borderColor: '#1890ff', 
              color: '#1890ff', 
              height: '40px',
              padding: '0 20px',
              fontSize: '15px',
              borderRadius: 6
            }}
          >
            Add Student
          </Button>

          {/* Ô tìm kiếm / Bộ lọc (Filter) */}
          <Input 
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} 
            placeholder="Fillter" 
            style={{ 
              width: '160px', 
              height: '40px',
              borderRadius: 6,
              borderColor: '#d9d9d9'
            }} 
          />
        </div>
      </div>

      {/* Bảng danh sách Student */}
      <Table 
        dataSource={data.data.students} 
        columns={columns} 
        pagination={false} // Tắt phân trang theo mẫu trong ảnh
        style={{
          borderTop: '1px solid #f0f0f0'
        }}
        // Custom style cho Header và hàng dữ liệu của Antd Table
        components={{
          header: {
            cell: (props: any) => (
              <th {...props} style={{ 
                ...props.style, 
                backgroundColor: '#fafafa', 
                color: '#595959', 
                fontWeight: 500,
                padding: '16px'
              }} />
            )
          },
          body: {
            cell: (props: any) => (
              <td {...props} style={{ 
                ...props.style, 
                padding: '20px 16px',
                borderBottom: '1px solid #f0f0f0'
              }} />
            )
          }
        }}
      />
    </div>
  );
}