import "./globals.css";
import { ReactNode } from "react";

import { Toaster } from "react-hot-toast";

import Providers from "./providers";

export const metadata = {
  title: "AI Business Intelligence Platform",
  description: "AI-powered Business Intelligence SaaS",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>

          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

        </Providers>
      </body>
    </html>
  );
}