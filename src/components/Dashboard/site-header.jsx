import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "../../api/apiSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { logoutUser } from "../../features/auth/authSlice";

export function SiteHeader() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="text-white flex h-14 shrink-0 items-center gap-2 border-b border-lite transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex justify-between w-full items-center gap-2">
          <div>
            <h1 className="text-base font-medium">Welcome {user.name}!</h1>
          </div>
          <div className="flex gap-2 items-center">
            <Avatar className="border rounded-full border-blue-700">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>Efaz</AvatarFallback>
            </Avatar>
            <button onClick={signout} variant="outline">logut</button>
          </div>
        </div>
      </div>
    </header>
  );
}
