import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight,
  Star, X, LayoutGrid, List, Package, Filter
} from "lucide-react";
import { mockProducts, type MockProduct } from "@/data/mockData";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_CFG = {
  active:   { label: "Active",   color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  draft:    { label: "Draft",    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"         },
  archived: { label: "Archived", color: "bg-secondary text-muted-foreground border-border"                               },
};

function StatusBadge({ status }: { status: MockProduct["status"] }) {
  const cfg = STATUS_CFG[status];
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>{cfg.label}</span>;
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <span className="text-xs font-medium text-red-500">Out of stock</span>;
  if (stock <= 10) return <span className="text-xs font-medium text-amber-500">{stock} left</span>;
  return <span className="text-xs font-medium text-muted-foreground">{stock} in stock</span>;
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="glass-card rounded-xl p-12 text-center col-span-full">
      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
      <p className="text-sm font-semibold text-foreground">No products found</p>
      <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
    </div>
  );
}

// ─── Add/Edit Modal ───────────────────────────────────────────────────────────
type ModalProduct = Partial<MockProduct>;

function ProductModal({ product, onClose }: { product: ModalProduct; onClose: () => void }) {
  const [form, setForm] = useState<ModalProduct>(product);
  const isEdit = !!product.id;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
        onClick={onClose}>
        <motion.div
          initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="glass-card rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg p-6 space-y-5"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">{isEdit ? "Edit Product" : "Add Product"}</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Image Preview */}
          {form.image && (
            <div className="h-32 rounded-xl overflow-hidden bg-secondary">
              <img src={form.image} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "name", label: "Product Name", type: "text", full: true },
              { key: "category", label: "Category", type: "text" },
              { key: "price", label: "Price ($)", type: "number" },
              { key: "stock", label: "Stock", type: "number" },
              { key: "sku", label: "SKU", type: "text" },
              { key: "image", label: "Image URL", type: "text" },
            ].map(({ key, label, type, full }) => (
              <div key={key} className={full ? "sm:col-span-2" : ""}>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{label}</label>
                <input type={type}
                  value={(form as any)[key] ?? ""}
                  onChange={(e) => setForm(p => ({ ...p, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
                  className="w-full h-10 rounded-lg bg-secondary px-3 text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Status</label>
              <select value={form.status ?? "active"}
                onChange={(e) => setForm(p => ({ ...p, status: e.target.value as MockProduct["status"] }))}
                className="w-full h-10 rounded-lg bg-secondary px-3 text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-ring cursor-pointer">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Cancel
            </button>
            <button onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-[#008060] text-white text-sm font-medium hover:bg-[#006e52] transition-colors">
              {isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type ViewMode = "grid" | "list";
type SortKey = "name" | "price" | "stock" | "sales";
const CATEGORIES = ["All", ...Array.from(new Set(mockProducts.map(p => p.category)))];
const PAGE_SIZE = 9;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("sales");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ModalProduct | null>(null);
  const debouncedSearch = useDebouncedValue(search);

  const filtered = useMemo(() => mockProducts
    .filter(p => {
      const q = debouncedSearch.toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      const matchCat = category === "All" || p.category === category;
      return matchQ && matchCat;
    })
    .sort((a, b) => {
      if (sortKey === "price") return b.price - a.price;
      if (sortKey === "stock") return b.stock - a.stock;
      if (sortKey === "sales") return b.sales - a.sales;
      return a.name.localeCompare(b.name);
    }), [debouncedSearch, category, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">{mockProducts.length} products in catalog</p>
        </div>
        <button onClick={() => setModal({ name: "", price: 0, stock: 0, category: "", status: "active", sku: "" })}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#008060] text-white text-sm font-medium hover:bg-[#006e52] transition-colors w-fit">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search products, SKU..."
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="h-10 w-full rounded-lg bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex gap-2 items-center">
            <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="h-10 px-3 rounded-lg bg-secondary border-0 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring cursor-pointer">
              <option value="sales">Sort: Best Selling</option>
              <option value="price">Sort: Price</option>
              <option value="stock">Sort: Stock</option>
              <option value="name">Sort: Name</option>
            </select>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button onClick={() => setView("grid")}
                className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button onClick={() => setView("list")}
                className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => { setCategory(cat); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === cat ? "bg-[#008060] text-white shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {paginated.length === 0 ? <EmptyState /> : paginated.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl overflow-hidden hover:border-[#008060]/30 hover:shadow-md transition-all duration-300 group">
              <div className="relative h-44 bg-secondary overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute top-2 left-2"><StatusBadge status={p.status} /></div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setModal(p)}
                    className="p-1.5 rounded-lg bg-background/90 backdrop-blur-sm hover:bg-background text-foreground transition-colors shadow-sm">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-background/90 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground text-foreground transition-colors shadow-sm">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#008060] bg-[#008060]/10 px-2 py-0.5 rounded-full">{p.category}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-semibold">{p.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground text-sm line-clamp-1">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">${p.price.toLocaleString()}</span>
                  <StockBadge stock={p.stock} />
                </div>
                <p className="text-xs text-muted-foreground">SKU: {p.sku} · {p.sales.toLocaleString()} sold</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  {["Product","Category","Price","Stock","Status","Sales",""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-12 text-center">
                    <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium text-foreground">No products found</p>
                  </td></tr>
                ) : paginated.map((p, i) => (
                  <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-accent/30 transition-colors group">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{p.name}</p>
                          <p className="text-xs text-muted-foreground">SKU: {p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-xs">{p.category}</td>
                    <td className="px-4 py-3.5 font-bold text-foreground">${p.price.toLocaleString()}</td>
                    <td className="px-4 py-3.5"><StockBadge stock={p.stock} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3.5 text-muted-foreground text-xs">{p.sales.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setModal(p)}
                          className="p-1.5 rounded-lg hover:bg-[#008060]/10 hover:text-[#008060] text-muted-foreground transition-colors">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{filtered.length} products · Page {page} of {totalPages}</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
              className="p-2 rounded-lg hover:bg-accent disabled:opacity-40 transition-colors text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i+1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors ${n===page ? "bg-[#008060] text-white" : "hover:bg-accent text-muted-foreground"}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
              className="p-2 rounded-lg hover:bg-accent disabled:opacity-40 transition-colors text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {modal !== null && <ProductModal product={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
