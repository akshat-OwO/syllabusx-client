import { Icons } from '@/components/Icons';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'SyllabusX';

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#000000',
                }}
            >
                <Icons.x style={{ height: '10rem', width: '10rem' }} />
            </div>
        ),
        { ...size }
    );
}
