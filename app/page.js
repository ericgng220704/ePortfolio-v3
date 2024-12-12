import Hero from "./components/hero";
import NavBar from "./components/nav";
import Projects from "./components/project";
//https://uiseptimiu.framer.website/
export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden overflow-hidden md:px-28 lg:px-52">
      <NavBar />
      {/* <Hero /> */}
      <Projects />
      {/* <div className="min-h-screen"></div> */}
      {/* <div className="min-h-screen"></div>
      <div className="h-96 bg-white"></div> */}
    </main>
  );
}
