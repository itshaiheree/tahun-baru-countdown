'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Content from './components/content';
import BagianDate from './components/bagianDate';
import TahunBaruSekarang from './components/tahunBaruSkrg';
import getCookie from './module/getSession';
import setCookie from './module/setSession';

const d = new Date();
let yearNow = null
let kataHarapan = null;
let btnHarapan = null;

if (new Date().getDate() === 1 && new Date().getMonth() === 0) {
yearNow = d.getUTCFullYear() - 1;
kataHarapan = <>Kenanglah tahun lalu, <span className='font-bold'>lihat harapanmu di tahun {yearNow}!</span></>;
btnHarapan = "Lihat Harapanmu Disini";
} else {
yearNow = d.getUTCFullYear() + 1;
kataHarapan = <>Rayakan tahun ini, <span className='font-bold'>tulis harapanmu untuk tahun {yearNow}!</span></>;
btnHarapan = "Tulis/Lihat Harapanmu Disini";
}

const Element = () => {
const [visible, setVisible] =  useState('');

useEffect(() => {
  getCookie('clearVersion').then((res) => {
    if (res === 'true') {
      setVisible('hidden');
      console.log(res);
    } else {
      setVisible('');
    }
  });
}, []);

// bagian buttonToggle
  const [isChecked, setIsChecked] = useState(false);
  const [opacity, setOpacity] = useState("opacity-100");

  // Event handler function
  const handleCheckboxChange = (event) => {
    // Update the state with the new checked value (true or false)
    setIsChecked(event.target.checked);
    setOpacity(event.target.checked ? "opacity-10 hover:opacity-50" : "opacity-100");
    
    setVisible(event.target.checked ? "hidden" : "");

    setCookie('clearVersion', event.target.checked.toString());
  };
 
  useEffect(() => {
    getCookie('clearVersion').then((res) => {
      if (res === 'true') {
        setIsChecked(true);
        setOpacity("opacity-10 hover:opacity-50");
        console.log(res);
      } else {
        setIsChecked(false);
        setOpacity("opacity-100");
      }
    });
  }, []);
  /////////////////



  return (
      <>
        {/* ================= ISI ================= */}
        <section
          id="top"
          className="fixed inset-0
    flex items-center justify-center
    text-center
    bg-base-200
    overflow-hidden w-full flex items-center justify-center text-center bg-base-100"
        >
          <Content>
            <div
              className="flex flex-col items-center justify-center gap-1 py-3 "
            >
              
              <div className={visible}><TahunBaruSekarang /></div>
      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        <BagianDate />
      </h1>

              <div className={`flex flex-col gap-3 mt-8 items-center ${visible}`}>
                <p>{kataHarapan}</p>
                <Link href="/harapan" className="btn btn-md btn-primary w-60 items-center">
                  {btnHarapan}
                </Link>
              </div>

              {/* bagian buttonToggle */}
            <div className={`mt-5 text-center ${opacity}`}>
                  <fieldset className="fieldset w-64 p-4 items-center justify-center">
      <label htmlFor="myCheckbox" className="label items-center justify-center gap-2">
        <input type="checkbox"
          id="myCheckbox"
          checked={isChecked} // Control the checkbox state with React state
          onChange={handleCheckboxChange} // Attach the event listener
          className="toggle" />
        Clear version
      </label>
    </fieldset>
                </div>

{/* ================= CREDIT ================= */}
              <p className={`text-[10px] mt-5 ${visible}`}>Created by MieAyamPangsit</p>
              <p className={`text-[10px] mt-1 ${visible}`}><a className='link link-href' href="https://github.com/AkuAnakSehatt/tahun-baru-countdown">Star Us On Github</a> | <a className='link link-href' href="https://saweria.co/akuanaksehatt">Donate</a></p>
            </div>
          </Content>
        </section>
      </>
  );
};

export default Element;
