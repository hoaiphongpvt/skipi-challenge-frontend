'use client';

import HeaderComponent from '@/components/layout/header';
import SidebarComponent from '@/components/layout/sidebar';
import Loading from '@/components/ui/loading';
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
    const _hasHydrated = useUserStore((state) => state._hasHydrated);
    const router = useRouter();

    useEffect(() => {
        if (!_hasHydrated) return;
        if (user === null) {
            router.replace('/login');
        }
    }, [_hasHydrated, user, router]);

    if (!_hasHydrated) {
        return <Loading />;
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
