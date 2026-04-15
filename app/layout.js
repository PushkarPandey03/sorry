import "./globals.css";

export const metadata = {
  title: "For Dixita",
  description: "A romantic apology website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
