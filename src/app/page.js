import Link from "next/link";
import { changeAllStatus } from "./action";

export default async function Home() {
  // const status = await changeAllStatus();
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 gap-4">
      <Link
        href="/annotation-tool"
        className="bg-blue-600 border-none p-3 rounded-md text-white text-xl w-1/4 text-center"
        type="button"
      >
        Start Annotation
      </Link>
      <Link
        href="/annotated-list"
        className="bg-blue-600 border-none p-3 rounded-md text-white text-xl w-1/4 text-center"
        type="button"
      >
        Check Annotations
      </Link>
    </main>
  );
}
