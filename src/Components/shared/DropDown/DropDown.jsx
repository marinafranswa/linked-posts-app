import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,

} from "@heroui/react";
import { useContext } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


export default function DropDown({ userId, onEdit, onDelete }) {
  const { userData } = useContext(tokenContext);

  return (
    <>
      {userData?.id === userId ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <CiMenuKebab
              as="button"
              className="transition-transform"
              size={20}
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="menu Actions" variant="flat">
            <DropdownItem key="update">
              <button onClick={onEdit} className="flex items-center gap-2">
                <FaRegEdit /> Update
              </button>
            </DropdownItem>

            <DropdownItem key="delete">
              <button onClick={onDelete} className="flex items-center gap-2">
                <MdDeleteOutline size={18} />
                Delete
              </button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : null}
    </>
  );
}
