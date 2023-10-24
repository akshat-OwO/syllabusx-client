import { clsx, type ClassValue } from 'clsx';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function constructMetadata(): Metadata {
    return {
        metadataBase: new URL('https://syllabusx.live'),
        title: {
            default: 'SyllabusX',
            template: 'SyllabusX | %s',
        },
        description:
            'SyllabusX is a website that provides the syllabus and study materials for the B. Tech course offered by IPU',
        applicationName: 'SyllabusX',
        keywords: [
            'SyllabusX',
            'Syllabus',
            'IPU Syllabus',
            'IPU',
            'BTech',
            'BCA',
            'Notes',
            'PYQs',
            'Akash',
            'Practicals IPU',
        ],
        viewport: {
            width: 'device-width',
            initialScale: 1,
        },
        openGraph: {
            title: 'SyllabusX',
            description:
                'SyllabusX is a website that provides the syllabus and study materials for the B. Tech course offered by IPU',
            url: 'https://syllabusx.live',
            siteName: 'SyllabusX',
            images: [
                {
                    url: 'https://i.postimg.cc/TKX5Pp3g/Syllabus-X.png',
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            title: 'SyllabusX',
            description:
                'SyllabusX is a website that provides the syllabus and study materials for the B. Tech course offered by IPU',
            images: [
                {
                    url: 'https://i.postimg.cc/TKX5Pp3g/Syllabus-X.png',
                },
            ],
            app: {
                name: 'SyllabusX',
                id: {
                    ipad: '',
                    iphone: '',
                    googleplay: '',
                },
                url: {
                    ipad: 'https://syllabusx.live',
                    iphone: 'https://syllabusx.live',
                },
            },
        },
    };
}
