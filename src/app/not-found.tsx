import Link from "next/link";


export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a0f2c] to-[#111c44] text-white">
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        {/* Error Code */}
        <h1 className="text-6xl font-extrabold text-blue-400 mb-4">0x194</h1>
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">
          Connection Error: Page Not Found
        </h2>
        {/* Description */}
        <p className="text-gray-300 max-w-lg mb-6">
          Oops! Our engineers detected a <span className="text-blue-300">0 Ω</span> resistance in the circuit. 
          Looks like this connection has violated Ohm&apos;s Law!
        </p>
        {/* Error Card */}
        <div className="bg-[#1c2541] border border-blue-500 rounded-lg p-4 max-w-md w-full mb-6 shadow-lg text-left">
          <p className="text-yellow-400 font-mono">
            ERROR: 404 Not Found
          </p>
          <p className="text-gray-300 font-mono">
            CAUSE: Webpage oscillator operating at unexpected frequency
          </p>
          <p className="text-green-400 font-mono">
            REMEDY: Return to homepage and recalibrate
          </p>
        </div>
        {/* Proverb */}
        <p className="italic text-sm text-gray-400 mb-8">
          In theory, theory and practice are the same. In practice, they are not.
          Engineering Proverb
        </p>
        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-5 py-2 bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Return to Homepage
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2 bg-gray-700 rounded-lg shadow hover:bg-gray-800 transition"
          >
            Visit Our Blog
          </Link>
        </div>
      </main>
      
    </div>
  );
}