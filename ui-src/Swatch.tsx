const Swatch = ({ name, color, label }: { name: string; color: any; label?: string }) => (
  <div className="text-center text-xs">
    <div
      className="w-10 h-10 rounded shadow-sm border"
      style={{ backgroundColor: color }}
      title={`${name}: ${color}`} />
    <div className="mt-1">{label || name}</div>
  </div>
);

export default Swatch;