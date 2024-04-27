import { SortBy, type User } from "../types.d";
import { type UsersListProps } from "./UsersList";
import style from "./UsersList.module.css";

export const UsersList = ({
  changeSorting,
  users,
  highlightRow,
  handleDelete,
}: UsersListProps) => {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Picture</th>
          <th
            className={style.pointer}
            onClick={() => {
              changeSorting(SortBy.NAME);
            }}
          >
            Name
          </th>
          <th
            className={style.pointer}
            onClick={() => {
              changeSorting(SortBy.LAST);
            }}
          >
            Lastname
          </th>
          <th
            className={style.pointer}
            onClick={() => {
              changeSorting(SortBy.COUNTRY);
            }}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={highlightRow ? style.showColors : ""}>
        {users.map((user: User) => {
          return (
            <tr key={user.login.uuid}>
              <td>
                <img src={user.picture.thumbnail} alt='' />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDelete(user.login.uuid)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
