import { HiMinus, HiOutlineExclamation } from "react-icons/hi";
import IconButton from "../UI/Button/IconButton";
import bytes from "pretty-bytes";
import mime from "mime-types";

interface UploadFileItemProps {
  name: string;
  type: string;
  size: number;
  remove: () => void;
}

const GIGABYTE = 1024 * 1024 * 1024;

export default function UploadFileItem({
  name,
  type,
  size,
  remove,
}: UploadFileItemProps) {
  return (
    <li className="flex py-2 justify-between group gap-3">
      <div className="flex flex-col overflow-hidden">
        <p className="font-semibold opacity-80 leading-snug truncate">{name}</p>
        <div className="opacity-30 text-xs flex gap-3">
          <span>
            {bytes(size)} • {mime.extension(type)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end flex-grow">
        {size > GIGABYTE * 3 && (
          <span className="text-orange-900 bg-orange-200 rounded-md p-1">
            <HiOutlineExclamation />
          </span>
        )}
      </div>
      <div className="flex items-center flex-none">
        <IconButton
          onClick={remove}
          className="group-hover:opacity-100 opacity-0 !bg-gray-200 hover:!bg-gray-200/60 dark:!bg-gray-200/80 dark:hover:!bg-gray-200"
        >
          <HiMinus className="fill-gray-500 dark:fill-neutral-800" />
        </IconButton>
      </div>
    </li>
  );
}
