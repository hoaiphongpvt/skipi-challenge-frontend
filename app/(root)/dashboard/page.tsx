'use client';

import { useUserStore } from '@/store/userStore';
import { Button, Card, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = async () => {
        localStorage.removeItem('phone');

        router.push('/');
    };

    return (
        <Flex justify="center" align="center">
            <Card
                style={{
                    width: 500,
                }}
            >
                <Title level={2}>Dashboard</Title>

                <Text>Welcome to Skipli Challenge 🎉</Text>

                <Flex
                    vertical
                    gap={12}
                    style={{
                        marginTop: 24,
                    }}
                >
                    <Card size="small">Total Orders: 0</Card>

                    <Card size="small">Active Users: 0</Card>

                    <Card size="small">Revenue: $0</Card>
                </Flex>

                <Button
                    danger
                    block
                    style={{
                        marginTop: 24,
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Card>
        </Flex>
    );
}
