export default function StatsCard({
title,
value,
icon,
}) {
return (
<div
   className="
   bg-white
   border-4
   border-black
   p-6
   shadow-[8px_8px_0px_#000]
   hover:-translate-x-1
   hover:-translate-y-1
   hover:shadow-[10px_10px_0px_#000]
   transition-all
   "
 > <div className="flex items-center justify-between mb-4">

    <h3 className="text-sm font-black uppercase text-gray-700">
      {title}
    </h3>

    {icon}

  </div>

  <p className="text-4xl font-black text-black">
    {value}
  </p>
</div>

);
}
