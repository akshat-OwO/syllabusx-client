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
            'Embark on a journey of academic simplicity with SyllabusX. Your one-stop hub for Guru Gobind Singh Indraprastha University (GGSIPU) syllabi and study materials. Navigate seamlessly through courses, collaborate with a vibrant community, and redefine your education experience. Join us at SyllabusX and make student life hassle-free!',
        applicationName: 'SyllabusX',
        keywords: [
            'SyllabusX',
            'syllabus x',
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
        openGraph: {
            title: 'SyllabusX',
            description:
                'Embark on a journey of academic simplicity with SyllabusX. Your one-stop hub for Guru Gobind Singh Indraprastha University (GGSIPU) syllabi and study materials. Navigate seamlessly through courses, collaborate with a vibrant community, and redefine your education experience. Join us at SyllabusX and make student life hassle-free!',
            url: 'https://syllabusx.live',
            siteName: 'SyllabusX',
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            title: 'SyllabusX',
            description:
                'Embark on a journey of academic simplicity with SyllabusX. Your one-stop hub for Guru Gobind Singh Indraprastha University (GGSIPU) syllabi and study materials. Navigate seamlessly through courses, collaborate with a vibrant community, and redefine your education experience. Join us at SyllabusX and make student life hassle-free!',
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
