'use client';

import Loading from '@/components/ui/loading';
import { ErrorResponse } from '@/constants/const';
import { useDebounce } from '@/hooks/useDebouce';
import {
    assignLesson,
    assignmentStatistics,
    getAllLessons,
    getAssignedLessons,
} from '@/services/lessonService';
import { getAllStudents } from '@/services/studentService';
import convertToVNTime from '@/utils/convertVNTime';
import {
    BookOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    SendOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tag,
    Typography,
} from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const { Title } = Typography;

export default function AssignLessonPage() {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const [studentSearch, setStudentSearch] = useState('');
    const [lessonSearch, setLessonSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('')
    const debouncedStudentSearch = useDebounce(studentSearch, 500);
    const debouncedLessonSearch = useDebounce(lessonSearch, 500);

    const { isPending: getStatistics, data: assigmentStatData } = useQuery({
        queryKey: ['statistics'],
        queryFn: assignmentStatistics,
    });
    const statistics = assigmentStatData?.data

    const { isPending: isGettingAssignedLesson, data: assignedLessonsData } = useQuery({
        queryKey: ['assigned_lessons'],
        queryFn: getAssignedLessons,
    });

    const { data: studentsData } = useQuery({
        queryKey: ['students', debouncedStudentSearch],
        queryFn: () => {
            return getAllStudents({
                search: debouncedStudentSearch,
                page: 1,
                limit: 10,
            });
        },
    });

    const { data: lessonsData } = useQuery({
        queryKey: ['lessons', debouncedLessonSearch],
        queryFn: () => {
            return getAllLessons({
                search: debouncedLessonSearch,
                page: 1,
                limit: 10,
            });
        },
    });

    const { isPending, mutate } = useMutation({
        mutationKey: ['lesson_assignment'],
        mutationFn: assignLesson,
        onSuccess: (data) => {
            if (data.success) {
                toast.success('Assigned lesson successfully');
                form.resetFields();
                queryClient.invalidateQueries({
                    queryKey: ['assigned_lessons'],
                });
            }
        },
        onError: (err) => {
            const error = err as AxiosError<ErrorResponse>;
            toast.error(
                error.response?.data?.message || 'Something went wrong'
            );
        },
    });

    const columns = [
        {
            title: 'Title',
            key: 'title',
            render: (record) => record?.title,
        },
        {
            title: 'Student',
            key: 'student',
            render: (record) => record.student?.name,
        },
        {
            title: 'Lesson',
            key: 'lesson',
            render: (record) => record.lesson?.name,
        },
        {
            title: 'Assigned Date',
            key: 'assignedAt',
            render: (record) => convertToVNTime(record.assignedAt)
        },
        {
            title: 'Completed Date',
            key: 'completedAt',
            render: (_, record) =>
                record.completedAt
                    ? new Date(
                          record.completedAt._seconds * 1000
                      ).toLocaleDateString()
                    : '-',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Tag color={record.completedAt ? 'green' : 'blue'}>
                    {record.completedAt ? 'Completed' : 'In Progress'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space>
                    <Button size="small">View</Button>
                    <Button danger size="small">
                        Remove
                    </Button>
                </Space>
            ),
        },
    ];

    const handleAssign = (values: any) => {
        mutate({
            studentPhone: values.student,
            lessonId: values.lesson,
            title: values.title,
            description: values.description,
        });
    };

    const assignedLessons = assignedLessonsData?.data?.filter(
        (assignedLesson: any) => {
            if (!filterStatus) return true;
            return assignedLesson.status === filterStatus;
        }
    );

    const handleFilter = (value: any) => {
        console.log(assignedLessons)
        setFilterStatus(value)
    }

    const studentOptions =
        studentsData?.data?.students?.map   ((student: any) => ({
            label: `${student.name} (${student.phone})`,
            value: student.phone,
        })) || [];

    const lessonOptions =
        lessonsData?.data?.lessons?.map((lesson: any) => ({
            label: `${lesson.name}`,
            value: `${lesson.id}`,
        })) || [];

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
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>Assign Lessons</Title>
            </div>

            {/* Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            title="Total Assignments"
                            value={statistics?.totalAssigned ?? 0}
                            prefix={<BookOutlined />}
                            loading={getStatistics}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            title="In Progess"
                            value={statistics?.inProgress ?? 0}
                            prefix={<ClockCircleOutlined />}
                            loading={getStatistics}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            title="Completed"
                            value={statistics?.completed ?? 0}
                            prefix={<CheckCircleOutlined />}
                            loading={getStatistics}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Form */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col span={24}>
                    <Card title="Assign New Lesson">
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={handleAssign}
                        >
                            <Row gutter={16}>
                                <Col lg={12} xs={12} md={12}>
                                    <Form.Item label="Title" name="title" rules={[{
                                        required: true,
                                        message: 'Please enter title'
                                    }]}>
                                        <Input placeholder="Enter Title"/>
                                    </Form.Item>
                                </Col>

                                <Col lg={12} xs={12} md={12}>
                                    <Form.Item
                                        label="Description"
                                        name="description"
                                    >
                                        <Input.TextArea
                                            placeholder="Enter Description"
                                            rows={1}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Student"
                                        name="student"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please select a student',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Student"
                                            options={studentOptions}
                                            showSearch={{
                                                filterOption: false,
                                                onSearch: (value) =>
                                                    setStudentSearch(value),
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Lesson"
                                        name="lesson"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please select a lesson',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Lesson"
                                            options={lessonOptions}
                                            showSearch={{
                                                filterOption: false,
                                                onSearch: (value) =>
                                                    setLessonSearch(value),
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row justify="end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SendOutlined />}
                                    loading={isPending}
                                >
                                    Assign Lesson
                                </Button>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>

            {isGettingAssignedLesson ? (
                <Loading />
            ) : (
                <Card title="Assigned Lessons">
                    <Space
                        style={{
                            width: '100%',
                            marginBottom: 16,
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* <Input.Search
                            placeholder="Search student..."
                            allowClear
                            style={{ width: 300 }}
                        /> */}

                        <Select
                            placeholder="Filter Status"
                            style={{ width: 180 }}
                            options={[
                                {
                                    label: 'All',
                                    value: '',
                                },
                                {
                                    label: 'In Progress',
                                    value: 'inProgress',
                                },
                                {
                                    label: 'Completed',
                                    value: 'completed',
                                },
                            ]}
                            onChange={handleFilter}
                        />
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={assignedLessons}
                        pagination={{
                            pageSize: 5,
                        }}
                        rowKey="id"
                    />
                </Card>
            )}
        </div>
    );
}
