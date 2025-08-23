import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - FMCB',
  description: 'Administrative panel for Free Methodist Church of Bethlehem',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background">{children}</div>
      </body>
    </html>
  );
}
