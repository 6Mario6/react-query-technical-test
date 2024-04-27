import { useEffect, useMemo, useRef, useState } from "react";
import { SortBy, type User } from "./types.d";
import { UsersList } from "./components/UsersList.component";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const [highlightRow, setHighlightRow] = useState(false);

  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);

  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const originalUsers = useRef<User[]>([]);

  const toggleHighlightRow = () => setHighlightRow(!highlightRow);

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const handleDeleteUser = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid);
    setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleResetUsers = () => {
    setUsers(originalUsers.current);
  };

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.NAME]: (user: User) => user.name.first,
      [SortBy.LAST]: (user: User) => user.name.last,
      [SortBy.COUNTRY]: (user: User) => user.location.country,
    };

    return [...filteredUsers].sort((currentUser: User, nextUser: User) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(currentUser).localeCompare(
        extractProperty(nextUser)
      );
    });
  }, [filteredUsers, sorting]);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=10")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='App'>
      <h1>Technical Test</h1>
      sort by {sorting}
      <header>
        <button onClick={toggleHighlightRow}>Highlight rows</button>
        <button onClick={toggleSortByCountry}>Sort by country </button>
        <button onClick={handleResetUsers}>Restart users</button>
        <input
          placeholder='country Filter'
          type='text'
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        <UsersList
          changeSorting={handleChangeSort}
          handleDelete={handleDeleteUser}
          highlightRow={highlightRow}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default App;
