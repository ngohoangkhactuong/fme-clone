import { BannerCarousel } from "./components/BannerCarousel";
import { NewsSection } from "./components/NewSection";
import { Sidebar } from "./components/SideBar";

const HomePage = () => (
  <div className="relative min-h-screen overflow-hidden">
    {/* Background decoration */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/20 to-transparent blur-3xl dark:from-blue-900/20" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-100/20 to-transparent blur-3xl dark:from-blue-950/20" />
    </div>

    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
        <div className="flex flex-col gap-10 lg:col-span-3">
          <div className="animate-fade-in">
            <BannerCarousel />
          </div>
          <div className="animate-fade-in-delay">
            <NewsSection />
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="animate-fade-in-delay-2 sticky top-24">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  </div>
);

export default HomePage;
