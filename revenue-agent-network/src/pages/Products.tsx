import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import {
    Plus,
    Search,
    Package,
    Upload,
    FileText,
    FileIcon,
    Film,
    X,
    DollarSign,
    Percent,
    Clock,
    Target,
    MoreHorizontal,
    Grid3X3,
    List,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/Toast"

// Types
interface UploadedFile {
    id: string
    name: string
    size: number
    type: string
}

interface Product {
    id: string
    name: string
    productType: string
    priceMin: number
    priceMax: number
    salesCycle: number
    commissionRate: number
    targetStage: string
    files: UploadedFile[]
    createdAt: string
}

// Mock data
const mockProducts: Product[] = [
    {
        id: "1",
        name: "Enterprise Platform License",
        productType: "saas-b2b",
        priceMin: 50000,
        priceMax: 150000,
        salesCycle: 90,
        commissionRate: 12,
        targetStage: "series-a",
        files: [
            { id: "f1", name: "Product Overview.pdf", size: 2400000, type: "pdf" },
            { id: "f2", name: "Demo Video.mp4", size: 45000000, type: "mp4" },
        ],
        createdAt: "2024-10-15",
    },
    {
        id: "2",
        name: "API Integration Suite",
        productType: "api-infrastructure",
        priceMin: 20000,
        priceMax: 75000,
        salesCycle: 60,
        commissionRate: 10,
        targetStage: "seed",
        files: [
            { id: "f3", name: "API Documentation.pdf", size: 1200000, type: "pdf" },
            { id: "f4", name: "Integration Guide.docx", size: 850000, type: "docx" },
        ],
        createdAt: "2024-11-01",
    },
    {
        id: "3",
        name: "Analytics Dashboard Pro",
        productType: "saas-b2b",
        priceMin: 15000,
        priceMax: 45000,
        salesCycle: 30,
        commissionRate: 8,
        targetStage: "seed",
        files: [
            { id: "f5", name: "Feature Overview.pptx", size: 3200000, type: "pptx" },
        ],
        createdAt: "2024-11-15",
    },
    {
        id: "4",
        name: "Security Compliance Add-on",
        productType: "saas-b2b",
        priceMin: 25000,
        priceMax: 60000,
        salesCycle: 60,
        commissionRate: 10,
        targetStage: "series-a",
        files: [
            { id: "f6", name: "Security Whitepaper.pdf", size: 1800000, type: "pdf" },
            { id: "f7", name: "Compliance Matrix.docx", size: 450000, type: "docx" },
            { id: "f8", name: "Security Demo.mp4", size: 38000000, type: "mp4" },
        ],
        createdAt: "2024-12-01",
    },
    {
        id: "5",
        name: "Fintech Payment Gateway",
        productType: "fintech",
        priceMin: 30000,
        priceMax: 100000,
        salesCycle: 180,
        commissionRate: 15,
        targetStage: "series-b",
        files: [],
        createdAt: "2024-12-10",
    },
    {
        id: "6",
        name: "Healthcare Data Platform",
        productType: "healthcare",
        priceMin: 75000,
        priceMax: 200000,
        salesCycle: 180,
        commissionRate: 14,
        targetStage: "series-b",
        files: [
            { id: "f9", name: "HIPAA Compliance.pdf", size: 2100000, type: "pdf" },
        ],
        createdAt: "2024-12-15",
    },
]

const productTypeOptions = [
    { value: "saas-b2b", label: "SaaS B2B" },
    { value: "api-infrastructure", label: "API/Infrastructure" },
    { value: "fintech", label: "Fintech" },
    { value: "healthcare", label: "Healthcare" },
    { value: "digital-product", label: "Digital Product" },
]

const salesCycleOptions = [
    { value: "30", label: "30 days" },
    { value: "60", label: "60 days" },
    { value: "90", label: "90 days" },
    { value: "180", label: "180 days" },
]

const targetStageOptions = [
    { value: "pre-seed", label: "Pre-seed" },
    { value: "seed", label: "Seed" },
    { value: "series-a", label: "Series A" },
    { value: "series-b", label: "Series B" },
]

const getProductTypeLabel = (value: string) => {
    return productTypeOptions.find((opt) => opt.value === value)?.label || value
}

const getTargetStageLabel = (value: string) => {
    return targetStageOptions.find((opt) => opt.value === value)?.label || value
}

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case "pdf":
            return <FileText className="w-4 h-4 text-red-500" />
        case "mp4":
            return <Film className="w-4 h-4 text-purple-500" />
        case "pptx":
            return <FileIcon className="w-4 h-4 text-orange-500" />
        case "docx":
            return <FileText className="w-4 h-4 text-blue-500" />
        default:
            return <FileIcon className="w-4 h-4 text-[#6B6B6B]" />
    }
}

export function Products() {
    const { addToast } = useToast()
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product)
        setIsCreateModalOpen(true)
    }

    const handleProductCreated = (newProduct: Product) => {
        if (selectedProduct) {
            // Update existing product
            setProducts((prev) =>
                prev.map((p) => (p.id === selectedProduct.id ? newProduct : p))
            )
            addToast("success", `${newProduct.name} updated successfully!`)
        } else {
            // Add new product
            setProducts((prev) => [...prev, newProduct])
            addToast("success", `${newProduct.name} added to library!`)
        }
        setIsCreateModalOpen(false)
        setSelectedProduct(null)
    }

    const handleCloseModal = () => {
        setIsCreateModalOpen(false)
        setSelectedProduct(null)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between animate-fade-in">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Products
                    </h1>
                    <p className="text-[#6B6B6B]">
                        Manage your product catalog and sales materials.
                    </p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add Product
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 animate-slide-up">
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                            <Package className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Total Products</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">{products.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Materials</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                {products.reduce((sum, p) => sum + p.files.length, 0)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Avg. Price</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                ${(products.reduce((sum, p) => sum + (p.priceMin + p.priceMax) / 2, 0) / products.length / 1000).toFixed(0)}K
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                            <Percent className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Avg. Commission</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                {(products.reduce((sum, p) => sum + p.commissionRate, 0) / products.length).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search & View Toggle */}
            <div className="flex items-center justify-between animate-slide-up stagger-1">
                <div className="relative flex-1 max-w-sm">
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
                            "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A]",
                            "transition-all duration-200"
                        )}
                    />
                </div>
                <div className="flex items-center gap-1 bg-white rounded-lg border border-[#E5E5E5] p-1">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={cn(
                            "p-2 rounded-md transition-colors",
                            viewMode === "grid"
                                ? "bg-[#F5F5F5] text-[#1A1A1A]"
                                : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                        )}
                    >
                        <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={cn(
                            "p-2 rounded-md transition-colors",
                            viewMode === "list"
                                ? "bg-[#F5F5F5] text-[#1A1A1A]"
                                : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                        )}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up stagger-2">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className={cn(
                                "bg-white rounded-lg border border-[#E5E5E5] p-5",
                                "hover:border-[#1A1A1A] hover:shadow-sm",
                                "transition-all duration-200 cursor-pointer"
                            )}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                    <Package className="w-5 h-5 text-[#6B6B6B]" />
                                </div>
                                <Badge variant="default">{getProductTypeLabel(product.productType)}</Badge>
                            </div>

                            <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">
                                {product.name}
                            </h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#6B6B6B]">Price Range</span>
                                    <span className="font-medium text-[#1A1A1A]">
                                        ${(product.priceMin / 1000).toFixed(0)}K - ${(product.priceMax / 1000).toFixed(0)}K
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#6B6B6B]">Commission</span>
                                    <span className="font-medium text-[#1A1A1A]">{product.commissionRate}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#6B6B6B]">Materials</span>
                                    <span className="font-medium text-[#1A1A1A]">
                                        {product.files.length} files
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Card className="overflow-hidden animate-slide-up stagger-2">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Price Range
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Sales Cycle
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Commission
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                                        Materials
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        onClick={() => handleProductClick(product)}
                                        className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors duration-150 cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                                    <Package className="w-4 h-4 text-[#6B6B6B]" />
                                                </div>
                                                <span className="text-sm font-medium text-[#1A1A1A]">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge variant="default">{getProductTypeLabel(product.productType)}</Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm text-[#1A1A1A]">
                                                ${(product.priceMin / 1000).toFixed(0)}K - ${(product.priceMax / 1000).toFixed(0)}K
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm text-[#6B6B6B]">{product.salesCycle} days</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm font-medium text-[#1A1A1A]">
                                                {product.commissionRate}%
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm text-[#6B6B6B]">
                                                {product.files.length} files
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Create/Edit Product Modal */}
            <ProductModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseModal}
                onSave={handleProductCreated}
                product={selectedProduct}
            />
        </div>
    )
}

// Product Modal Component
interface ProductModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (product: Product) => void
    product: Product | null
}

function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: product?.name || "",
        productType: product?.productType || "saas-b2b",
        priceMin: product?.priceMin?.toString() || "",
        priceMax: product?.priceMax?.toString() || "",
        salesCycle: product?.salesCycle?.toString() || "60",
        commissionRate: product?.commissionRate?.toString() || "",
        targetStage: product?.targetStage || "seed",
    })
    const [files, setFiles] = useState<UploadedFile[]>(product?.files || [])

    // Reset form when product changes
    useState(() => {
        if (product) {
            setFormData({
                name: product.name,
                productType: product.productType,
                priceMin: product.priceMin.toString(),
                priceMax: product.priceMax.toString(),
                salesCycle: product.salesCycle.toString(),
                commissionRate: product.commissionRate.toString(),
                targetStage: product.targetStage,
            })
            setFiles(product.files)
        } else {
            setFormData({
                name: "",
                productType: "saas-b2b",
                priceMin: "",
                priceMax: "",
                salesCycle: "60",
                commissionRate: "",
                targetStage: "seed",
            })
            setFiles([])
        }
    })

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
            id: `${Date.now()}-${file.name}`,
            name: file.name,
            size: file.size,
            type: file.name.split(".").pop() || "",
        }))
        setFiles((prev) => [...prev, ...newFiles])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "video/mp4": [".mp4"],
        },
        maxSize: 50 * 1024 * 1024, // 50MB
    })

    const removeFile = (fileId: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== fileId))
    }

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const savedProduct: Product = {
            id: product?.id || `${Date.now()}`,
            name: formData.name,
            productType: formData.productType,
            priceMin: parseInt(formData.priceMin) || 0,
            priceMax: parseInt(formData.priceMax) || 0,
            salesCycle: parseInt(formData.salesCycle) || 60,
            commissionRate: parseInt(formData.commissionRate) || 0,
            targetStage: formData.targetStage,
            files,
            createdAt: product?.createdAt || new Date().toISOString().split("T")[0],
        }

        setIsSaving(false)
        onSave(savedProduct)
    }

    const isFormValid = formData.name.trim().length > 0 && formData.priceMin && formData.priceMax

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#1A1A1A]">
                            {product ? "Edit Product" : "Add New Product"}
                        </h2>
                        <p className="text-sm text-[#6B6B6B] mt-1">
                            Configure product details and upload materials
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Product Name"
                        placeholder="e.g., Enterprise Platform"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Select
                        label="Product Type"
                        options={productTypeOptions}
                        value={formData.productType}
                        onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    />
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Price Range
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                            <input
                                type="number"
                                placeholder="Min"
                                value={formData.priceMin}
                                onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })}
                                className={cn(
                                    "w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border",
                                    "bg-white border-[#E5E5E5]",
                                    "placeholder:text-[#9CA3AF]",
                                    "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A]",
                                    "transition-all duration-200"
                                )}
                            />
                        </div>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                            <input
                                type="number"
                                placeholder="Max"
                                value={formData.priceMax}
                                onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
                                className={cn(
                                    "w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border",
                                    "bg-white border-[#E5E5E5]",
                                    "placeholder:text-[#9CA3AF]",
                                    "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-[#1A1A1A]",
                                    "transition-all duration-200"
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Sales Cycle & Commission */}
                <div className="grid grid-cols-3 gap-4">
                    <Select
                        label="Sales Cycle"
                        options={salesCycleOptions}
                        value={formData.salesCycle}
                        onChange={(e) => setFormData({ ...formData, salesCycle: e.target.value })}
                    />
                    <Input
                        label="Commission Rate (%)"
                        type="number"
                        placeholder="e.g., 10"
                        value={formData.commissionRate}
                        onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                    />
                    <Select
                        label="Target Stage"
                        options={targetStageOptions}
                        value={formData.targetStage}
                        onChange={(e) => setFormData({ ...formData, targetStage: e.target.value })}
                    />
                </div>

                {/* File Upload Zone */}
                <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Sales Materials
                    </label>
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200",
                            isDragActive
                                ? "border-[#1A1A1A] bg-[#F5F5F5]"
                                : "border-[#E5E5E5] hover:border-[#1A1A1A] hover:bg-[#FAFAFA]"
                        )}
                    >
                        <input {...getInputProps()} />
                        <Upload className="w-8 h-8 text-[#6B6B6B] mx-auto mb-3" />
                        <p className="text-sm text-[#1A1A1A] font-medium mb-1">
                            {isDragActive ? "Drop files here" : "Drag files here or click to upload"}
                        </p>
                        <p className="text-xs text-[#6B6B6B]">
                            PDF, PPTX, DOCX, MP4 (max 50MB)
                        </p>
                    </div>

                    {/* Uploaded Files List */}
                    {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between px-4 py-3 bg-[#FAFAFA] rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        {getFileIcon(file.type)}
                                        <div>
                                            <p className="text-sm font-medium text-[#1A1A1A]">{file.name}</p>
                                            <p className="text-xs text-[#6B6B6B]">{formatFileSize(file.size)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E5E5]">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} loading={isSaving} disabled={!isFormValid}>
                        {product ? "Save Changes" : "Add Product"}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
