import React from "react";
import BeanShape from "types/BeanShape";
import { IoMdCloseCircle } from "react-icons/io";

export default function BeanLink({
  bean,
  toggleBean,
}: {
  bean: BeanShape;
  toggleBean: (name: string) => void;
}) {
  // TODO: fetch toggleBean from context
  const url = `https://www.coffeebeancorral.com/search?q=${bean.sku}`;

  // NOTE: even a single bean can be removed
  return (
    <div className="flex flex-row items-center gap-1 cursor-pointer">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline truncate"
      >
        {bean.sku?.toUpperCase()}
      </a>
      <IoMdCloseCircle onClick={() => toggleBean(bean.sku)} />
    </div>
  );
}
