import { Suspense } from "react";
import BrowseClient from "./BrowseClient";

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32 text-gray-400">
          Loading recipes...
        </div>
      }
    >
      <BrowseClient />
    </Suspense>
  );
}
