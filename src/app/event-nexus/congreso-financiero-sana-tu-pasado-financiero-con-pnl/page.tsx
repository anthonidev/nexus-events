import FormEvent from "@/components/common/FormEvent";
import { Thumbnail2 } from "@/lib/resources";
import { Metadata } from "next";
import Image from "next/image";
const baseUrl = "https://nexus-events-ten.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Congreso Financiero: Sana Tu Pasado Financiero con PNL";

  const description =
    "Este sábado, a las 4:30 p.m., da el primer paso hacia una mentalidad ganadora. Descubre cómo reprogramar tu forma de pensar para alcanzar tus metas, romper límites y convertirte en el asesor inmobiliario que siempre soñaste.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    themeColor: "black",
    openGraph: {
      title,
      description,
      url: baseUrl,
      images: [
        {
          url: Thumbnail2,
          secureUrl: Thumbnail2,
          width: 1200,
          height: 630,
          alt: "Congreso Financiero: Sana Tu Pasado Financiero con PNL",
        },
      ],
      type: "website",
      siteName: "Congreso Financiero: Sana Tu Pasado Financiero con PNL",
    },
  };
}

export default function EventoVisionBoard() {
  return (
    <div className="section-box min-h-screen flex flex-col items-center py-16 px-6">
      {/* Encabezado del evento */}
      <div className="text-center max-w-3xl">
        <h1 className="section-title">CONGRESO FINANCIERO</h1>
        <p className="text-gray-200 italic mb-4">
          <span>❌SANA TU PASADO FINANCIERO❌</span>
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Reprograma tu mente para el éxito financiero
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-4">
          📅 <span className="font-semibold">Sábado 01/02/2025</span> | ⏰{" "}
          <span className="font-semibold">4:30 PM</span>
        </p>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Descubre cómo alcanzar tus metas con una{" "}
          <span className="font-bold text-primary">
            mentalidad inquebrantable
          </span>
          .
        </p>
        <ul className=" bg-secondary-900 p-6 rounded-lg text-left text-gray-300 grid gap-4 grid-cols-1 sm:grid-cols-2">
          {[
            "Alcanza tus metas financieras 🎯",
            "Rompe límites mentales 🗝️",
            "Cree en ti y crea tu futuro 💡",
            "Convierte tus sueños en realidad 🌟",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-indigo-600 text-xl">✔️</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-gray-200 mt-8">
          Lo que piensas, lo atraes. Lo que crees, lo creas. ¡Te esperamos! 🙌✨
        </p>
      </div>

      {/* Detalles del evento */}
      <div className="bg-secondary-900 shadow-lg rounded-lg p-6 sm:p-8 text-center max-w-3xl mb-12">
        <h3 className="text-2xl font-bold text-primary mb-4">
          DETALLES DEL EVENTO
        </h3>
        <h4 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">
          CONGRESO FINANCIERO
        </h4>
        <p className="text-base sm:text-lg text-gray-300 mb-2">
          📅 <span className="font-medium">Sábado 01/02/2025</span>
        </p>
        <p className="text-base sm:text-lg text-gray-300 mb-2">
          ⏰ <span className="font-medium">4:30 PM</span>
        </p>
        <p className="text-base sm:text-lg text-gray-300">
          📍 DIRECCIÓN:{" "}
          <span className="font-medium">
            Av. Universitaria 2202, Los Olivos, Piso 5, Aula 501, Edificio Cielo
          </span>
        </p>
      </div>

      <div
        style={{
          backgroundImage: "url('/images/fondo.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-secondary-900 shadow-xl border-4 border-primary rounded-lg p-6 sm:p-8 max-w-4xl w-full"
      >
        <h3 className="text-4xl font-bold font-primary text-gray-100 mb-6 text-center">
          Regístrate para el evento
        </h3>
        <p className="text-lg text-gray-300 mb-6 text-center">
          ¡No te quedes fuera! Regístrate para participar en este evento
          exclusivo.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/congreso-financiero.jpeg"
              width={300}
              height={300}
              alt="Banner del evento"
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 w-full">
            <FormEvent eventId="congreso-financiero-sana-tu-pasado-financiero-con-pnl" />
          </div>
        </div>
      </div>
    </div>
  );
}
