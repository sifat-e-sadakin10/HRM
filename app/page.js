import Image from "next/image";

import Banner from "./components/blocks/Banner";
import DepartmentCard from "./components/blocks/DepartmentCard";

export default function Home() {
  return (
    <main className="">
      <Banner />
      <DepartmentCard />
    </main>
  );
}
