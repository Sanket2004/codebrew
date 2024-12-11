import "./globals.css";
import { Providers } from "./provider";
import { Space_Grotesk } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const crimson = Space_Grotesk({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["variable"],
});

export const metadata = {
  title: "CodeBrew - Online Compiler",
  description:
    "CodeBrew is an all-in-one online coding platform. Write, compile, and collaborate on projects seamlessly in your browser.",
  keywords:
    "online compiler, code editor, programming, JavaScript, Python, Java, coding platform, CodeBrew",
  author: "Sanket Banerjee",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={crimson.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
