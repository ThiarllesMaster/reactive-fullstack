import './Nav.css'
import React from 'react'
import NavItem from './NavItem'

export default props => 
 <aside className = "menu-area">
     <nav className="menu">
         <NavItem path = "#/"      icon = "home"  title = "Home" />
         <NavItem path = "#/users" icon = "users" title = "Users" />    
     </nav>
 </aside>