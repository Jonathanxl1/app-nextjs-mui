import DrawerLeft from "@/components/Drawer";
import Navbar from "@/components/Navbar";
import { theme } from "@/theme/appTheme";
import { ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Fortex Design - App Types and Properties",
  description: "System administrative to create types and/or properties",
};

const RobotSans = Roboto({
  style: "normal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={RobotSans.className}>
        <ThemeProvider theme={theme}>
          <Navbar />
          {children}
          <DrawerLeft></DrawerLeft>
        </ThemeProvider>
      </body>
    </html>
  );
}
