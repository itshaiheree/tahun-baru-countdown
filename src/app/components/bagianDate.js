"use client"

import { useRef, useState, useEffect } from "react";
import Confetti from "./confetti";

export default function BagianDate({ ukuran, tempat }) {
let stres = ukuran;
let gaWaras = tempat;

if (!gaWaras){
  gaWaras = "body";
}

if(!ukuran){
  stres = "text-5xl";
}

const [date, setDate] = useState(
    <div className="flex justify-center">
  <div className={`flex ${gaWaras !== "header" ? "md:flex-row flex-col" : "flex-row"} gap-3 ${ukuran}`}>
    <span className={`font-bold`}>Loading...</span>
  </div>
</div>  
    );
    const [udhTaunBaru, setUdhTaunBaru] = useState(false);

useEffect(() => {
// Bagian date
const d = new Date();
let yearNow = d.getUTCFullYear() + 1;
// Set the date we're counting down to
var countDownDate = new Date(`Jan 1, ${yearNow} 00:00:00`).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);


if (new Date().getDate() === 1 && new Date().getMonth() === 0) {
        setUdhTaunBaru(true);
        clearInterval(x);
        setDate(
        <div className="flex justify-center">
  <div className={`flex ${gaWaras !== "header" ? "md:flex-row flex-col mt-3" : "flex-row"} gap-3 ${ukuran}`}>
    <span className="font-bold">SELAMAT TAHUN BARU!</span>
  </div>
</div>    
    );
    } else {
    
    setUdhTaunBaru(false)
    setDate(
    <div className="flex justify-center">
  <div className={`flex ${gaWaras !== "header" ? "md:flex-row flex-col md:mt-0 mt-3 gap-0 md:gap-7" : "flex-row gap-5"} ${ukuran}`}>
    <span className="font-bold">{days} hari</span>
    <span className="font-bold">{hours} jam</span>
    <span className="font-bold">{minutes} menit</span>
    <span className="font-bold">{seconds} detik</span>
  </div>
</div>
);
}

  if (distance < 0) {
    if (new Date().getDate() === 1 && new Date().getMonth() === 0) {
        setUdhTaunBaru(true);
        clearInterval(x);
        setDate(
        <div className="flex justify-center">
  <div className={`flex ${gaWaras !== "header" ? "md:flex-row flex-col mt-3" : "flex-row"} gap-3 ${ukuran}`}>
    <span className="font-bold">SELAMAT TAHUN BARU!</span>
  </div>
</div>    
    );
    } else {
    
    setUdhTaunBaru(false)
    setDate(
    <div className="flex justify-center">
  <div className={`flex ${gaWaras !== "header" ? "md:flex-row flex-col md:mt-0 mt-3" : "flex-row gap-5"} ${ukuran}`}>
    <span className="font-bold">{days} hari</span>
    <span className="font-bold">{hours} jam</span>
    <span className="font-bold">{minutes} menit</span>
    <span className="font-bold">{seconds} detik</span>
  </div>
</div>
);
}
  }
}, 1000);
}, []);

    return (
        <>
            {date}
            <div className="z-300000">
            <Confetti x={udhTaunBaru} />
            </div>
        </>
    );

};