import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "MindBridge",
  description: "AI-powered educational platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
