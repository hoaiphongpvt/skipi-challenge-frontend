'use client';

import { Table, Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '@/services/studentService';
import convertToVNTime from '@/utils/convertVNTime';
import Loading from '@/components/ui/loading';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { StudentType } from '@/constants/const';
import { useEffect, useState } from 'react';

export default function ManageStudentsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [inputValue, setInputValue] = useState(
        searchParams.get('search') || ''
    );
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(inputValue);
            setPage(1);

            const params = new URLSearchParams(window.location.search);
            if (inputValue.trim()) {
                params.set('search', inputValue);
            } else {
                params.delete('search');
            }
            router.replace(`${pathname}?${params.toString()}`);
        }, 500);

        return () => clearTimeout(handler);
    }, [inputValue, pathname, router]);

    const { isPending, data } = useQuery({
        queryKey: ['students', page, limit, search],
        queryFn: () => getAllStudents({ page, limit, search }),
    });

    if (isPending) return <Loading />;

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
                            router.push(`/students/${record.phone}/edit`)
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
                            router.push(`/students/${record.phone}/delete`)
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
                Manage Students
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
                    {data.data.total} Students
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
                        onClick={() => router.push('/students/add')}
                    >
                        Add Student
                    </Button>

                    <Input
                        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        placeholder="Filter by name..."
                        style={{
                            width: '240px',
                            height: '40px',
                            borderRadius: 6,
                            borderColor: '#d9d9d9',
                        }}
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                </div>
            </div>

            <Table
                dataSource={data.data.students}
                columns={columns}
                rowKey="id"
                style={{
                    borderTop: '1px solid #f0f0f0',
                }}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: data?.data?.total || 0,
                    showSizeChanger: true,
                    onChange: (currentPage, pageSize) => {
                        setPage(currentPage);
                        setLimit(pageSize);
                    },
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
