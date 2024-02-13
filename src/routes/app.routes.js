import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "../pages/Home";
//import NewPost from "../pages/NewPost";
//import PostUser from "../pages/PostsUser";
import Profile from "../pages/Profile";
import Search from "../pages/Search";

const Tab = createBottomTabNavigator();

function AppRoutes(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Search" component={Search}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  )
}

export default AppRoutes;