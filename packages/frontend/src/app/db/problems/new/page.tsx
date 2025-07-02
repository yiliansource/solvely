"use client";

import ProblemRender from "@/components/problem-render";
import { getApiUrl } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function NewProblemPage() {
    const router = useRouter();

    const [content, setContent] = useState("");
    const [tagString, setTagString] = useState("");
    const [source, setSource] = useState("");
    const [formError, setFormError] = useState("");

    const processOCRInputImage = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const problemImage = (e.target as HTMLInputElement).files?.[0];
        if (!problemImage) return;

        const formData = new FormData();
        formData.append("inputImage", problemImage);

        try {
            const res = await fetch(getApiUrl("/llms/image-to-problem-text/"), {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (res.ok) {
                const { result } = await res.json();
                setContent(content + " \n" + result);
            } else {
                const error = await res.json();
                setFormError(error.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                setFormError(error.message);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(getApiUrl("/problems/new/"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content,
                    source,
                    tags: tagString
                        .split(",")
                        .map((k) => k.trim())
                        .filter(Boolean),
                }),
                credentials: "include",
            });

            if (res.ok) {
                const problemId = (await res.json()).id;
                router.push(`/db/problems/${problemId}`);
            } else {
                const error = await res.json();
                setFormError(error.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                setFormError(error.message);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Problem content</label>
                <br />
                <textarea
                    value={content}
                    placeholder="Problem content here"
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                Or upload an image to automatically convert to markdown and LaTeX.
                <br />
                <label>Problem preview</label>
                <br />
                <ProblemRender data={{ content }} />
                <br />
                <input name="ocrInputImage" type="file" onChange={processOCRInputImage} />
                <br />
                <label>tags</label>
                <br />
                <input
                    value={tagString}
                    placeholder="(comma separated keywords)"
                    onChange={(e) => setTagString(e.target.value)}
                ></input>
                <br />
                <label>source</label>
                <br />
                <input value={source} placeholder="original" onChange={(e) => setSource(e.target.value)}></input>
                <br />
                <label>Error: {formError}</label>
                <br />
                <button type="submit">Create new problem</button>
            </form>
        </div>
    );
}
