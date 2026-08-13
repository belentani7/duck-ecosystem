import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ClientPortal from "@/pages/ClientPortal";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuth } from "@/_core/hooks/useAuth";

function RoleAwareHome() {
  const { loading, user } = useAuth();
  if (loading) return <LoadingScreen phrase="Carregando seu espaço Duck..." />;
  return user?.role === "viewer" ? <ClientPortal /> : <Home />;
}

function RoleAwarePortal() {
  const { loading, user } = useAuth();
  if (loading) return <LoadingScreen phrase="Validando acesso ao portal..." />;
  return user?.role === "viewer" ? <ClientPortal /> : <NotFound />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={RoleAwareHome} />
      <Route path={"/portal"} component={RoleAwarePortal} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
