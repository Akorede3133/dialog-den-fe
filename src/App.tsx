import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Chat from "./features/chats/page/Chat"
import AppLayout from "./components/AppLayout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Profile from "./features/profile/page/Profile"
import Settings from "./features/settings/Settings"
import Contacts from "./features/contacts/page/Contacts"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useAppDispatch } from "./redux/hooks"
import { connectSocket } from "./features/chats/redux/socketSlice"
import { SocketProvider } from "./features/chats/context/socketContext"


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
      <Route element={<AppLayout />}>
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
    }
  }
});
const App = () => {
  return (
    <QueryClientProvider client={client} >
      <SocketProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </SocketProvider>
     
    </QueryClientProvider>
  )
}

export default App;