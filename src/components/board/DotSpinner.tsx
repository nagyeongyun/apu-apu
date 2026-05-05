export default function DotSpinner() {
  return (
    <div className="flex items-center justify-center gap-2 py-5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#70a2bc] dot-fade" />
      <span
        className="h-2.5 w-2.5 rounded-full bg-[#70a2bc] dot-fade"
        style={{ animationDelay: '0.2s' }}
      />
      <span
        className="h-2.5 w-2.5 rounded-full bg-[#70a2bc] dot-fade"
        style={{ animationDelay: '0.4s' }}
      />
    </div>
  );
}
