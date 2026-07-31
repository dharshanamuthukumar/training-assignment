import { useInterns } from "../contexts/intern-context";
import useInternSearch from "../hooks/useInternSearch";

function InternSearch() {
  const { interns, search, setSearch } = useInterns();
  const { stats } = useInternSearch(interns);

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search by name or role"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ margin: "12px 0" }}>
        <p>Total Interns: {stats.total}</p>
        <p>Present: {stats.present}</p>
        <p>Average Score: {stats.avg}</p>
      </div>
    </div>
  );
}

export default InternSearch;
