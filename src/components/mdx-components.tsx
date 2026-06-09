import Image from "next/image";

export const mdxComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-3xl font-display font-medium text-white mb-3 leading-tight">
            {children}
        </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mt-10 mb-4">
            {children}
        </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className="text-base font-medium text-zinc-300 mt-6 mb-2">{children}</h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
        <p className="text-zinc-400 leading-relaxed mb-4 text-[15px]">{children}</p>
    ),
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
        <a
            href={href}
            className="text-zinc-300 underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-400 transition-colors"
        >
            {children}
        </a>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5 rounded text-[13px] font-mono border border-zinc-700/50">
            {children}
        </code>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
        <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 overflow-x-auto mb-6 text-sm leading-relaxed">
            {children}
        </pre>
    ),
    table: ({ children }: { children: React.ReactNode }) => (
        <div className="overflow-x-auto my-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
            <table className="w-full text-sm border-collapse text-left">{children}</table>
        </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
        <thead className="border-b border-zinc-800">
            {children}
        </thead>
    ),
    tbody: ({ children }: { children: React.ReactNode }) => (
        <tbody className="divide-y divide-zinc-800/60">{children}</tbody>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
        <tr className="transition-colors duration-100 hover:bg-zinc-800/20">{children}</tr>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {children}
        </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
        <td className="px-5 py-3 text-zinc-300 align-middle">{children}</td>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="space-y-2 mb-6 text-[15px] text-zinc-400 list-none">{children}</ul>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="flex gap-2.5 leading-relaxed before:content-['–'] before:text-zinc-600 before:shrink-0 before:mt-0">
            {children}
        </li>
    ),
    hr: () => <hr className="border-zinc-800 my-10" />,
    strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="text-zinc-200 font-medium">{children}</strong>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-2 border-zinc-700 pl-4 text-zinc-500 italic my-6">
            {children}
        </blockquote>
    ),
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
        const src = props.src as string | undefined;
        return (
            <span className="block my-6">
                <Image
                    src={src ?? ""}
                    alt={props.alt ?? ""}
                    width={800}
                    height={450}
                    loading="eager"
                    className="rounded-xl w-full h-auto border border-zinc-800"
                />
                {props.alt && (
                    <span className="block text-xs text-zinc-600 mt-2 text-center">
                        {props.alt}
                    </span>
                )}
            </span>
        );
    },
};