import LayoutWrapper from '@/layouts/LayoutWrapper';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FC } from 'react';

interface LetterProps {
    content: any;
}

const Letter: FC<LetterProps> = ({ content }) => {
    return (
        <LayoutWrapper className="py-20">
            <div className="flex flex-col gap-10 justify-center">
                <div className="self-center prose dark:prose-invert prose-neutral">
                    <h3 className="text-center">{content ? content.contentTitle : null}</h3>
                </div>
                {content ? (
                    <div className="p-3.5 prose dark:prose-invert prose-neutral mx-auto bg-accent rounded-md">
                        {documentToReactComponents(content.letter)}
                    </div>
                ) : null}
            </div>
        </LayoutWrapper>
    );
};

export default Letter;
