
import "./globals.css";

export const metadata = {
  title: "Events GEC",
  description: "Event listing platform for GECT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        {children}
      </body>
    </html>
  );
}
