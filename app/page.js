import Image from "next/image";
import Navbar from "./components/blocks/Navbar";
import Banner from "./components/blocks/Banner";
import DepartmentCard from "./components/blocks/DepartmentCard";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Banner />
      <DepartmentCard />
    </main>
  );
}
