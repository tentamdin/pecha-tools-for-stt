import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 gap-4">
      <Link
        href="/annotation"
        className="bg-blue-600 border-none p-3 rounded-md text-white text-xl w-1/4 text-center"
        type="button"
      >
        Start Annotation
      </Link>
      <Link
        href="/annotated"
        className="bg-blue-600 border-none p-3 rounded-md text-white text-xl w-1/4 text-center"
        type="button"
      >
        Check Annotations
      </Link>
    </main>
  );
}
