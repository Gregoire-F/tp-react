import NavBar from "../components/NavBar";

export default function Dashboard() {
  return (
    <main>
      <header>
        <NavBar />
      </header>

      <article className="mx-auto max-7-w-xl py-8 px-6 rounded border border-slate-300 border-t-4 border-t-black">
        <h2>Home</h2>
        <div className="relative w-full overflow-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  OS
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  VM count
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Used CPU
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Used RAM
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Used Storage
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </article>
    </main>
  );
}
