'use client';

import { Table, Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/ui/loading';
import { useRouter } from 'next/navigation';
import { getAllLessons } from '@/services/lessonService';
import convertToVNTime from '@/utils/convertVNTime';
import { LessonType } from '@/constants/const';

export default function ManageLessonsPage() {
    const router = useRouter();
    const { isPending, data } = useQuery({
        queryKey: ['lessons'],
        queryFn: getAllLessons,
    });

    if (isPending) return <Loading />;

    const columns: ColumnsType<LessonType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            render: (text) => <span style={{ color: '#262626' }}>{text}</span>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '35%',
            render: (text) => <span style={{ color: '#595959' }}>{text}</span>,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
            render: (text) => (
                <span style={{ color: '#595959' }}>
                    {convertToVNTime(text)}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() =>
                            router.push(`/lessons/${record.id}/edit`)
                        }
                        style={{
                            backgroundColor: '#1890ff',
                            borderRadius: 4,
                            padding: '4px 16px',
                            height: '32px',
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() =>
                            router.push(`/lessons/${record.id}/delete`)
                        }
                        style={{
                            backgroundColor: '#f5222d',
                            borderRadius: 4,
                            padding: '4px 16px',
                            height: '32px',
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div
            style={{
                background: '#fff',
                padding: '32px',
                borderRadius: 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                minHeight: 'calc(100vh - 112px)',
            }}
        >
            <h1
                style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    marginBottom: '32px',
                    color: '#000',
                    fontFamily: 'sans-serif',
                }}
            >
                Manage Lessons
            </h1>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                }}
            >
                <span
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#000',
                    }}
                >
                    {data?.data?.total} Lessons
                </span>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <Button
                        icon={<PlusOutlined />}
                        style={{
                            borderColor: '#1890ff',
                            color: '#1890ff',
                            height: '40px',
                            padding: '0 20px',
                            fontSize: '15px',
                            borderRadius: 6,
                        }}
                        onClick={() => router.push('/lessons/add')}
                    >
                        Add New Lesson
                    </Button>

                    <Input
                        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        placeholder="Fillter"
                        style={{
                            width: '160px',
                            height: '40px',
                            borderRadius: 6,
                            borderColor: '#d9d9d9',
                        }}
                    />
                </div>
            </div>

            <Table
                dataSource={data?.data?.lessons}
                columns={columns}
                pagination={false}
                rowKey="id"
                style={{
                    borderTop: '1px solid #f0f0f0',
                }}
                components={{
                    header: {
                        cell: (props) => (
                            <th
                                {...props}
                                style={{
                                    ...props.style,
                                    backgroundColor: '#fafafa',
                                    color: '#595959',
                                    fontWeight: 500,
                                    padding: '16px',
                                }}
                            />
                        ),
                    },
                    body: {
                        cell: (props) => (
                            <td
                                {...props}
                                style={{
                                    ...props.style,
                                    padding: '20px 16px',
                                    borderBottom: '1px solid #f0f0f0',
                                }}
                            />
                        ),
                    },
                }}
            />
        </div>
    );
}
