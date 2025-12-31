'use client';

import { useState, useRef, useEffect } from "react";
import Header from "./header";
import HarapanRender from "../harapan/mbuhGahPegel";
import Content from "./content";
import { tambahHarapan } from "../services/helper";

const MAX_MSG = 300;
const MAX_NAME = 30;

export default function buttonTambahHarapan() {
  const [formData, setFormData] = useState({ name: '', msg: '' });
  const textareaRef = useRef(null);
  const currentRef = useRef(null);
  const [submit, setSubmit] = useState(false);

  // 🔥 INI SATU-SATUNYA TAMBAHAN
  const [refreshKey, setRefreshKey] = useState(0);

  async function masukinHarapan(sender, msg) {
    try {
      const data = await tambahHarapan(sender, msg);
      if (!data?.success) {
        console.log(data);
        return;
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    if (submit) {
      setFormData({ name: '', msg: '' });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // tutup modal cepat
    document.getElementById('tambahHarapanModal')?.close();

    // kirim data
    await masukinHarapan(formData.name, formData.msg);

    // 🔥 TRIGGER REFRESH CARD
    setRefreshKey(prev => prev + 1);

    setSubmit(true);
    setFormData({ name: '', msg: '' });

    setTimeout(() => setSubmit(false), 500);
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
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  return (
    <>
      <Header />

      <section className="mx-auto text-center">
        <Content>
          <h1 className="text-2xl font-bold">Daftar Harapan</h1>
          <div ref={currentRef} className="scroll-mt-24" />

          <HarapanRender key={refreshKey} />
          <div className="my-15 md:py-0"></div>
        </Content>
      </section>

      {/* BUTTON */}
      <div className="fixed bottom-0 inset-x-0 z-50">
        <div className="w-full mx-auto px-3 pt-5 pb-2">
          <div className="flex justify-center">
            <button
              className="btn btn-primary btn-lg w-60 rounded-2xl mb-2"
              onClick={() =>
                document.getElementById('tambahHarapanModal').showModal()
              }
            >
              Tambah Harapan
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <dialog id="tambahHarapanModal" className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-lg text-center">
            Isi Form Dibawah Untuk Melanjutkan
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <fieldset className="fieldset">

              {/* NAMA */}
              <legend className="fieldset-legend text-lg">
                Nama ({formData.name.length}/{MAX_NAME})<span className="text-red-500">*</span>
              </legend>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={MAX_NAME}
                className="input w-full"
                placeholder="Type here"
              />

              {/* PESAN */}
              <legend className="fieldset-legend text-lg">
                Pesan ({formData.msg.length}/{MAX_MSG})<span className="text-red-500">*</span>
              </legend>

              <textarea
                ref={textareaRef}
                name="msg"
                value={formData.msg}
                onInput={autoResize}
                onChange={handleChange}
                required
                maxLength={MAX_MSG}
                className="textarea w-full"
                placeholder="Type here"
                style={{
                  minHeight: "44px",
                  maxHeight: "150px",
                }}
              />
            </fieldset>

            <button type="submit" className="btn btn-primary rounded-xl">
              Submit
            </button>
          </form>

          <form method="dialog" className="mt-2">
            <button className="btn btn-outline w-full rounded-xl">
              Close
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
