import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Plus,
    Search,
    Package,
    DollarSign,
    FileText,
    MoreVertical,
    Edit,
    Trash2,
    X,
    Upload,
    File,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal, ModalFooter } from "@/components/ui/Modal"
import { Input, Textarea } from "@/components/ui/Input"
import { useToast } from "@/components/ui/Toast"

// Types
interface Product {
    id: string
    name: string
    type: string
    priceMin: number
    priceMax: number
    commission: number
    materialsCount: number
    description?: string
}

// Mock data
const mockProducts: Product[] = [
    {
        id: "1",
        name: "Payment Infrastructure API",
        type: "SaaS B2B",
        priceMin: 5000,
        priceMax: 50000,
        commission: 15,
        materialsCount: 4,
    },
    {
        id: "2",
        name: "Enterprise AI Platform",
        type: "API/Infrastructure",
        priceMin: 50000,
        priceMax: 200000,
        commission: 12,
        materialsCount: 6,
    },
    {
        id: "3",
        name: "Developer Tools Suite",
        type: "Developer Tools",
        priceMin: 5000,
        priceMax: 25000,
        commission: 18,
        materialsCount: 3,
    },
    {
        id: "4",
        name: "Healthcare Compliance Module",
        type: "Healthcare",
        priceMin: 25000,
        priceMax: 100000,
        commission: 15,
        materialsCount: 8,
    },
]

const productTypes = [
    "SaaS B2B",
    "API/Infrastructure",
    "Fintech",
    "Healthcare",
    "Digital Product",
    "Developer Tools",
    "Custom",
]

const formatCurrency = (amount: number): string => {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
}

export function ClientProducts() {
    const { addToast } = useToast()
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddProduct = () => {
        addToast("success", "Product created successfully!")
        setIsAddModalOpen(false)
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Products
                    </h1>
                    <p className="text-sm md:text-base text-[#6B6B6B]">
                        Manage what your agents sell
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add New
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                        "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border",
                        "bg-white border-[#E5E5E5]",
                        "placeholder:text-[#9CA3AF]",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                        "transition-all duration-200"
                    )}
                />
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <EmptyState onAdd={() => setIsAddModalOpen(true)} />
            )}

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddProduct}
            />
        </div>
    )
}

// Product Card
function ProductCard({ product }: { product: Product }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className={cn(
            "bg-white rounded-lg border border-[#E5E5E5] p-5",
            "hover:border-[#1A1A1A] hover:shadow-sm",
            "transition-all duration-200"
        )}>
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-[#1A1A1A] line-clamp-2 pr-2">
                    {product.name}
                </h3>
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-1 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>
                    {isMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                            <div className={cn(
                                "absolute right-0 top-full mt-1 w-32 z-20",
                                "bg-white rounded-lg border border-[#E5E5E5] shadow-lg",
                                "animate-in fade-in slide-in-from-top-2 duration-150"
                            )}>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <span className="inline-block px-2 py-0.5 bg-[#F5F5F5] rounded-full text-xs text-[#6B6B6B] mb-4">
                {product.type}
            </span>

            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#1A1A1A]">
                    <DollarSign className="w-4 h-4 text-[#6B6B6B]" />
                    {formatCurrency(product.priceMin)} - {formatCurrency(product.priceMax)}
                </div>
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <span className="font-medium text-[#1A1A1A]">{product.commission}%</span> commission
                </div>
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <FileText className="w-4 h-4" />
                    {product.materialsCount} materials
                </div>
            </div>

            <Button variant="secondary" size="sm" className="w-full mt-4">
                <Edit className="w-4 h-4" />
                Edit
            </Button>
        </div>
    )
}

// Empty State
function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-[#6B6B6B]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No products yet</h3>
            <p className="text-sm text-[#6B6B6B] mb-6 max-w-sm">
                Add your first product to get started with your AI sales agents
            </p>
            <Button onClick={onAdd}>
                <Plus className="w-4 h-4" />
                Add Product
            </Button>
        </div>
    )
}

// Add Product Modal
interface AddProductModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: () => void
}

function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        priceMin: "",
        priceMax: "",
        dealSize: "",
        salesCycle: "60",
        commission: "15",
        tieredCommission: false,
    })

    const handleSubmit = () => {
        onAdd()
        setFormData({
            name: "",
            type: "",
            description: "",
            priceMin: "",
            priceMax: "",
            dealSize: "",
            salesCycle: "60",
            commission: "15",
            tieredCommission: false,
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between sticky top-0 bg-white pb-4 border-b border-[#E5E5E5]">
                    <h2 className="text-xl font-semibold text-[#1A1A1A]">Add New Product</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors hidden md:block"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
                        Product Details
                    </h3>
                    <Input
                        label="Product Name"
                        placeholder="e.g., Payment Infrastructure API"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                            Product Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className={cn(
                                "w-full px-3.5 py-3 md:py-2.5 text-base md:text-sm rounded-lg border",
                                "bg-white border-[#E5E5E5]",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            )}
                        >
                            <option value="">Select type...</option>
                            {productTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <Textarea
                        label="Description"
                        placeholder="Describe your product..."
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
                        Pricing
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Min Price"
                            type="number"
                            placeholder="$5,000"
                            value={formData.priceMin}
                            onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })}
                        />
                        <Input
                            label="Max Price"
                            type="number"
                            placeholder="$50,000"
                            value={formData.priceMax}
                            onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Typical Deal Size"
                            type="number"
                            placeholder="$25,000"
                            value={formData.dealSize}
                            onChange={(e) => setFormData({ ...formData, dealSize: e.target.value })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Sales Cycle
                            </label>
                            <select
                                value={formData.salesCycle}
                                onChange={(e) => setFormData({ ...formData, salesCycle: e.target.value })}
                                className={cn(
                                    "w-full px-3.5 py-3 md:py-2.5 text-base md:text-sm rounded-lg border",
                                    "bg-white border-[#E5E5E5]",
                                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                )}
                            >
                                <option value="30">30 days</option>
                                <option value="60">60 days</option>
                                <option value="90">90 days</option>
                                <option value="120">120 days</option>
                                <option value="180">180 days</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Commission */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
                        Commission
                    </h3>
                    <Input
                        label="Base Commission Rate (%)"
                        type="number"
                        placeholder="15"
                        value={formData.commission}
                        onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                    />
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.tieredCommission}
                            onChange={(e) => setFormData({ ...formData, tieredCommission: e.target.checked })}
                            className="w-4 h-4 rounded border-[#E5E5E5] text-blue-600 focus:ring-blue-500/20"
                        />
                        <span className="text-sm text-[#1A1A1A]">Enable tiered commission</span>
                    </label>
                </div>

                {/* Product Materials */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
                        Product Materials
                    </h3>
                    <div className={cn(
                        "border-2 border-dashed border-[#E5E5E5] rounded-lg p-6",
                        "flex flex-col items-center justify-center text-center",
                        "hover:border-blue-500 transition-colors cursor-pointer"
                    )}>
                        <Upload className="w-8 h-8 text-[#6B6B6B] mb-2" />
                        <p className="text-sm text-[#1A1A1A] mb-1">
                            Drag files here or click to upload
                        </p>
                        <p className="text-xs text-[#6B6B6B]">
                            PDF, PPTX, DOCX, MP4 (Max 50MB)
                        </p>
                    </div>
                </div>

                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!formData.name || !formData.type}>
                        Save Product
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}
