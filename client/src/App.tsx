import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import StandaloneStudentPage from "@/pages/standalone-student-page";
import StandaloneAdminPage from "@/pages/standalone-admin-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/student" component={StandaloneStudentPage} />
      <Route path="/admin" component={StandaloneAdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
