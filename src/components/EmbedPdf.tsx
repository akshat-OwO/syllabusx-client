import { FC } from 'react';

interface EmbedPdfProps {
    embed: Embed;
}

const EmbedPdf: FC<EmbedPdfProps> = ({ embed }) => {
    return (
        <div className="grid bg-neutral-800/80 lg:mt-5 rounded-lg p-2">
            <h3 className="text-base lg:text-lg mb-2">{embed.name}</h3>
            <div>
                <iframe src={embed.embedLink} className='w-full h-[50vh] md:h-[75vh]'></iframe>
            </div>
        </div>
    );
};

export default EmbedPdf;
