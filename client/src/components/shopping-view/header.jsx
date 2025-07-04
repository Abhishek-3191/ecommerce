import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
// import { useSearchParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { resetTokenAndCredentials } from "../../store/auth-slice";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart || {});
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "Cartitems");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
            <span>{user?.userName?.[0]?.toUpperCase() || ""}</span>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  
  // const [keyword, setKeyword] = useState("");
  // const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const dispatch = useDispatch();
  // const { searchResults } = useSelector((state) => state.shopSearch);
  // const { productDetails } = useSelector((state) => state.shopProducts);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (keyword && keyword.trim() !== "") {
  //       if (!location.pathname.includes("/shop/search")) {
  //         navigate(`/shop/search?keyword=${keyword}`);
  //       } else {
  //         setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
  //       }
  //       dispatch(getSearchResults(keyword));
  //     } else {
  //       dispatch(resetSearchResults());
  //       setSearchParams(new URLSearchParams(`?keyword=`));
  //     }
  //   }, 500); // debounce input to reduce reloads
  
  //   return () => clearTimeout(timer);
  // }, [keyword]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (keyword?.trim()) {
  //       dispatch(getSearchResults(keyword));
  //       setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
  //     } else {
  //       dispatch(resetSearchResults());
  //       setSearchParams(new URLSearchParams(`?keyword=`));
  //     }
  //   }, 400);
  
  //   return () => clearTimeout(timer);
  // }, [keyword]);
  

  // const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
        {/* <div className="hidden lg:flex items-center gap-6">
        <MenuItems />

        <div className="relative">
    <input
      type="text"
      placeholder="Search products..."
      className="border rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      // onKeyDown={(e) => {
      //   if (e.key === "Enter") {
      //     const query = e.target.value.trim();
      //     if (query) {
      //       // Navigate to search page with query param
      //      navigate(`/shop/search?keyword=${query}`);
      //     }
      //   }
      // }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/shop/search?keyword=${keyword}`);
        }
      }}
      
      onChange={(event) => setKeyword(event.target.value)}
    />
  </div>

  <HeaderRightContent />
</div> */}
      </div>
    </header>
  );
}

export default ShoppingHeader;