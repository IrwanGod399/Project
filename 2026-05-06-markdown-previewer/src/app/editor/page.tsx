"use client";

import { useEffect, useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";

export default function EditorPage() {
  const [templateContent, setTemplateContent] = useState<string | undefined>(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("md-template");
    if (saved) {
      setTemplateContent(saved);
      sessionStorage.removeItem("md-template");
    }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-[#0f1117]">
        <div className="text-slate-500 text-sm">Loading editor...</div>
      </div>
    );
  }

  return <MarkdownEditor initialValue={templateContent} />;
}
