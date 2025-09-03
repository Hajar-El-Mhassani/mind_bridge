import SideBar from "@/components/SideBar/SideBar";
import "../globals.css";

export const metadata = {
  title: "MindBridge — Share your expertise",
  description:
    "A modern learning platform landing page built with Next.js and CSS Grid.",
  //viewport: "width=device-width, initial-scale=1",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SideBar/>
        {children}
        </body>
    </html>
  );
}
