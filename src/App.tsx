import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Chat from "./features/chats/page/Chat"
import AppLayout from "./components/AppLayout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Profile from "./features/profile/page/Profile"
import Settings from "./features/settings/Settings"
import Contacts from "./features/contacts/page/Contacts"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
      <Route element={<ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>}>
        <Route path="/" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contacts" element={<Contacts />} />
    </Route>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
))
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: false,
    }
  }
});
const App = () => {
  return (
    <QueryClientProvider client={client} >
      <Toaster />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;