import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl mb-8">Home Page</h1>
      <div className="flex space-x-4">
        <Link href="/sign-in">
          <button className="bg-gray-800 text-white px-4 py-2 rounded">Sign In</button>
        </Link>
        <Link href="/register">
          <button className="bg-white text-black px-4 py-2 rounded">Register</button>
        </Link>
      </div>
    </main>
  );
}
