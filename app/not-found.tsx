import Link from 'next/link';

export default async function NotFound() {
  return (
    <html>
      <body>
        <main className="min-h-screen bg-base-200">
          <div className="container">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
