import Hero from "./components/hero";
import NavBar from "./components/nav";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden overflow-hidden px-52">
      <NavBar />
      <Hero />
      <div className="min-h-screen overflow-hidden"></div>
      <div className="min-h-screen overflow-hidden"></div>
    </main>
  );
}
