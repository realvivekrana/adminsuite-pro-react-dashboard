import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product } from "@/services/api";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Star, X } from "lucide-react";

/** Products page with grid view and CRUD modal UI */
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalProduct, setModalProduct] = useState<Partial<Product> | null>(null);
  const debouncedSearch = useDebouncedValue(search);
  const limit = 12;

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, debouncedSearch],
    queryFn: () => fetchProducts(page, limit, debouncedSearch),
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">Browse and manage your product catalog.</p>
        </div>
        <button
          onClick={() => setModalProduct({ title: "", price: 0, category: "", description: "" })}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="h-10 w-full rounded-lg bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-card rounded-xl p-3 sm:p-4 space-y-3 animate-pulse">
                <div className="h-36 sm:h-40 bg-muted rounded-lg" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))
          : data?.products.map((product, i) => (
              <div
                key={product.id}
                className="glass-card rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative h-36 sm:h-44 bg-muted overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => setModalProduct(product)}
                      className="p-1.5 rounded-md bg-background/80 backdrop-blur-sm hover:bg-background transition-colors text-foreground"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 rounded-md bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-colors text-foreground">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-3 sm:p-4 space-y-2">
                  <span className="text-xs font-medium text-primary capitalize bg-primary/10 px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-card-foreground text-sm line-clamp-1">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-foreground">${product.price}</span>
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
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

      {/* Add/Edit Modal */}
      {modalProduct !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={() => setModalProduct(null)}>
          <div className="glass-card rounded-2xl p-6 w-full max-w-md mx-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">{modalProduct.id ? "Edit" : "Add"} Product</h2>
              <button onClick={() => setModalProduct(null)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {(["title", "category", "description"] as const).map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium text-foreground capitalize mb-1.5 block">{field}</label>
                  {field === "description" ? (
                    <textarea
                      value={(modalProduct as any)[field] ?? ""}
                      onChange={(e) => setModalProduct((p) => ({ ...p, [field]: e.target.value }))}
                      className="w-full rounded-lg bg-secondary p-3 text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-ring resize-none h-20"
                    />
                  ) : (
                    <input
                      value={(modalProduct as any)[field] ?? ""}
                      onChange={(e) => setModalProduct((p) => ({ ...p, [field]: e.target.value }))}
                      className="w-full h-10 rounded-lg bg-secondary px-3 text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-ring"
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Price ($)</label>
                <input
                  type="number"
                  value={modalProduct.price ?? 0}
                  onChange={(e) => setModalProduct((p) => ({ ...p, price: Number(e.target.value) }))}
                  className="w-full h-10 rounded-lg bg-secondary px-3 text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                onClick={() => setModalProduct(null)}
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {modalProduct.id ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
