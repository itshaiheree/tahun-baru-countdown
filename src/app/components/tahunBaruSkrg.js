"use client"

import { useRef, useState, useEffect } from "react";

export default function TahunBaruSekarang() {
const [tahun, setTahun] = useState("Loading...");

useEffect(() => {
// Bagian date
const d = new Date();
let yearNow = d.getUTCFullYear() + 1;

  setTahun(yearNow);
}, []);
    return (
        <h1 className={`text-xl md:text-2xl leading-tight ${(new Date().getDate() === 1 && new Date().getMonth() === 0 ? 'hidden' : '')}`}>Tahun {tahun} tinggal...</h1>
    );
}