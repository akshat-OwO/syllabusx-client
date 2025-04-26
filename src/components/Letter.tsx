import LayoutWrapper from "@/layouts/LayoutWrapper";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FC } from "react";

interface LetterProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
}

const Letter: FC<LetterProps> = ({ content }) => {
    return (
        <LayoutWrapper className="py-20">
            <div className="flex flex-col justify-center gap-10">
                <div className="prose prose-neutral self-center dark:prose-invert">
                    <h3 className="text-center">
                        {content ? content.contentTitle : null}
                    </h3>
                </div>
                {content ? (
                    <div className="prose prose-neutral mx-auto rounded-md bg-accent p-3.5 dark:prose-invert">
                        {documentToReactComponents(content.letter)}
                    </div>
                ) : null}
            </div>
        </LayoutWrapper>
    );
};

export default Letter;
