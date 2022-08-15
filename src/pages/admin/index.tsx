import { PrismaClient, Upload } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";

const Admin = ({
  pools,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <main className="p-5">
      <h2>Admin</h2>
      <ul className="flex flex-col gap-3 max-w-md">
        {pools.map(({ expiresAt, id, uploadTime, message }: Upload) => (
          <li
            key={id}
            onClick={() => router.push("files/" + id)}
            className="rounded-lg bg-slate-200/30 border py-3 px-5 flex cursor-pointer hover:shadow-lg shadow-gray-400/20 transition-all flex-col gap-2"
          >
            <div className="flex flex-col">
              <h3 className="text-xs font-sans font-normal opacity-40">
                Message
              </h3>
              <p>{message || "-"}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-sans font-normal opacity-40">
                Expires at
              </h3>
              <p>
                {expiresAt ? formatDistanceToNow(new Date(expiresAt)) : "never"}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-sans font-normal opacity-40">
                Uploaded at
              </h3>
              <p>{uploadTime && format(new Date(uploadTime), "dd.MM.yyyy")}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-sans font-normal opacity-40">ID</h3>
              <p>{id}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const prisma = new PrismaClient();

  if (!(session?.user?.role === "admin"))
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };

  const pools = await prisma.upload.findMany({
    orderBy: {
      uploadTime: "desc",
    },
  });

  return {
    props: {
      pools: JSON.parse(JSON.stringify(pools)),
    },
  };
};

export default Admin;
