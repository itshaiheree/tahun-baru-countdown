'use client';

import Link from "next/link";
import BagianDate from "./bagianDate";

const d = new Date();
let yearNow = null
let kataKata = null;

if (new Date().getDate() === 1 && new Date().getMonth() === 0) {
yearNow = d.getUTCFullYear() - 1;
kataKata = "";
} else {
yearNow = d.getUTCFullYear() + 1;
kataKata = `Sisa waktu menuju tahun ${yearNow}:`;
}

export default function Header() {

    return (
        <>
        <div className="sticky top-0 z-20 h-19 shadow-md backdrop-blur-sm bg-neutral/90">
        <header className="overflow-x-hidden navbar py-2">

<div className="navbar-start">
  <Link href="/" className="btn btn-circle md:btn-lg btn-md btn-ghost md:ml-5"><i className="fa-solid fa-arrow-left"></i></Link>
</div>
        <div className="navbar-center">
          <div className="flex flex-col gap-0 items-center">
          <p className="mb-1">{kataKata}</p>
    <BagianDate ukuran="text-lg md:text-2xl" tempat="header"/>
    </div>
  </div>
  <div className="navbar-end"></div>
      </header>
      </div>
        </>
    );
}