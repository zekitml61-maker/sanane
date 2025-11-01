export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Next.js fonctionne !</h1>
        <p className="text-gray-700 mb-4">
          Si vous voyez cette page, le serveur fonctionne correctement.
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✅ Next.js: OK</li>
          <li>✅ TypeScript: OK</li>
          <li>✅ Tailwind CSS: OK</li>
          <li>✅ App Router: OK</li>
        </ul>
        <div className="mt-6">
          <a href="/" className="text-blue-600 hover:underline">
            → Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
