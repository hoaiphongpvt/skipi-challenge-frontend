'use client';

import HeaderComponent from '@/components/ui/header';
import SidebarComponent from '@/components/ui/sidebar';
import { useUserStore } from '@/store/userStore';
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const { Sider, Content } = Layout;

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useUserStore((state) => state.user);
    const hydrated = useUserStore.persist.hasHydrated();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!hydrated) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderComponent />
            <Layout>
                <Sider width={250} theme="light">
                    <SidebarComponent />
                </Sider>

                <Layout>
                    <Content
                        style={{
                            padding: 24,
                            overflow: 'auto',
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
