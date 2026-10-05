import { useId, type CSSProperties } from "react";
import "./candy.css";

export type CandyShape = "bean" | "gumdrop" | "cushion" | "sprinkle" | "striped" | "cherries" | "round" | "redbean" | "matte" | "floss" | "icecream" | "lollipop" | "cookie" | "softserve";
export const candyDesigns = [
  { shape: "bean", name: "Jelly bean", color: "#e95777", description: "Soft berry jelly. A curved body with a slow, elastic wobble." },
  { shape: "gumdrop", name: "Gumdrop", color: "#f0a323", description: "Honey citrus. A sugared dome that squashes against its base." },
  { shape: "cushion", name: "Candy cushion", color: "#39bfa0", description: "Mint candy. Puffy corners and a gentle rocking motion." },
  { shape: "sprinkle", name: "Chocolate sprinkle", color: "#855035", description: "Glossy chocolate dotted with bright sugar pearls. A little roll when working." },
  { shape: "striped", name: "Ribbon candy", color: "#b746df", description: "Purple sugar with creamy ribbons. A scalloped body with a springy sway." },
  { shape: "cherries", name: "Twin cherries", color: "#c92547", description: "Two glossy cherries on joined stems. A gentle swing when working." },
  { shape: "round", name: "Blue bonbon", color: "#159eea", description: "A glossy blue candy with a domed cap, deep edges and a rounded base. A small rocking motion." },
  { shape: "redbean", name: "Red jelly bean", color: "#ed353c", description: "A long, curved jelly bean with a bright shine and a soft wobble." },
  { shape: "matte", name: "Matte bonbon", color: "#b78cc9", description: "A soft violet bonbon with a powdery finish and gentle shading. No gloss or seam." },
  { shape: "floss", name: "Candy floss", color: "#efa4cc", description: "Fine strands of raspberry sugar wrapped around a paper stick. Wispy edges and a gentle drift." },
  { shape: "icecream", name: "Ice cream cone", color: "#f5c6ae", description: "Peach cream with a softly folded scoop and a toasted waffle cone. A gentle bob when working." },
  { shape: "lollipop", name: "Swirl lollipop", color: "#ed729d", description: "Raspberry candy with a cream spiral and a paper stick. A playful sway." },
  { shape: "cookie", name: "Chocolate-chip cookie", color: "#dba663", description: "Golden baked edges, a crumbly centre and chunky chocolate chips. A gentle rock." },
  { shape: "softserve", name: "Soft-serve swirl", color: "#ffe5b7", description: "Vanilla soft serve with ribboned folds, a curled tip and a toasted waffle cone." },
] as const;

const pearls = [
  [36,23,4.2,"#30bce8"], [53,21,4.6,"#f9d82f"], [69,27,4,"#f66b24"],
  [23,34,4,"#b6de27"], [43,34,4.6,"#f342a0"], [60,34,4,"#39cb9e"], [78,40,4.5,"#e843a1"],
  [19,51,4.4,"#f2cc2e"], [29,65,4.5,"#28baf0"], [80,58,4.2,"#a7d82b"],
  [21,75,3.8,"#f67728"], [40,77,4.6,"#9fd726"], [58,77,4.4,"#f58d28"], [75,75,4.3,"#24bfe7"],
  [34,87,3.7,"#e93ea4"], [53,89,4,"#f7ce2a"], [68,86,3.5,"#f16a28"],
] as const;

// Fixed strands keep the texture stable across renders and avatar sizes.
const flossFibres = Array.from({ length: 85 }, (_, i) => {
  const y = 17 + (i * 7.13) % 68;
  const x = 12 + (i * 13.71) % 20;
  const end = 69 + (i * 3.7) % 20;
  const lift = 5 + (i * 2.31) % 12;
  return { path: `M${x} ${y} C${x + 13} ${y - lift} ${end - 17} ${y + lift * .5} ${end} ${y - 3}`, light: i % 3 !== 0 };
});

const geometry = {
  softserve: {
    body: "M25 62 C16 59 17 51 26 47 C20 42 26 35 35 32 C30 27 37 21 44 19 C48 17 51 13 49 8 C60 10 66 17 62 23 C73 25 78 32 72 37 C84 40 85 47 78 51 C89 57 81 65 70 66 C55 70 35 68 25 62 Z",
    highlight: "",
    rim: "",
    face: "translate(0 2)",
  },
  lollipop: {
    body: "M50 13 C69 13 84 28 84 47 C84 66 69 81 50 81 C31 81 16 66 16 47 C16 28 31 13 50 13 Z",
    highlight: "M24 36 C28 25 39 19 47 21 C52 23 41 25 35 29 C29 33 22 42 24 36 Z",
    rim: "M29 70 Q50 81 72 68",
    face: "translate(0 -2)",
  },
  cookie: {
    body: "M46 17 C53 13 61 18 67 19 C76 19 79 28 83 33 C90 38 87 47 89 54 C93 64 84 69 81 76 C78 85 68 83 62 88 C54 94 46 89 39 89 C29 91 25 82 19 77 C11 71 15 62 12 55 C8 46 16 40 18 33 C21 25 29 24 35 20 C39 16 43 18 46 17 Z",
    highlight: "",
    rim: "",
    face: "translate(0 5)",
  },
  floss: {
    body: "M30 81 C20 79 14 72 16 65 C10 59 14 53 13 48 C12 40 17 36 20 33 C19 25 26 21 31 20 C35 13 41 16 45 13 C52 8 58 13 63 14 C72 13 76 22 78 27 C85 30 83 37 86 42 C92 50 85 55 87 62 C87 71 80 72 78 77 C73 85 64 80 60 84 C51 88 46 81 41 83 C36 85 32 82 30 81 Z",
    highlight: "",
    rim: "",
    face: "translate(0 2)",
  },
  icecream: {
    body: "M21 57 C15 50 20 41 23 39 C21 27 32 19 42 20 C49 12 65 16 69 24 C82 26 85 37 81 44 C88 51 83 60 76 60 C69 67 60 62 55 64 C48 68 42 61 37 63 C30 65 26 60 21 57 Z",
    highlight: "",
    rim: "",
    face: "translate(0 -6)",
  },
  matte: {
    body: "M50 18 C71 18 87 34 87 55 C87 76 72 91 50 91 C28 91 13 76 13 55 C13 34 29 18 50 18 Z",
    highlight: "",
    rim: "",
    face: "translate(0 4)",
  },
  cherries: {
    body: "M25 43 C12 39 7 49 8 62 C9 78 20 86 33 82 C47 78 49 61 42 50 C38 44 32 42 25 43 Z M69 51 C56 48 49 58 51 71 C53 86 64 93 77 88 C90 84 94 68 86 57 C82 52 76 50 69 51 Z",
    highlight: "M15 54 C16 48 23 46 28 48 C33 50 26 51 23 53 C19 57 14 60 15 54 Z M58 63 C59 57 66 54 71 56 C76 58 69 59 66 62 C62 66 57 68 58 63 Z",
    rim: "M18 75 C24 80 33 79 38 73 M62 82 C68 87 78 83 83 77",
    face: "translate(0 0)",
  },
  round: {
    body: "M50 19 C69 19 81 31 86 47 C90 57 90 65 85 73 C78 84 66 89 50 89 C34 89 22 84 15 73 C10 65 10 57 14 47 C19 31 31 19 50 19 Z",
    highlight: "M25 40 C29 30 40 24 49 26 C54 28 46 31 40 33 C33 36 26 44 25 40 Z",
    rim: "M30 80 C42 85 61 85 72 80",
    face: "translate(0 1)",
  },
  redbean: {
    body: "M30 19 C42 13 51 24 55 36 C60 49 67 53 78 58 C93 64 95 78 85 87 C75 97 59 92 47 84 C29 73 17 58 14 42 C12 31 19 23 30 19 Z",
    highlight: "M22 34 C24 26 31 23 37 26 C42 29 37 34 32 36 C26 39 20 40 22 34 Z",
    rim: "M38 71 C51 84 69 91 81 82",
    face: "translate(0 10) rotate(27 50 51)",
  },
  sprinkle: {
    body: "M50 15 C72 14 88 31 89 53 C91 76 74 94 51 94 C28 95 12 78 12 56 C11 33 27 16 50 15 Z",
    highlight: "M24 37 C28 26 39 20 47 22 C52 24 43 27 37 30 C31 34 26 42 24 37 Z",
    rim: "M28 82 C43 92 67 90 78 76",
    face: "translate(0 6)",
  },
  striped: {
    body: "M42 18 C46 12 55 12 60 19 C63 24 72 20 77 27 C81 32 76 39 82 44 C91 50 89 60 81 64 C76 68 81 78 73 82 C67 85 62 81 58 87 C53 95 43 93 39 86 C36 81 27 86 22 79 C18 73 23 67 17 62 C9 55 11 46 18 42 C24 38 19 29 26 25 C32 22 37 25 42 18 Z",
    highlight: "M29 32 C34 28 40 30 44 24 C48 19 54 20 55 23 C56 27 49 28 44 33 C39 37 27 38 29 32 Z",
    rim: "M29 76 C35 75 40 84 49 85 C60 86 66 77 72 76",
    face: "translate(0 5)",
  },
  bean: {
    body: "M 67,18 C 87,21 96,37 82,49 C 73,57 72,61 80,69 C 96,86 74,98 54,94 C 29,91 11,74 13,51 C 14,29 42,13 67,18 Z",
    highlight: "M 22,43 C 26,31 36,25 42,27 C 47,29 41,35 37,40 C 31,47 19,53 22,43 Z",
    rim: "M 28,82 C 42,93 65,93 79,80",
    face: "translate(-5 7) rotate(-8 50 50)",
  },
  gumdrop: {
    body: "M 20,85 C 12,82 14,74 18,60 C 24,37 31,17 50,17 C 69,17 76,37 82,60 C 86,74 88,82 80,85 C 64,92 36,92 20,85 Z",
    highlight: "M 29,46 C 31,33 39,24 47,24 C 54,24 50,30 43,33 C 36,37 34,50 29,46 Z",
    rim: "M 24,81 C 40,86 61,86 76,81",
    face: "translate(0 8)",
  },
  cushion: {
    body: "M 23,17 C 34,14 40,19 50,19 C 60,19 67,14 78,17 C 87,20 84,34 83,49 C 82,63 89,78 79,83 C 67,88 60,81 50,81 C 40,81 29,88 21,83 C 12,78 18,64 18,50 C 18,35 12,21 23,17 Z",
    highlight: "M 25,23 C 32,20 38,25 49,25 C 62,25 71,20 76,23 C 79,26 72,30 62,30 C 47,32 35,28 26,31 C 21,32 20,26 25,23 Z",
    rim: "M 24,74 C 31,79 39,74 50,74 C 61,74 70,80 77,74",
    face: "translate(0 2)",
  },
};

/** Original SVG candy characters. Lighting and eyes move with the body. */
export function CandyAvatar({ shape, color, size = 80, working = false, still = false, eyePattern = 0 }: {
  shape: CandyShape; color: string; size?: number; working?: boolean; still?: boolean; eyePattern?: number;
}) {
  const id = useId().replace(/:/g, "");
  const design = geometry[shape];
  const eyeHeight = eyePattern === 1 ? 9 : eyePattern === 2 ? 6 : 13;
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} aria-hidden="true"
      className={`candy candy--${shape}`} data-working={working} data-still={still}
      style={{ "--candy-color": color } as CSSProperties}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0.2" y1="0" x2="0.8" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="white" stopOpacity="0.52" />
          <stop offset="0.3" stopColor="white" stopOpacity="0.06" />
          <stop offset="0.6" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="#30142e" stopOpacity="0.46" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.28" cy="0.22" r="0.75">
          <stop stopColor="white" stopOpacity="0.38" />
          <stop offset="0.65" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-cone`} x1="0" y1="0" x2="1" y2=".3">
          <stop stopColor="#b97330" /><stop offset=".4" stopColor="#edbb72" /><stop offset=".7" stopColor="#dba35b" /><stop offset="1" stopColor="#a9672e" />
        </linearGradient>
        <clipPath id={`${id}-cone-clip`}><path d="M27 57 Q50 63 73 57 L54 99 Q50 107 46 99 Z" /></clipPath>
        <pattern id={`${id}-waffle`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 1 H12 M1 0 V12" stroke="#8f5425" strokeOpacity=".4" strokeWidth="1.5" />
          <path d="M0 3 H12 M3 0 V12" stroke="#ffdfa3" strokeOpacity=".65" strokeWidth="1" />
        </pattern>
        <radialGradient id={`${id}-baked`} cx=".4" cy=".35" r=".65">
          <stop stopColor="#ffe5ad" stopOpacity=".45" /><stop offset=".6" stopColor="#f9d090" stopOpacity=".15" /><stop offset="1" stopColor="#875022" stopOpacity=".5" />
        </radialGradient>
        <radialGradient id={`${id}-fluff`} cx=".3" cy=".2" r=".85">
          <stop stopColor="#fff9fc" stopOpacity=".62" /><stop offset=".5" stopColor="white" stopOpacity=".1" /><stop offset="1" stopColor="#a24d89" stopOpacity=".26" />
        </radialGradient>
        <radialGradient id={`${id}-matte`} cx=".3" cy=".2" r=".95">
          <stop stopColor="white" stopOpacity=".2" />
          <stop offset=".45" stopColor="white" stopOpacity=".03" />
          <stop offset="1" stopColor="#36233e" stopOpacity=".3" />
        </radialGradient>
        <radialGradient id={`${id}-blue`} cx=".35" cy=".22" r=".8">
          <stop stopColor="#8ae4ff" stopOpacity=".8" />
          <stop offset=".35" stopColor="#17bcff" stopOpacity=".25" />
          <stop offset=".72" stopColor="#0861cf" stopOpacity=".35" />
          <stop offset="1" stopColor="#102477" stopOpacity=".85" />
        </radialGradient>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#0649ad" stopOpacity=".45" />
          <stop offset=".5" stopColor="#40ccff" stopOpacity=".3" />
          <stop offset="1" stopColor="#063788" stopOpacity=".65" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop stopColor="#302037" stopOpacity="0.22" />
          <stop offset="1" stopColor="#302037" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}><path d={design.body} /></clipPath>
        <pattern id={`${id}-sugar`} width="9" height="11" patternUnits="userSpaceOnUse">
          <path d="M2 2l1.1 -.5 .6 1.3 -1 .6z" fill="white" opacity="0.28" />
          <circle cx="7" cy="8" r="0.65" fill="white" opacity="0.38" />
          <circle cx="3" cy="9" r="0.45" fill="#7e481b" opacity="0.15" />
        </pattern>
      </defs>
      <ellipse className="candy__shadow" cx="50" cy="98" rx="34" ry="6" fill={`url(#${id}-shadow)`} />
      <g className="candy__body">
        {shape === "lollipop" && <g><path d="M46 73 H54 L53 101 Q50 106 47 101 Z" fill="#e4d8cb" /><path d="M49 78 V100" stroke="#fffaf3" strokeWidth="2" /></g>}
        {shape === "floss" && <g><path d="M46 75 L54 75 L52 101 Q50 105 48 101 Z" fill="#ece2d6" /><path d="M48 81 L49 100" stroke="white" strokeWidth="1.5" /></g>}
        {(shape === "icecream" || shape === "softserve") && <g>
          <path d="M27 57 Q50 63 73 57 L54 99 Q50 107 46 99 Z" fill={`url(#${id}-cone)`} />
          <path d="M27 57 Q50 63 73 57 L54 99 Q50 107 46 99 Z" fill={`url(#${id}-waffle)`} />
          <path d="M29 59 Q50 66 71 59" fill="none" stroke="#895227" strokeOpacity=".3" strokeWidth="3" />
        </g>}
        {shape === "cherries" && <g fill="none" strokeLinecap="round">
          <path d="M27 47 C34 32 45 20 42 12 C54 27 65 35 72 55 M42 12 C35 8 30 8 26 10" stroke="#67512a" strokeWidth="3.5" />
          <path d="M27 46 C34 30 44 21 42 13 M44 16 C53 29 64 36 71 54" stroke="#b3a25b" strokeWidth="1.2" />
        </g>}
        <path d={design.body} fill={color} />
        {shape === "striped" && <g clipPath={`url(#${id}-clip)`} fill="none" stroke="#fff3eb" strokeWidth="6.5">
          {[29, 46, 64, 81].map((y) => <path key={y} d={`M8 ${y} C30 ${y - 6} 66 ${y + 5} 94 ${y - 3}`} />)}
        </g>}
        <path d={design.body} fill={`url(#${id}-${shape === "cookie" ? "baked" : shape === "floss" || shape === "icecream" || shape === "softserve" ? "fluff" : shape === "matte" ? "matte" : "body"})`} />
        {shape !== "matte" && shape !== "floss" && shape !== "icecream" && shape !== "softserve" && shape !== "cookie" && <path d={design.body} fill={`url(#${id}-glow)`} />}
        <path d={design.body} fill="none" stroke="#42233a" strokeOpacity={shape === "floss" ? 0 : 0.14} strokeWidth="1" />
        {shape === "lollipop" && <g clipPath={`url(#${id}-clip)`}>
          <path d="M51 47 C58 47 58 36 50 35 C36 34 32 53 45 61 C62 72 80 56 75 39 C69 18 39 14 25 35 C9 62 34 86 62 78 C92 70 99 31 75 13" fill="none" stroke="#fff0dc" strokeWidth="6" strokeLinecap="round" />
          <path d={design.body} fill={`url(#${id}-body)`} opacity=".45" />
        </g>}
        {shape === "cookie" && <g clipPath={`url(#${id}-clip)`}>
          {Array.from({ length: 65 }, (_, i) => <ellipse key={i} cx={16 + (i * 17.3) % 70} cy={19 + (i * 11.7) % 70} rx={i % 3 === 0 ? 1.2 : .6} ry=".6" fill={i % 2 ? "#9b622c" : "#fff2cd"} opacity=".3" />)}
          {[[32,30,15], [58,27,-20], [75,41,30], [23,52,-10], [33,74,25], [59,78,-15], [76,67,10]].map(([x,y,angle]) => <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${angle})`}>
            <path d="M-4 -4 L3 -5 L6 0 L3 5 L-4 4 L-5 0 Z" fill="#65412d" />
            <path d="M-4 -4 L3 -5 L1 -1 L-4 0 Z" fill="#93644c" />
            <path d="M3 -5 L6 0 L3 5 L1 -1 Z" fill="#412c25" />
          </g>)}
        </g>}
        {shape === "floss" && <g fill="none" strokeLinecap="round">
          <g clipPath={`url(#${id}-clip)`}>
            <path d="M22 54 Q29 25 53 23 M30 71 Q48 80 73 56 M35 34 Q61 23 76 45" stroke="white" strokeOpacity=".13" strokeWidth="10" />
            {flossFibres.map((fibre, index) => <path key={index} d={fibre.path} stroke={fibre.light ? "#fff5fb" : "#b96598"} strokeOpacity={fibre.light ? .29 : .12} strokeWidth={index % 4 === 0 ? .65 : .35} />)}
          </g>
          <g stroke="#f4bada" strokeWidth=".45" strokeOpacity=".6">
            <path d="M19 62 C8 56 12 44 18 38 M23 31 C18 20 31 17 36 18 M43 15 C48 7 57 10 63 16 M78 29 C91 31 86 43 85 47 M85 55 C94 63 84 74 77 75 M29 79 C22 87 40 87 45 82 M58 83 C69 90 80 80 78 76" />
            <path d="M17 54 Q8 47 15 42 M28 23 Q27 14 34 17 M67 19 Q79 15 80 28 M83 66 Q90 76 76 79" />
          </g>
        </g>}
        {shape === "softserve" && <g clipPath={`url(#${id}-clip)`} fill="none" strokeLinecap="round">
          <path d="M36 31 C47 34 64 32 70 27 M27 46 C43 48 66 45 75 39 M24 60 C40 64 68 61 79 55" stroke="#b88c59" strokeOpacity=".32" strokeWidth="2.7" />
          <path d="M37 27 C47 30 59 27 64 24 M29 40 C44 43 60 40 72 35 M26 54 C40 58 66 54 77 50" stroke="#fffdf1" strokeOpacity=".8" strokeWidth="4" />
          <path d="M48 20 Q55 18 52 13" stroke="#fffdf1" strokeOpacity=".8" strokeWidth="2.3" />
        </g>}
        {shape === "icecream" && <g clipPath={`url(#${id}-clip)`} fill="none" strokeLinecap="round">
          <path d="M27 38 C27 29 37 24 43 28 M47 25 C54 20 65 25 65 31 M70 34 C77 36 78 42 74 46" stroke="#fff9eb" strokeOpacity=".55" strokeWidth="4" />
          <path d="M23 53 Q30 60 36 56 M43 58 Q50 63 55 58 M64 56 Q71 61 78 54" stroke="#b57864" strokeOpacity=".2" strokeWidth="2" />
          <path d="M28 46 Q27 41 31 38 M58 33 Q64 32 67 37" stroke="#bc8a73" strokeOpacity=".15" strokeWidth="1.3" />
        </g>}
        {shape === "round" && <g clipPath={`url(#${id}-clip)`}>
          <path d={design.body} fill={`url(#${id}-blue)`} />
          <path d="M10 66 C29 74 71 74 90 66 L91 94 H9 Z" fill={`url(#${id}-base)`} />
          <path d="M15 67 C33 74 68 74 85 67" fill="none" stroke="#92e7ff" strokeOpacity=".55" strokeWidth="1.3" />
          <path d="M18 54 C19 43 24 34 31 29" fill="none" stroke="#b9f1ff" strokeOpacity=".25" strokeWidth="2" strokeLinecap="round" />
        </g>}
        {shape === "gumdrop" && <path d={design.body} fill={`url(#${id}-sugar)`} />}
        <path d={design.highlight} fill="white" opacity={shape === "gumdrop" ? 0.35 : shape === "sprinkle" ? 0.18 : 0.62} />
        <path d={design.rim} fill="none" stroke="white" strokeOpacity="0.23" strokeWidth="2.2" strokeLinecap="round" />
        {shape === "sprinkle" && <g clipPath={`url(#${id}-clip)`}>
          {pearls.map(([x, y, radius, fill]) => <g key={`${x}-${y}`}>
            <ellipse cx={x + .6} cy={y + 1.2} rx={radius + .6} ry={radius} fill="#23120f" opacity=".35" />
            <circle cx={x} cy={y} r={radius} fill={fill} />
            <circle cx={x} cy={y} r={radius} fill={`url(#${id}-body)`} />
            <ellipse cx={x - 1} cy={y - 1.4} rx={radius * .35} ry={radius * .22} fill="white" opacity=".7" />
          </g>)}
        </g>}
        <g clipPath={`url(#${id}-clip)`}>
          {shape === "cherries" ? <g fill="#fff4dd">
            {[{ x: 19, y: 61 }, { x: 62, y: 69 }].map(({ x, y }) => <g key={x} transform={`translate(${x} ${y})`}>
              <g className="candy__eyes"><rect width="3.8" height={eyePattern === 2 ? 3.5 : 8} rx="1.9" /><rect x="9" width="3.8" height={eyePattern === 3 ? 3.5 : 8} rx="1.9" /></g>
            </g>)}
          </g> : <g transform={design.face}>
            <g className="candy__gaze">
              <ellipse cx="33" cy="60" rx="5" ry="2.3" fill="#f74776" opacity="0.22" />
              <ellipse cx="67" cy="60" rx="5" ry="2.3" fill="#f74776" opacity="0.22" />
              <g className="candy__eyes" fill="#292033">
                <rect x="37" y={51 - eyeHeight / 2} width="6.5" height={eyeHeight} rx="3.25" />
                <rect x="56.5" y={51 - eyeHeight / 2} width="6.5" height={eyePattern === 3 ? 6 : eyeHeight} rx="3.25" />
                {eyePattern !== 2 && shape !== "matte" && shape !== "floss" && <g fill="white" opacity="0.8"><circle cx="39.3" cy={53 - eyeHeight / 2} r="1" /><circle cx="58.8" cy={53 - eyeHeight / 2} r="1" /></g>}
              </g>
            </g>
          </g>}
        </g>
      </g>
    </svg>
  );
}
