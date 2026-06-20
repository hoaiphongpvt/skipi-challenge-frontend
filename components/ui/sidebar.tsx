import Sider from 'antd/es/layout/Sider';
import {
    BookOutlined,
    HomeOutlined,
    MessageOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useUserStore } from '@/store/userStore';
import { usePathname, useRouter } from 'next/navigation';

function SidebarComponent() {
    const user = useUserStore((state) => state.user);
    const router = useRouter()
    const pathname = usePathname();

    const items = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: <HomeOutlined />,
            role: ['instructor', 'student'],
            link: '/dashboard'
        },
        {
            key: 'students',
            label: 'Manage Students',
            icon: <UserOutlined />,
            role: ['instructor'],
            link: '/students'
        },
        {
            key: 'lessons',
            label:
            user?.role === "instructor"
                ? "Manage Lessons"
                : "My Lessons",
            icon: <BookOutlined />,
            role: ['instructor', 'student'],
            link: '/lessons'
        },
        {
            key: 'messages',
            label: 'Messages',
            icon: <MessageOutlined />,
            role: ['instructor', 'student'],
            link: '/messages'
        },
    ];

    const menuItems = items.filter((item) =>
        item.role.includes(user?.role ?? '')
    );

    return (
        <Sider
            width={240}
            theme="light"
            style={{
                background: '#fff',
                position: 'fixed',
                left: 0,
                top: 64,
                bottom: 0,
                height: 'calc(100vh - 64px)',
            }}
        >
            <Menu
                mode="inline"
                selectedKeys={[pathname.split("/").pop() as string]}
                style={{ height: '100%', borderRight: 0, paddingTop: 16 }}
                items={menuItems}
                onClick={({ key }) => {
                    const item = menuItems.find(
                        item => item.key === key
                    );

                    if (item) {
                        router.push(item.link);
                    }
                }}
            />
        </Sider>
    );
}

export default SidebarComponent;
