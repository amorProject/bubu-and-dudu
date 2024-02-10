"use client";

import { Button } from "../ui/button";

export default function Error() {
  return (
    <div className="h-screen w-screen justify-center items-center flex flex-col inset-0">
      <h1>Page not found</h1>
      <Button variant="accent" size="lg" onClick={() => window.history.back()}>
        Go back
      </Button>
    </div>
  );
}
