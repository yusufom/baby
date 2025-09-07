import "./globals.css";
import { QueryClientProvider } from "./providers";
import '@mantine/core/styles.css';

export const metadata = {
  title: "Hannah Baby Registry",
  description: "Hannah's baby shower registry app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
