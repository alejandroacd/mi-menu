import { useState } from "react";
import { MenuItem } from "@/types";
import EditMenuItem from "../edit-menu-item";
import MenuItemCard from "../menu-item-card";

export default function MenuList({ groupedItems }: { groupedItems: Record<string, MenuItem[]> }) {
  const [open, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<any>(null)
  
  const handleSelectItem = (item: MenuItem) => {
    setActiveItem(item)
    setIsOpen(true)
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5">
      <EditMenuItem open={open} setOpen={setIsOpen} activeItem={activeItem}/>
      {groupedItems && Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="mb-8 flex flex-col">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4 mx-3 my-10">
            <span className="text-purple-500/50">// </span>{category}</h3>
          <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
            {items.map((item) => (
              <MenuItemCard key={item.id} menuItem={item} handleSelectmenuItem={handleSelectItem} />
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}
