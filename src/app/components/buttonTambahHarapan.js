'use client';

import { useState, useRef, useEffect } from "react";
import Header from "./header";
import HarapanRender from "../harapan/mbuhGahPegel";
import Content from "./content";

export default function buttonTambahHarapan() {
  const [formData, setFormData] = useState({ name: '', msg: '' });
  const textareaRef = useRef(null);
  const currentRef = useRef(null);
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    if (submit){
    setFormData({ name: '', msg: '' });
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    // HTML5 validation will prevent this from running if fields are empty
    if(!e.preventDefault()){
    console.log(`Form submitted:\n\nNama: ${formData.name}\nMsg: ${formData.msg}`);
    setSubmit(true);
    setFormData({ ...formData, ['']: '' });
    setFormData({ name: '', msg: '' });

    setInterval(function(){ setSubmit(false) }, 500)
    }
  };

const firstRender = useRef(true);

useEffect(() => {
  if (firstRender.current) {
    firstRender.current = false;
    return;
  }

  if (submit) {
    currentRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [submit]);




   const autoResize = () => {
    const el = textareaRef.current;

    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };


    return (
<>
<Header />
        <section className="h-10000000 mx-auto items-center justify-center text-center">
            <Content>
                <h1 className="text-2xl font-bold">Daftar Harapan</h1>
                <div ref={currentRef} className="scroll-mt-24"></div>
      <HarapanRender />
      </Content>
    </section>
          <div className="fixed bottom-0 inset-x-0 z-50">
            <div className="w-full mx-auto px-3 pt-5 pb-2">
                <div className={`flex items-center justify-center px-3 py-2`}>
                    <button className="btn btn-primary btn-lg w-60 rounded-full" onClick={()=>document.getElementById('tambahHarapanModal').showModal()}>
                        Tambah Harapan
                    </button>
                </div>
            </div>
            </div>

            {/* Bagian modal tambah harapan */}
            <dialog id="tambahHarapanModal" className="modal">
  <div className="modal-box rounded-2xl">
    <h3 className="font-bold text-lg items-center justify-center text-center">Isi Form Dibawah Untuk Melanjutkan</h3>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
  <fieldset className="fieldset">
    <legend className="fieldset-legend text-lg">
      <span className="flex items-center gap-1">
        Nama
        <span className="text-red-500">*</span>
      </span>
    </legend>

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="input w-full"
      placeholder="Type here"
    />

    <legend className="fieldset-legend text-lg">
      <span className="flex items-center gap-1">
        Pesan
        <span className="text-red-500">*</span>
      </span>
    </legend>

    <textarea
      ref={textareaRef}
      type="text"
      name="msg"
      value={formData.msg}
      onInput={autoResize}
      onChange={handleChange}
      required
      className="textarea w-full"
      placeholder="Type here"
      style={{
    minHeight: "44px",        
    maxHeight: "150px",        
    display: 'flex',
    alignItems: 'center'
  }}
    />
  </fieldset>
  <button type="submit" className="btn btn-primary items-center justify-center rounded-xl">Submit</button>
</form>
  <form method="dialog" className="items-center justify-center mt-2">
      <button className="btn btn-outline items-center justify-center w-full rounded-xl">Close</button>
      </form>

  </div>
  <form method="dialog" className="modal-backdrop cursor-default">
    <button className="cursor-default">close</button>
  </form>
</dialog>
    </>
);
};