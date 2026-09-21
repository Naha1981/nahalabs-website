import React, { useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

type RecordItem = {
  id: string;
  title: string;
  status: string;
  format: string;
  heroImageUrl: string | null;
  videoUrl: string | null;
};

export const ContentMediaUploader: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [message, setMessage] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const loadRecords = async () => {
    const response = await fetch("/api/content-records");
    if (!response.ok) throw new Error("Unable to load content records");
    const data = await response.json();
    setRecords(data.records || []);
    if (!selectedId && data.records?.[0]?.id) setSelectedId(data.records[0].id);
  };

  useEffect(() => {
    loadRecords().then(() => setAuthenticated(true)).catch(() => setAuthenticated(false));
  }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/content-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      setMessage("Incorrect password.");
      return;
    }

    setAuthenticated(true);
    setPassword("");
    await loadRecords();
  };

  const uploadMedia = async (kind: "image" | "video") => {
    const file = (kind === "image" ? imageRef.current?.files?.[0] : videoRef.current?.files?.[0]);
    if (!file || !selectedId) {
      setMessage("Choose an article and a file first.");
      return;
    }

    const field = kind === "image" ? "Hero Image URL" : "Video URL";
    const key = kind + "-" + selectedId;
    setMessage("Uploading " + file.name + "…");

    try {
      const result = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/content-upload",
        clientPayload: JSON.stringify({ pageId: selectedId, field }),
        multipart: kind === "video" && file.size > 50 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => {
          setProgress((current) => ({ ...current, [key]: Math.round(percentage) }));
        }
      });

      setMessage((kind === "image" ? "Hero image" : "Video") + " uploaded successfully.");
      setProgress((current) => ({ ...current, [key]: 100 }));
      await loadRecords();
      window.history.replaceState({}, "", window.location.pathname);
      console.log("Uploaded media URL:", result.url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#080909] text-[#F3F0EA] flex items-center justify-center px-5">
        <form onSubmit={login} className="w-full max-w-md rounded-2xl border border-[#24262a] bg-[#0d0e10] p-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82]">NahaLabs Content</div>
          <h1 className="mt-3 text-3xl font-semibold">Media uploader</h1>
          <p className="mt-3 text-sm leading-6 text-[#A5A29B]">Upload your own hero image or video. The selected media becomes the source of truth for that content item.</p>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Content admin password"
            className="mt-6 w-full rounded-xl border border-[#2b2d35] bg-[#080909] px-4 py-3 text-sm outline-none"
          />
          <button className="mt-4 w-full rounded-xl bg-[#C8AE82] px-4 py-3 text-sm font-semibold text-[#080909]">
            Enter
          </button>
          {message && <p className="mt-4 text-sm text-[#d7d3ca]">{message}</p>}
        </form>
      </div>
    );
  }

  const selected = records.find((record) => record.id === selectedId);

  return (
    <div className="min-h-screen bg-[#080909] text-[#F3F0EA] px-5 py-10 sm:px-8">
      <main className="mx-auto max-w-5xl">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82]">NahaLabs Content</div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Media uploader</h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-[#A5A29B]">
              Choose an article, upload your own image/video, and the Content Engine will use your media instead of generating replacement media.
            </p>
          </div>
          <a href="/insights" className="text-xs font-mono uppercase tracking-[0.16em] text-[#C8AE82]">Open Insights</a>
        </div>

        <section className="mt-10 rounded-2xl border border-[#24262a] bg-[#0d0e10] p-6">
          <label className="text-xs font-mono uppercase tracking-[0.16em] text-[#8d8982]">Content item</label>
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="mt-3 w-full rounded-xl border border-[#2b2d35] bg-[#080909] px-4 py-3 text-sm"
          >
            {records.map((record) => (
              <option key={record.id} value={record.id}>
                {record.title} — {record.status}
              </option>
            ))}
          </select>

          {selected && (
            <div className="mt-4 grid gap-2 text-xs text-[#A5A29B]">
              <div>Hero image: {selected.heroImageUrl ? "attached" : "not attached"}</div>
              <div>Video: {selected.videoUrl ? "attached" : "not attached"}</div>
            </div>
          )}
        </section>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-[#24262a] bg-[#0d0e10] p-6">
            <h2 className="text-xl font-semibold">Your hero image</h2>
            <p className="mt-2 text-sm leading-6 text-[#A5A29B]">JPG, PNG, WebP or AVIF. Up to 15 MB.</p>
            <input ref={imageRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="mt-6 block w-full text-sm" />
            <button onClick={() => uploadMedia("image")} className="mt-4 rounded-xl bg-[#C8AE82] px-4 py-3 text-sm font-semibold text-[#080909]">
              Upload image
            </button>
            <p className="mt-3 text-xs text-[#8d8982]">Progress: {progress["image-" + selectedId] || 0}%</p>
          </section>

          <section className="rounded-2xl border border-[#24262a] bg-[#0d0e10] p-6">
            <h2 className="text-xl font-semibold">Your video</h2>
            <p className="mt-2 text-sm leading-6 text-[#A5A29B]">MP4, WebM or MOV. Up to 500 MB. Large videos use multipart upload.</p>
            <input ref={videoRef} type="file" accept="video/mp4,video/webm,video/quicktime" className="mt-6 block w-full text-sm" />
            <button onClick={() => uploadMedia("video")} className="mt-4 rounded-xl bg-[#C8AE82] px-4 py-3 text-sm font-semibold text-[#080909]">
              Upload video
            </button>
            <p className="mt-3 text-xs text-[#8d8982]">Progress: {progress["video-" + selectedId] || 0}%</p>
          </section>
        </div>

        {message && (
          <div className="mt-6 rounded-xl border border-[#24262a] bg-[#0d0e10] p-4 text-sm text-[#D7D3CA]">
            {message}
          </div>
        )}
      </main>
    </div>
  );
};
