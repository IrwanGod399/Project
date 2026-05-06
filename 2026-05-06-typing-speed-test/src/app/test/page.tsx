"use client";

import { Suspense } from "react";
import TypingTest from "@/components/TypingTest";

export default function TestPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">Loading...</div>}>
      <TypingTest />
    </Suspense>
  );
}
