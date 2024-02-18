import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Chat from "./features/chats/page/Chat"
import AppLayout from "./components/AppLayout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Profile from "./features/profile/page/Profile"
import Settings from "./features/settings/Settings"
import Contacts from "./features/contacts/page/Contacts"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route path="/" element={<Chat />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    <Route path="contacts" element={<Contacts />} />
  </Route>
))
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
});
const App = () => {
  return (
    <QueryClientProvider client={client} >
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;