'use client';

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllHarapan } from "@/app/services/helper";

export default function HarapanRender() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const yearQuery = searchParams.get("year");
  const hasYearQuery = !!yearQuery;

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  // ================= FETCH DATA =================
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllHarapan();
        if (!res?.success) throw new Error();
        if (!res?.success) { console.log(res) };
        setData(res.data);
        setStatus("loaded");
      } catch (err){
        console.log(err)
        setStatus("error");
      }
    }
    fetchData();
  }, []);

  // ================= GROUP BY YEAR =================
  const groupedByYear = useMemo(() => {
    const map = {};
    data.forEach(item => {
      const year = new Date(item.createdAt).getFullYear();
      if (!map[year]) map[year] = [];
      map[year].push(item);
    });
    return map;
  }, [data]);

  const yearOptions = Object.keys(groupedByYear).sort((a, b) => b - a);

  const selectValue = hasYearQuery ? yearQuery : "all";
  const selectValueKhusus = hasYearQuery ? yearQuery : "-- Pilih tahun --";

  function changeYear(value) {
    if (value === "all") {
      router.push("/harapan");
    } else {
      router.push(`/harapan?year=${value}`);
    }
  }

  function gridCols(len) {
    if (len >= 4) return "grid-cols-4";
    if (len === 3) return "grid-cols-3";
    if (len === 2) return "grid-cols-2";
    return "grid-cols-1";
  }

  if (status === "loading") {
    return <p className="text-center mt-6">Memuat data...</p>;
  }

  if (status === "error") {
    return <p className="text-center text-red-500">Gagal memuat data</p>;
  }

  return (
    <div className="flex flex-col items-center gap-2 mt-2">

      {/* ================= FILTER MODE ================= */}
      {hasYearQuery && (
        <>
          {groupedByYear[yearQuery]?.length > 0 ? (
            <>
              <select
                className="select select-bordered"
                value={selectValue}
                onChange={e => changeYear(e.target.value)}
              >
                <option value="" disabled>-- Pilih tahun --</option>
                <option value="all">Semua tahun</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <h2 className="text-3xl font-semibold text-center mt-5">
                Lihat kembali harapan-harapan di tahun {yearQuery}
              </h2>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-center">
                Wah, gaada nih! Coba cek tahun lainnya
              </p>

              <select
                className="select select-bordered"
                value={selectValueKhusus}
                onChange={e => changeYear(e.target.value)}
              >
                <option value="" disabled>-- Pilih tahun --</option>
                <option value="all">Semua tahun</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </>
          )}

          {groupedByYear[yearQuery]?.length > 0 && (
            <div
              className={`grid grid-cols-1 md:${gridCols(groupedByYear[yearQuery].length)} gap-4 w-full max-w-5xl justify-center mt-4`}
            >
              {groupedByYear[yearQuery].slice(0, 14).map(item => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4 shadow-sm h-full flex flex-col"
                >
                  <p className="font-semibold">{item.sender}</p>

                  <p className="mt-3 flex-1">{item.msg}</p>

                  <span className="text-xs text-gray-400 mt-3">
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

{/* ================= FULL YEAR MODE ================= */}
{!hasYearQuery && (
  <>
    {yearOptions?.length > 0 ? (
      <>
        <select
          className="select select-bordered"
          value={selectValue}
          onChange={(e) => changeYear(e.target.value)}
        >
          <option value="" disabled>
            -- Pilih tahun --
          </option>
          <option value="all">Semua tahun</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {yearOptions.map((year) => (
          <div key={year} className="w-full max-w-5xl space-y-4 mt-3">
            <h2 className="text-2xl font-bold">{year}</h2>

            <div
              className={`grid grid-cols-1 md:${gridCols(
                groupedByYear[year].length
              )} gap-4 justify-center mt-3`}
            >
              {groupedByYear[year].slice(0, 14).map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4 shadow-sm h-full flex flex-col"
                >
                  <p className="font-semibold">{item.sender}</p>

                  <p className="mt-3 flex-1">{item.msg}</p>

                  <span className="text-xs text-gray-400 mt-3">
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    ) : (
      <p className="text-gray-500 text-center">
        Wah, gaada nih! Yuk, jadi yang pertama!
      </p>
    )}
  </>
)}
    </div>
  );
}
