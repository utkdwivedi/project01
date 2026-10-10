import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project01 | Delivery Foundation",
  description: "A small application demonstrating a repeatable, containerized delivery workflow.",
  applicationName: "Project01"
};

export const viewport: Viewport = {
  themeColor: "#101412",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
