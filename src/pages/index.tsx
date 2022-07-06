import type { NextPage } from "next";
import Head from "next/head";
import LandingNav from "../components/LandingNav";
import { getDefaultLayout } from "../components/Layout/DefaultLayout";
import Uploader from "../components/Uploader";
import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <div className="relative w-full h-full">
      <div className="flex items-center h-screen justify-between z-10 relative">
        <h1 className="font-serif font-light text-8xl">
          <span className="text-indigo-500 font-bold italic">Share</span> your
          art
          <br /> with the world.
        </h1>
        <Uploader />
      </div>
      <img
        src="/assets/images/mesh-gradient.png"
        className="absolute top-[60%] right-[50%] w-full h-full blur-lg rotate-90 opacity-70"
        alt=""
      />
      <img
        src="/assets/images/mesh-gradient.png"
        className="absolute top-[20%] left-[70%] blur-xl opacity-70 animate-pulse"
        alt=""
      />
    </div>
  );
};

Home.getLayout = getDefaultLayout();

export default Home;
