import { AtSign, Instagram } from 'lucide-react';
import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    return (
        <div className="absolute w-full grid place-items-center bottom-0 bg-neutral-900/80 rounded-lg p-2">
            <div className="grid place-items-center w-full gap-1 bg-neutral-800/80 rounded-lg p-2 mb-2">
                <div className="text-xs flex gap-1">
                    <span>For Future Updates!</span>
                    <p className="text-xs flex gap-1">
                        <a
                            className="flex gap-1 hover:text-teal-700 transition"
                            href="https://www.instagram.com/syllabusx_.live/"
                            target="_blacnk"
                        >
                            Follow us on <Instagram className="w-4 h-4" />
                        </a>
                    </p>
                </div>
            </div>
            <div className="relative grid place-items-center w-full gap-3 bg-neutral-800/80 rounded-lg p-2">
                <p className="text-sm">Made with ♡</p>
                <div className="flex gap-2">
                    <a
                        className="text-xs flex gap-1 hover:text-teal-700 transition"
                        href="https://linktr.ee/akshatOwO"
                        target="_blank"
                    >
                        <AtSign className="h-4 w-4" />
                        akshat
                    </a>
                    <a
                        className="text-xs flex gap-1 hover:text-teal-700 transition"
                        href="https://linktr.ee/shouryapal"
                        target="_blank"
                    >
                        <AtSign className="h-4 w-4" />
                        shourya
                    </a>
                    <a
                        className="text-xs flex gap-1 hover:text-teal-700 transition"
                        href="https://linktr.ee/yom4n"
                        target="_blank"
                    >
                        <AtSign className="h-4 w-4" />
                        sparsh
                    </a>
                </div>
                <p className="absolute text-xs opacity-0 hover:opacity-100 transition bottom-2 right-2">
                    V3.0
                </p>
            </div>
        </div>
    );
};

export default Footer;
