import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard"

export default function DashboardRouter() {
  return (
    <Routes>
        <Route path="/user/:userId" Component={Dashboard}/>
    </Routes>
    )
}