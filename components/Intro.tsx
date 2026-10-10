import { Dial } from "@/components/Dial";

// Intro de adorno: al entrar al sitio, una pasada del dial que se clava en 91.5 (~2,1 s).
// Es solo CSS: tapa la pantalla pero no bloquea nada (pointer-events: none) y se retira
// sola, incluso sin JavaScript. Corre una vez por pestaña: el script de abajo anota la
// visita y, si ya se vio, el sitio entra directo. Con "reducir movimiento" no aparece.
const script = `try{if(sessionStorage.getItem("intro")){document.documentElement.setAttribute("data-intro","visto")}else{sessionStorage.setItem("intro","1");document.documentElement.setAttribute("data-intro","playing");setTimeout(function(){document.documentElement.removeAttribute("data-intro")},2400)}}catch(e){}`;

export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div id="intro" aria-hidden>
        <div className="w-full max-w-xs px-5">
          <Dial />
          <p className="intro-freq mt-3 text-center font-display text-6xl font-black uppercase leading-none">
            91.5 <span className="text-brand-hot">FM</span>
          </p>
        </div>
      </div>
    </>
  );
}
