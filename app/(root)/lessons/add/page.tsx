'use client';

import { ErrorResponse } from '@/constants/const';
import { addLesson } from '@/services/lessonService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Row, Col, Layout } from 'antd';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    const addLessontMutation = useMutation({
        mutationFn: addLesson,
        onSuccess: (data) => {
            if (data.success) {
                toast.success('Created lesson successfully');
                queryClient.invalidateQueries({ queryKey: ['lessons'] });
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
    const { isPending, mutate } = addLessontMutation;
    const onFinish = (values: { name: string; description: string }) => {
        mutate(values);
    };
    return (
        <Layout
            style={{
                background: '#fff',
                padding: '32px',
                borderRadius: 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                minHeight: 'calc(100vh - 112px)',
            }}
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
                Create Lessons
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
                                    Lesson Name
                                </span>
                            }
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter lesson name',
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
                                    Description
                                </span>
                            }
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter description',
                                },
                            ]}
                        >
                            <Input
                                style={{ height: '45px', borderRadius: '6px' }}
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
        </Layout>
    );
}
