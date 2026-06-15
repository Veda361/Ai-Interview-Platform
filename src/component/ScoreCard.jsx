export default function ScoreCard({
  title,
  score,
}) {
  return (
    <div
      className="
      bg-white
      border-4
      border-black
      p-6
      shadow-[8px_8px_0px_#000]
      "
    >
      <h3
        className="
        uppercase
        font-black
        text-sm
        mb-3
        text-gray-700
        "
      >
        {title}
      </h3>

      <p
        className="
        text-5xl
        font-black
        text-black
        "
      >
        {score}/10
      </p>
    </div>
  );
}