import SideBar from "@/components/SideBar/SideBar";
import TopBar from "@/components/TopBar/TopBar";
import "../globals.css";
import styles from "@/app/(admin)/admin.module.css";

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
        <div className={styles.adminContainer}>
          <div>
            <SideBar />
          </div>
          <div className={styles.adminContentPanel}>{children}</div>
        </div>
      </body>
    </html>
  );
}
