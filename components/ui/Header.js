import {logout} from "../../utils/auth";
import {useRouter} from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="p-4 lg:px-8 sticky top-0 bg-stone-50 z-50">
      <nav className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-semibold">Project Listing Photos</div>
          <a href="https://www.unsplash.com">
            <div className="text-xs">
              Photos provided by
              <span className="font-semibold"> Unsplash</span>
            </div>
          </a>
        </div>
        <div>
          <button className={"flex items-center justify-center bg-gray-100 text-black w-full py-2 rounded"} onClick={()=>{
            logout()
            router.push('/')
          }}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
