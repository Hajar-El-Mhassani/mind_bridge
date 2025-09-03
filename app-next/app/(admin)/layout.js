import SideBar from "@/components/SideBar/SideBar";
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
          <div>
            <SideBar />
          </div>
          <div className={styles.adminContentPanel}>{children}</div>
        </div>
      </body>
    </html>
  );
}
