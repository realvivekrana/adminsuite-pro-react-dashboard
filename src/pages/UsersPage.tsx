import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, type User } from "@/services/api";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

/** Users page with searchable, paginated table */
export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, debouncedSearch],
    queryFn: () => fetchUsers(page, limit, debouncedSearch),
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">Manage and view all registered users.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="h-10 w-full rounded-lg bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Phone</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Company</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td colSpan={5} className="p-4"><div className="h-5 bg-muted rounded animate-pulse w-3/4" /></td>
                  </tr>
                ))
              ) : (
                data?.users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={user.image} alt={user.firstName} className="h-8 w-8 rounded-full object-cover" />
                        <span className="font-medium text-foreground">{user.firstName} {user.lastName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{user.email}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{user.phone}</td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">{user.company?.name ?? "—"}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages} ({data?.total} users)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
