import "./global.css";
import Script from 'next/script'

const d = new Date();
let yearNow = d.getUTCFullYear() + 1;
let yearTitle = () => {
  if (new Date().getDate() === 1 && new Date().getMonth() === 0) {
    return d.getUTCFullYear();
  } else {
    return yearNow;
  }
};

export const metadata = {
  title: {
      template: `%s | Hitung Mundur Tahun ${yearTitle()}`,
      default: `Hitung Mundur Tahun ${yearTitle()}`
  },
  description: "Website sederhana untuk menghitung mundur menuju Tahun Baru. Selalu update otomatis setiap tahunnya. Dibuat oleh MieAyamPangsit.",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="id" className="overflow-x-hiddens">
      <head>
      <script src="https://kit.fontawesome.com/c2165b4022.js" crossOrigin="anonymous"></script>
      <link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_circle_down" />
      </head>
      <body className={`antialiased`} data-theme="business">
        {children}

<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
      </body>
    </html>
    </>
  );
}
