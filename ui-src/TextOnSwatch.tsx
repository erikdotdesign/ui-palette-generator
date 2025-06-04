import chroma from "chroma-js";

const TextOnSwatch = ({
  bg,
  text,
  label,
}: {
  bg: string;
  text: any;
  label: string;
}) => {
  const contrast = chroma.contrast(bg, text).toFixed(2);
  const isPass = parseFloat(contrast) >= 3.1;

  return (
    <div className="relative text-center text-xs">
      <div
        className="w-20 h-10 rounded flex items-center justify-center text-sm"
        style={{ backgroundColor: bg, color: text }}
        title={`Contrast: ${contrast}`}
      >
        Aa
      </div>
      <div className="text-[10px] mt-1">{label}</div>
      <div
        className={`absolute top-0 right-0 px-1 text-[10px] rounded-bl ${
          isPass ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
        {contrast}
      </div>
    </div>
  );
};

export default TextOnSwatch;