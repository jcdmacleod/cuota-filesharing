import Previewer from "../Previewer";
import { motion } from "framer-motion";
import bytes from "pretty-bytes";
import mime from "mime-types";
interface FileItemProps {
  name?: string;
  size?: number;
  type?: string;
  url?: string;
  lastModified?: Date;
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function FileItem({ name, size, type, url }: FileItemProps) {
  return (
    <motion.li
      variants={item}
      className="w-full aspect-square bg-white rounded-xl shadow-xl shadow-black/5 border flex flex-col overflow-hidden relative"
    >
      {url && type && <Previewer type={type} contentUrl={url} />}
      <div className="absolute flex items-end inset-0 w-full">
        <div className="bg-gray-50 px-5 py-3 overflow-hidden flex w-full flex-col">
          <p className="truncate text-sm">{name}</p>
          <div className="opacity-30 text-xs flex gap-3">
            <span>
              {bytes(size || 0)} • {mime.extension(type || "")}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
