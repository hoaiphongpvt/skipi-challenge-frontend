import Sider from 'antd/es/layout/Sider';
import {
    BookOutlined,
    FileAddOutlined,
    HomeOutlined,
    MessageOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useUserStore } from '@/store/userStore';
import { usePathname, useRouter } from 'next/navigation';

function SidebarComponent() {
    const user = useUserStore((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();

    const items = [
        {
            key: '/students',
            label: 'Manage Students',
            icon: <UserOutlined />,
            role: ['instructor'],
            link: '/students',
        },
        {
            key: '/lessons',
            label: 'Manage Lessons',
            icon: <BookOutlined />,
            role: ['instructor'],
            link: '/lessons',
        },
        {
            key: '/lessons/my-lesson',
            label: 'My Lessons',
            icon: <BookOutlined />,
            role: ['student'],
            link: '/lessons/my-lesson',
        },
        {
            key: '/lessons/assign-lesson',
            label: 'Assign Lessons',
            icon: <FileAddOutlined />,
            role: ['instructor'],
            link: '/lessons/assign-lesson',
        },
        {
            key: '/messages',
            label: 'Messages',
            icon: <MessageOutlined />,
            role: ['instructor', 'student'],
            link: '/messages',
        },
    ];

    const activeKey =
        [...items]
            .sort((a, b) => b.link.length - a.link.length)
            .find((item) => pathname.startsWith(item.link))?.key || '';

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
                selectedKeys={[activeKey]}
                style={{ height: '100%', borderRight: 0, paddingTop: 16 }}
                items={menuItems}
                onClick={({ key }) => {
                    const item = menuItems.find((item) => item.key === key);

                    if (item) {
                        router.push(item.link);
                    }
                }}
            />
        </Sider>
    );
}

export default SidebarComponent;
