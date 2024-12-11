import "./globals.css";
import { Providers } from "./provider";
import { Crimson_Pro } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const geist = Crimson_Pro({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["variable"]
});

export const metadata = {
  title: "CodeBrew - Online Compiler",
  description:
    "CodeBrew is an all-in-one online coding platform. Write, compile, and collaborate on projects seamlessly in your browser.",
  keywords:
    "online compiler, code editor, programming, JavaScript, Python, Java, coding platform, CodeBrew",
  author: "Sanket Banerjee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
