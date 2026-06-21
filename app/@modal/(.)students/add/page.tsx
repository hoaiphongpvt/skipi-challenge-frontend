'use client';

import { ErrorResponse } from '@/constants/const';
import { addStudent } from '@/services/studentService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Modal, Button, Row, Col, Select } from 'antd';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        router.back();
    };

    const addStudentMutation = useMutation({
        mutationFn: addStudent,
        onSuccess: (data) => {
            if (data.success) {
                toast.success('Created student successfully');
                queryClient.invalidateQueries({ queryKey: ['students'] });
                router.back();
            }
        },
        onError: (err) => {
            const error = err as AxiosError<ErrorResponse>;
            toast.error(
                error.response?.data?.message || 'Something went wrong'
            );
        },
    });
    const { isPending, mutate } = addStudentMutation;
    const onFinish = (values: {
        name: string;
        phone: string;
        email: string;
        role: string;
    }) => {
        mutate(values);
    };
    return (
        <Modal
            open={isOpen}
            footer={null}
            width={720}
            centered
            onCancel={handleClose}
        >
            <h2
                style={{
                    textAlign: 'center',
                    fontSize: '32px',
                    fontWeight: 600,
                    marginBottom: '32px',
                    color: '#000',
                }}
            >
                Create Student
            </h2>

            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
            >
                <Row gutter={[24, 16]}>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <span style={{ fontWeight: 500 }}>
                                    Student Name
                                </span>
                            }
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter student name',
                                },
                            ]}
                        >
                            <Input
                                style={{ height: '45px', borderRadius: '6px' }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={
                                <span style={{ fontWeight: 500 }}>
                                    Phone Number
                                </span>
                            }
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter phone number',
                                },
                                {
                                    pattern: /^[0-9]{9,11}$/,
                                    message:
                                        'Please enter a valid phone number format (e.g., 0912345678)',
                                },
                            ]}
                        >
                            <Input
                                style={{ height: '45px', borderRadius: '6px' }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={
                                <span style={{ fontWeight: 500 }}>
                                    Email Address
                                </span>
                            }
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter email address',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email',
                                },
                            ]}
                        >
                            <Input
                                style={{ height: '45px', borderRadius: '6px' }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={
                                <span style={{ fontWeight: 500 }}>Role</span>
                            }
                            name="role"
                            initialValue="student"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a role',
                                },
                            ]}
                        >
                            <Select
                                style={{ height: '45px', borderRadius: '6px' }}
                                options={[
                                    { value: 'student', label: 'Student' },
                                    {
                                        value: 'instructor',
                                        label: 'Instructor',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '24px',
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                        style={{
                            height: '42px',
                            padding: '0 40px',
                            fontSize: '16px',
                            borderRadius: '6px',
                            backgroundColor: '#2575e6',
                            fontWeight: 500,
                        }}
                    >
                        Create
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
