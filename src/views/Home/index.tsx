import { BannerCarousel } from "./components/BannerCarousel";
import { NewsSection } from "./components/NewSection";
import { Sidebar } from "./components/SideBar";

const HomePage = () => (
  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
      <div className="flex flex-col gap-10 lg:col-span-3">
        <BannerCarousel />
        <NewsSection />
      </div>
      <aside className="lg:col-span-1">
        <div className="sticky top-24">
          <Sidebar />
        </div>
      </aside>
    </div>
  </div>
);

export default HomePage;
