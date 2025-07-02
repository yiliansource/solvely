import ProblemRender from "@/components/problem-render";
import { getApiUrl } from "@/lib/api";

export default async function ProblemPage({ params }: { params: { problemId: string } }) {
    const res = await fetch(getApiUrl(`/problems/${params.problemId}`));
    const problem = await res.json();

    return <ProblemRender data={problem} />;
}
