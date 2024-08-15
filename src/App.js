import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import MainContainer from "./components/MainContainer";
import Tasks from "./components/Tasks";
import Users from "./components/Users";
import UserStory from "./components/UserStory";
import Login from "./components/Login";
import Project from "./components/Project";
import { Provider } from "react-redux";
import store from "./utils/store";
import Logout from "./components/Logout";
import ViewTasks from "./components/UserComponents/ViewTasks";
import ViewTaskContainer from "./components/UserComponents/ViewTaskContainer";
import UserStoryShimmer from "./components/UserComponents/UserStoryShimmer";

export const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Body/>,
    children:[
      {
        path:"/",
        element:<MainContainer/>
      },
      {
        path:"/tasks",
        element:<Tasks/>
      },
      {
        path:"/Users",
        element:<Users/>
      },
      {
        path:"/userstory",
        element:<UserStory/>
      },
      {
        path:"/projects",
        element:<Project/>
      },
      {
        path:"/logout",
        element:<Logout/>
      },
      {
        path:"/user/view-tasks/:id",
        element:<ViewTasks/>
      },
      {
        path:"/user/view-task/:id",
        element:<ViewTaskContainer/>
      },
      {
        path:"/shimmer",
        element:<UserStoryShimmer/>
      }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  }
]
)

function App() {
  return (
    <Provider store={store}>
    <RouterProvider router={appRouter}>
    <div className="App">
      <h1 className="text-red-500">app running</h1>
    </div>
    </RouterProvider>
    </Provider>
  );
}

export default App;
