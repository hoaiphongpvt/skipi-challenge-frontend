'use client';

import { verifyOTP } from '@/services/authService';
import { useUserStore } from '@/store/userStore';
import { getPhone } from '@/utils/storagePhone';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const { Title, Text, Link } = Typography;

export default function Page() {
    const router = useRouter();
    const { setUser } = useUserStore.getState();
    const verifyMutation = useMutation({
        mutationFn: verifyOTP,
        onSuccess: (data) => {
            if (data.success) {
                setUser(data.data.user);
                if (data.data.user.role === 'instructor') {
                    router.push('/students');
                } else {
                    router.push('/lessons/my-lesson');
                }
            } else {
                toast.error(data.message);
            }
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    const { isPending, mutate } = verifyMutation;
    const onFinish = (values: { otp: string }) => {
        const phone = getPhone();
        if (phone) {
            mutate({
                phone: phone,
                otp: values.otp,
            });
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                minHeight: '100vh',
            }}
        >
            <Flex
                vertical
                style={{
                    width: 420,
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: 24,
                }}
            >
                <Flex
                    align="center"
                    gap={8}
                    style={{
                        marginBottom: 24,
                        cursor: 'pointer',
                    }}
                >
                    <Button onClick={handleBack}>
                        <ArrowLeftOutlined />
                        Back
                    </Button>
                </Flex>

                <Title
                    level={2}
                    style={{
                        textAlign: 'center',
                        marginBottom: 8,
                    }}
                >
                    Phone Verification
                </Title>

                <Text
                    type="secondary"
                    style={{
                        textAlign: 'center',
                        display: 'block',
                        marginBottom: 32,
                    }}
                >
                    Please enter code that send to your phone
                </Text>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your code',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Enter Your code" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={isPending}
                    >
                        Submit
                    </Button>
                </Form>

                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: 48,
                    }}
                >
                    Code not recieve? <Link>Send again</Link>
                </Text>
            </Flex>
        </Flex>
    );
}
