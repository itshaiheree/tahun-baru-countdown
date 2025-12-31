"use client";

import { useEffect, useState } from "react";

export default function ShareButtons({ title }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const openShare = (shareUrl) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

    const shareOthers = async () => {
  if (typeof window === "undefined") return;

  const shareData = {
    title: title + " | Bayt Tamyiz",
    text: 'Baca "' + title + '" disini:',
    url: url,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    // === FALLBACK COPY LINK (AMAN) ===
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      alert("Link disalin");
      return;
    }

    // === FALLBACK PALING TERAKHIR ===
    const input = document.createElement("input");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    alert("Link disalin");
  } catch (err) {
    console.error("Share dibatalkan / error:", err);
  }
};

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-2 gap-3 items-center place-self-center justify-self-left text-center btn-md">
      {/* FACEBOOK */}
      <button
        onClick={() =>
          openShare(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`
          )
        }
        className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
      >
        <i className="fa-brands fa-facebook text-white mr-1"></i> Share To Facebook
      </button>

      {/* WHATSAPP */}
      <button
        onClick={() =>
          openShare(
            `https://wa.me/?text=${encodeURIComponent(
              'Baca "' + title + '" disini: ' + url
            )}`
          )
        }
        className="px-3 py-2 rounded bg-green-500 hover:bg-green-600 text-white text-sm"
      >
        <i className="fa-brands fa-whatsapp text-white mr-1"></i> Share To WhatsApp
      </button>

      {/* X / TWITTER */}
      <button
        onClick={() =>
          openShare(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              'Baca "' + title + '" disini:'
            )}&url=${encodeURIComponent(url)}`
          )
        }
        className="px-3 py-2 rounded bg-black hover:bg-neutral-800 text-white text-sm"
      >
        <i className="fa-brands fa-x-twitter text-white mr-1"></i> Share To X/Twitter
      </button>

      {/* LAINNYA */}
      <button
        onClick={shareOthers}
        className="px-3 py-2 rounded bg-gray-800 hover:bg-gray-900 text-white text-sm"
      >
        <i className="fa-solid fa-share-nodes text-white mr-1"></i> Others
      </button>
    </div>
  );
}
