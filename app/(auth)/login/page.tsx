'use client';

import { getOTP } from '@/services/authService';
import { savePhone } from '@/utils/storagePhone';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const { Title, Text, Link } = Typography;

interface ErrorResponse {
    success: boolean;
    message: string;
}

export default function Page() {
    const router = useRouter();
    const getOTPMutation = useMutation({
        mutationFn: getOTP,
        onSuccess: (data, variables) => {
            if (data.success) {
                savePhone(variables.phone);
                toast.success('OTP sent successfully');
                router.push('/verify');
            } else {
                toast.error('Failed to send OTP');
            }
        },
        onError: (err) => {
            const error = err as AxiosError<ErrorResponse>;
            toast.error(
                error.response?.data?.message || 'Something went wrong'
            );
        },
    });

    const onFinish = (values: { phoneNumber: string }) => {
        getOTPMutation.mutate({
            phone: values.phoneNumber,
        });
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
                    <ArrowLeftOutlined />
                    <Text>Back</Text>
                </Flex>

                <Title
                    level={2}
                    style={{
                        textAlign: 'center',
                        marginBottom: 8,
                    }}
                >
                    Sign In
                </Title>

                <Text
                    type="secondary"
                    style={{
                        textAlign: 'center',
                        display: 'block',
                        marginBottom: 32,
                    }}
                >
                    Please enter your phone to sign in
                </Text>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your phone number',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Your Phone Number" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block size="large">
                        Next
                    </Button>
                </Form>

                <Text
                    type="secondary"
                    style={{
                        textAlign: 'center',
                        marginTop: 16,
                    }}
                >
                    passwordless authentication methods.
                </Text>

                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: 48,
                    }}
                >
                    Dont having account? <Link>Sign up</Link>
                </Text>
            </Flex>
        </Flex>
    );
}
