'use client';

import Loading from '@/components/ui/loading';
import { ErrorResponse } from '@/constants/const';
import { editLesson, getLessonById } from '@/services/lessonService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Modal, Button, Row, Col } from 'antd';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState(true);
    const { id } = useParams<{ id: string }>();

    const handleClose = () => {
        setIsOpen(false);
        router.back();
    };

    const { isPending: isGettingLesson, data } = useQuery({
        queryKey: ['lesson', id],
        queryFn: () => getLessonById({ id }),
    });

    const editLessontMutation = useMutation({
        mutationFn: editLesson,
        onSuccess: (data) => {
            if (data.success) {
                toast.success('Updated lesson successfully');
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
    const { isPending, mutate } = editLessontMutation;
    const onFinish = (values: { name: string; description: string }) => {
        mutate({
            id,
            ...values,
        });
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.data.name,
                description: data.data.description,
            });
        }
    }, [data, form]);

    if (isGettingLesson) return <Loading />;
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
                Edit Lessons
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
                        Update
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
