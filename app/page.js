import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";

export default function Home() {
  return (
    <main>
      <div>
        <Navbar />
        <div className="flex flex-col w-full lg:flex-row">
          <div className="px-10">
            <SearchBar/>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="">
            <Table/>
          </div>
        </div>
      </div>
    </main>
  );
}
