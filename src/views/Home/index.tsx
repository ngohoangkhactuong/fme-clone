import { BannerCarousel } from "./components/BannerCarousel";
import { NewsSection } from "./components/NewSection";
import { Sidebar } from "./components/SideBar";

const HomePage = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="flex flex-col gap-8 lg:col-span-3">
        <BannerCarousel />
        <NewsSection />
      </div>
      <aside className="lg:col-span-1">
        <Sidebar />
      </aside>
    </div>
  </div>
);

export default HomePage;
