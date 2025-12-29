import { BannerCarousel } from "./components/BannerCarousel";
import { NewsSection } from "./components/NewSection";
import { Sidebar } from "./components/SideBar";

const HomePage = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <BannerCarousel />
          <NewsSection />
        </div>
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  </div>
);

export default HomePage;
