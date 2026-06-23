import { Layout, Avatar, Badge, Flex, Dropdown } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    LogoutOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { useUserStore } from '@/store/userStore';

function HeaderComponent() {
    const { Header } = Layout;
    const user = useUserStore((state) => state.user);
    const items = [
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            label: 'Profile',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
        },
    ];

    const handleLogout = useUserStore((state) => state.logout);

    return (
        <Header
            style={{
                background: '#fff',
                padding: '0 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f0f0f0',
                height: 64,
                position: 'fixed',
                top: 0,
                zIndex: 1000,
                width: '100%',
            }}
        >
            <div
                style={{
                    width: 140,
                    height: 40,
                    backgroundColor: '#d9d9d9',
                    borderRadius: 4,
                }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <Badge count={1} size="small" offset={[2, 0]}>
                    <BellOutlined
                        style={{
                            fontSize: 20,
                            color: '#595959',
                            cursor: 'pointer',
                        }}
                    />
                </Badge>
                <Dropdown
                    menu={{
                        items,
                        onClick: ({ key }) => {
                            if (key === 'logout') {
                                handleLogout();
                            }

                            if (key === 'profile') {
                                console.log('profile');
                            }
                        },
                    }}
                    trigger={['hover']}
                >
                    <Flex
                        align="center"
                        gap={12}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <Avatar
                            icon={<UserOutlined />}
                            style={{
                                backgroundColor: '#8c8c8c',
                            }}
                        />

                        <p style={{ margin: 0 }}>{user?.name}</p>
                    </Flex>
                </Dropdown>
            </div>
        </Header>
    );
}

export default HeaderComponent;
