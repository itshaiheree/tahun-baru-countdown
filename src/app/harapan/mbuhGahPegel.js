'use client';

import { useState, useEffect } from "react";
import { getAllHarapan } from "@/app/services/helper";

export default function HarapanRender() {
  const [res, setRes] = useState(null);
  const [statusData, setStatusData] = useState("loading");

  useEffect(() => {
    async function start() {
      try {
        const data = await getAllHarapan();

        if (!data?.success) {
          setStatusData("error");
          return;
        }

        setRes(data);
        setStatusData("loaded");
      } catch (err) {
        setStatusData("error");
      }
    }

    start();
  }, []);

  function renderContent() {
    const lengthData = res?.data?.length ?? 0;

    if (statusData === "loading") {
      return <p className="text-gray-500 mt-4">Memuat data harapan...</p>;
    }

    if (statusData === "error") {
      return (
        <div className="p-6 text-red-500">
          Gagal memuat data harapan
        </div>
      );
    }

    if (lengthData > 0) {
      return res.data.map((item) => (
        <div
          key={item._id}
          className="border rounded-xl p-4 shadow-sm"
        >
          <p className="font-semibold">{item.sender}</p>
          <p className="text-gray-700 mt-1">{item.msg}</p>

          <span className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleString("id-ID")}
          </span>
        </div>
      ));
    }

    return <p className="text-gray-500 mt-4">Belum ada nih... Jadi orang yang pertama, yuk!</p>;
  }

  return renderContent();
}