import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import remarkMath from "remark-math";

export default function ProblemRender({ data }: { data: any }) {
    return (
        <div className="prose">
            <ReactMarkdown
                children={data.content}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeSanitize, rehypeKatex]}
                skipHtml
            />
        </div>
    );
}
