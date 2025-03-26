import Image from "next/image";
import Link from "next/link";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="root-layout">
      <nav className="">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className="text-light-100 font-semibold font-mona-sans text-[28px] leading-[32px]">
            Prepwise
          </h2>
        </Link>
      </nav>
      {children}
    </section>
  );
};

export default RootLayout;
