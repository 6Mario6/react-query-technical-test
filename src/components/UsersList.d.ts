export type UsersListProps = {
  changeSorting: (sort: SortBy) => void;
  users: User[];
  highlightRow: boolean;
  handleDelete: (uuid: string) => void;
};
