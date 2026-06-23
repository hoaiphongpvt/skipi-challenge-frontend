import { Spin } from 'antd';

function Loading() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Spin />
        </div>
    );
}

export default Loading;
