import Link from "next/link";
import 'tailwindcss/tailwind.css';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Library Management System Dashboard
        </h1>
        <Link legacyBehavior href="/dashboard">
          <a className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
            Go to Dashboard
          </a>
        </Link>
      </div>
    </div>
  );
}
