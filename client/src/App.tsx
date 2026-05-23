import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Resources = lazy(() => import("./pages/Resources"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Blog = lazy(() => import("./pages/blog"));
const Podcast = lazy(() => import("./pages/podcast"));
const Videos = lazy(() => import("./pages/videos"));
const JoinOurTeam = lazy(() => import("./pages/joinourteam"));
const CRM = lazy(() => import("./pages/CRM"));
const AgentPortal = lazy(() => import("./pages/AgentPortal"));
const SocialAccounts = lazy(() => import("./pages/socialaccounts"));

function Router() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center text-slate-500">
          Loading...
        </div>
      }
    >
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/services"} component={Services} />
        <Route path={"/resources"} component={Resources} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/podcast"} component={Podcast} />
        <Route path={"/videos"} component={Videos} />
        <Route path={"/join-our-team"} component={JoinOurTeam} />
        <Route path={"/crm"} component={CRM} />
        <Route path={"/agent-portal"} component={AgentPortal} />
        <Route path={"/social-accounts"} component={SocialAccounts} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/privacy-policy"} component={PrivacyPolicy} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <Navigation />
            <main id="main-content" className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
