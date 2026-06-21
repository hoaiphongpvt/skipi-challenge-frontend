'use client';

import Loading from '@/components/ui/loading';
import { ErrorResponse } from '@/constants/const';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Space, Typography, Layout } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteLesson, getLessonById } from '@/services/lessonService';

const { Text, Title } = Typography;

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { isPending: isLoadingLesson, data } = useQuery({
        queryKey: ['lesson', 'lessonId'],
        queryFn: () => getLessonById({ id }),
    });

    const deleteLessonMutation = useMutation({
        mutationFn: () => deleteLesson({ id }),
        onSuccess: (res) => {
            if (res?.success) {
                toast.success('Deleted lesson successfully');
                queryClient.invalidateQueries({ queryKey: ['lessons'] });
                router.back()
            }
        },
        onError: (err) => {
            const error = err as AxiosError<ErrorResponse>;
            toast.error(
                error.response?.data?.message || 'Something went wrong'
            );
        },
    });

    if (isLoadingLesson) return <Loading />;

    const { isPending, mutate } = deleteLessonMutation;

    const lessonInfo = data?.data ? data.data : data;

    const handleDelete = () => {
        mutate();
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
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <ExclamationCircleFilled
                    style={{
                        fontSize: '56px',
                        color: '#ff4d4f',
                        marginBottom: '16px',
                    }}
                />
                <Title
                    level={4}
                    style={{ margin: 0, fontWeight: 600, color: '#1f1f1f' }}
                >
                    Delete Lesson
                </Title>
            </div>

            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: '#fafafa',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                }}
            >
                <Text
                    style={{
                        fontSize: '15px',
                        color: '#434343',
                        display: 'block',
                    }}
                >
                    Are you sure you want to delete this lesson?
                </Text>
                {lessonInfo?.name && (
                    <Text
                        strong
                        style={{
                            fontSize: '16px',
                            color: '#ff4d4f',
                            marginTop: '8px',
                            display: 'block',
                        }}
                    >
                        {lessonInfo.name}
                    </Text>
                )}
                <Text
                    type="secondary"
                    style={{
                        fontSize: '13px',
                        marginTop: '4px',
                        display: 'block',
                    }}
                >
                    This action cannot be undone.
                </Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Space size="middle">
                    <Button
                        type="primary"
                        danger
                        loading={isPending}
                        onClick={handleDelete}
                        style={{
                            height: '40px',
                            padding: '0 24px',
                            borderRadius: '6px',
                            fontWeight: 500,
                            boxShadow: '0 2px 0 rgba(255, 77, 79, 0.1)',
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            </div>
        </Layout>
    );
}
