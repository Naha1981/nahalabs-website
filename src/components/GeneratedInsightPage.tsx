import React, { useEffect, useState } from "react";

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

type Bundle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  product: string;
  datePublished: string;
  cta: string;
  mediaAltText: string;
  blocks: Block[];
  sources: { title: string; url: string; note: string }[];
  heroImageUrl?: string | null;
  videoUrl?: string | null;
};

export const GeneratedInsightPage: React.FC<{ slug: string }> = ({ slug }) => {
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [media, setMedia] = useState<{ heroImageUrl?: string | null; videoUrl?: string | null }>({});

  useEffect(() => {
    fetch("/content/generated/" + slug + ".json")
      .then((response) => {
        if (!response.ok) throw new Error("Article not found");
        return response.json();
      })
      .then(setBundle)
      .catch(() => setBundle(null));
  }, [slug]);

  useEffect(() => {
    if (!bundle) return;

    fetch("/api/insight-media?slug=" + encodeURIComponent(bundle.slug))
      .then((response) => response.ok ? response.json() : null)
      .then((latest) => latest && setMedia(latest))
      .catch(() => undefined);

    document.title = bundle.title + " | NahaLabs";

    const description = document.createElement("meta");
    description.name = "description";
    description.content = bundle.description;
    document.head.appendChild(description);

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = "https://nahalabs.co.za/insights/" + bundle.slug;
    document.head.appendChild(canonical);

    return () => {
      description.remove();
      canonical.remove();
    };
  }, [bundle]);

  if (!bundle) {
    return (
      <div className="min-h-screen bg-[#080909] text-[#F3F0EA] flex items-center justify-center">
        Intelligence article not found.
      </div>
    );
  }

  const heroImageUrl = media.heroImageUrl || bundle.heroImageUrl;
  const videoUrl = media.videoUrl || bundle.videoUrl;

  return (
    <div className="min-h-screen bg-[#080909] text-[#F3F0EA]">
      <header className="sticky top-0 z-40 border-b border-[#1b1c1f] bg-[#080909]/92 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A5A29B] hover:text-[#F3F0EA]">NahaLabs</a>
          <a href="/#contact" className="text-[10px] font-mono uppercase tracking-wider font-semibold border border-[#2b2d35] rounded-full px-4 py-2">Start a conversation</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82] mb-5">
            NahaLabs Intelligence · {bundle.category}
          </div>
          <h1 className="text-4xl sm:text-6xl leading-[1.02] font-semibold tracking-[-0.035em]">{bundle.title}</h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#A5A29B]">{bundle.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-[#666]">
            <span>{bundle.datePublished}</span><span>·</span><span>{bundle.product}</span>
          </div>
        </div>

        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt={bundle.mediaAltText}
            className="mt-12 w-full max-h-[560px] object-cover rounded-2xl border border-[#24262a]"
          />
        )}

        <div className="mt-12 max-w-3xl space-y-9 text-[17px] sm:text-[18px] leading-[1.85] text-[#D7D3CA]">
          {bundle.blocks.map((block, index) => {
            if (block.type === "h2") return <h2 key={index} className="text-2xl sm:text-3xl font-semibold text-[#F3F0EA] pt-6">{block.text}</h2>;
            if (block.type === "quote") return <blockquote key={index} className="border-l-2 border-[#C8AE82] pl-6 text-[#F3F0EA] font-medium">{block.text}</blockquote>;
            if (block.type === "ul") return <ul key={index} className="list-disc pl-6 space-y-2">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
            return <p key={index}>{block.text}</p>;
          })}

          {videoUrl && (
            <div className="pt-8">
              <video controls playsInline preload="metadata" className="w-full rounded-2xl border border-[#24262a] bg-black">
                <source src={videoUrl} />
              </video>
            </div>
          )}

          {bundle.sources.length > 0 && (
            <section className="pt-8">
              <h2 className="text-2xl font-semibold text-[#F3F0EA]">Sources</h2>
              <div className="mt-5 space-y-4">
                {bundle.sources.map((source) => (
                  <div key={source.url} className="border-b border-[#24262a] pb-4">
                    <a href={source.url} target="_blank" rel="noreferrer" className="text-[#C8AE82] underline underline-offset-4">{source.title}</a>
                    <p className="text-sm text-[#8d8982] mt-1">{source.note}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="pt-8 border-t border-[#24262a]">
            <p className="text-[#F3F0EA] font-semibold">{bundle.cta}</p>
          </section>
        </div>
      </main>
    </div>
  );
};
