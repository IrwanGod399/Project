import TypingTest from "@/components/TypingTest";

export default function TestPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Typing Test</h1>
        <p className="text-slate-500">
          Select a difficulty, click the text area, and start typing. Your timer starts on your first keystroke.
        </p>
      </div>
      <TypingTest />
    </div>
  );
}
