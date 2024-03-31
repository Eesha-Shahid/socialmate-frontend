import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../styles/globals.css";
import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "SocialMate",
  description: "FYP Project",
  icons: '/images/logo.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ReduxProvider>
        <AntdRegistry>  
            {children}
        </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
