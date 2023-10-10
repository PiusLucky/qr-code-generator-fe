"use client";

import { apiClient } from "@/api";
import apiResources from "@/api/resources";
import { IQRCode } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [qrCode, setQrCode] = useState<IQRCode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const data = await apiClient.get<IQRCode>(apiResources.movies, "/");
      setQrCode(data);
      setLoading(false);
    }

    fetch();

    const intervalId = setInterval(() => {
      fetch();
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex  flex-col items-center justify-between p-24 bgHome">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Smart QR Generator
        </p>
      </div>

      <div className="mt-16">
        {loading ? (
          <div className="h-[180px]">Loading...</div>
        ) : (
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src={qrCode?.result as string}
            alt="QR code"
            width={180}
            height={180}
            priority
          />
        )}
      </div>
    </main>
  );
}
