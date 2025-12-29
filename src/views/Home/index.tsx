import { BannerCarousel } from "./components/BannerCarousel";
import { NewsSection } from "./components/NewSection";
import { Sidebar } from "./components/SideBar";

const HomePage = () => (
  <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
    {/* Background decoration */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
    </div>

    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-3">
          <div className="animate-fade-in">
            <BannerCarousel />
          </div>
          <div className="animate-fade-in-delay">
            <NewsSection />
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="animate-fade-in-delay-2 sticky top-20 space-y-4">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  </div>
);

export default HomePage;
