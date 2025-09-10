import SideBar from "@/components/SideBar/SideBar";
import TopBar from "@/components/TopBar/TopBar";
import FooterBar from "@/components/FooterBar/FooterBar";
import "../globals.css";
import styles from "./admin.module.css";

export const metadata = {
  title: "MindBridge — Share your expertise",
  description:
    "A modern learning platform landing page built with Next.js and CSS Grid.",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.adminContainer}>
          <div className={styles.sidebarContainer}>
            <SideBar />
          </div>
          <div className={styles.adminContentPanel}>
            <TopBar />
            <main className={styles.mainContent}>{children}</main>
            <FooterBar />
          </div>
        </div>
      </body>
    </html>
  );
}
