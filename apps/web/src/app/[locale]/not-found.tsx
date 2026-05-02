import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text mb-4">404</h1>
            <p className="text-lg text-text-2 mb-8">Page not found</p>
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go back home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
