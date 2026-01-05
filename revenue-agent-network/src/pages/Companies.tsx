import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Plus,
    Search,
    Building2,
    Upload,
    Link2,
    FileSpreadsheet,
    X,
    Check,
    Users,
    DollarSign,
    TrendingUp,
    Bot,
    ExternalLink,
    Filter,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/Toast"

// Types
interface Company {
    id: string
    name: string
    domain: string
    sector: string
    stage: string
    fundingAmount: number
    employees: number
    assignedAgent: string | null
    pipelineValue: number
    lastFundingDate: string
    imported: boolean
}

// Mock data - Portfolio companies
const mockPortfolio: Company[] = [
    {
        id: "1",
        name: "TechCorp Industries",
        domain: "techcorp.com",
        sector: "SaaS",
        stage: "Series A",
        fundingAmount: 15000000,
        employees: 85,
        assignedAgent: "Agent Alpha",
        pipelineValue: 156000,
        lastFundingDate: "2024-09-15",
        imported: true,
    },
    {
        id: "2",
        name: "DataFlow Solutions",
        domain: "dataflow.io",
        sector: "AI",
        stage: "Seed",
        fundingAmount: 4500000,
        employees: 32,
        assignedAgent: "Agent Beta",
        pipelineValue: 124000,
        lastFundingDate: "2024-10-20",
        imported: true,
    },
    {
        id: "3",
        name: "CloudSync Global",
        domain: "cloudsync.com",
        sector: "SaaS",
        stage: "Series B",
        fundingAmount: 35000000,
        employees: 180,
        assignedAgent: "Agent Gamma",
        pipelineValue: 98000,
        lastFundingDate: "2024-08-05",
        imported: true,
    },
    {
        id: "4",
        name: "InnovateLabs Inc",
        domain: "innovatelabs.co",
        sector: "AI",
        stage: "Series A",
        fundingAmount: 12000000,
        employees: 65,
        assignedAgent: null,
        pipelineValue: 87000,
        lastFundingDate: "2024-11-10",
        imported: true,
    },
    {
        id: "5",
        name: "QuantumAI Systems",
        domain: "quantumai.tech",
        sector: "AI",
        stage: "Series B",
        fundingAmount: 50000000,
        employees: 220,
        assignedAgent: "Agent Alpha",
        pipelineValue: 72000,
        lastFundingDate: "2024-07-25",
        imported: true,
    },
    {
        id: "6",
        name: "FinanceHub Pro",
        domain: "financehub.com",
        sector: "Fintech",
        stage: "Seed",
        fundingAmount: 3200000,
        employees: 28,
        assignedAgent: "Agent Beta",
        pipelineValue: 45000,
        lastFundingDate: "2024-12-01",
        imported: true,
    },
]

// Mock data - Companies available for import
const mockImportableCompanies: Company[] = [
    {
        id: "i1",
        name: "NeuralTech AI",
        domain: "neuraltech.ai",
        sector: "AI",
        stage: "Seed",
        fundingAmount: 5000000,
        employees: 42,
        assignedAgent: null,
        pipelineValue: 0,
        lastFundingDate: "2024-12-10",
        imported: false,
    },
    {
        id: "i2",
        name: "PayScale Finance",
        domain: "payscale.finance",
        sector: "Fintech",
        stage: "Series A",
        fundingAmount: 18000000,
        employees: 95,
        assignedAgent: null,
        pipelineValue: 0,
        lastFundingDate: "2024-11-28",
        imported: false,
    },
    {
        id: "i3",
        name: "MedData Health",
        domain: "meddata.health",
        sector: "Healthcare",
        stage: "Seed",
        fundingAmount: 6500000,
        employees: 55,
        assignedAgent: null,
        pipelineValue: 0,
        lastFundingDate: "2024-12-05",
        imported: false,
    },
    {
        id: "i4",
        name: "CloudBase Systems",
        domain: "cloudbase.io",
        sector: "SaaS",
        stage: "Pre-seed",
        fundingAmount: 1500000,
        employees: 12,
        assignedAgent: null,
        pipelineValue: 0,
        lastFundingDate: "2024-12-15",
        imported: false,
    },
    {
        id: "i5",
        name: "AutoML Platform",
        domain: "automl.dev",
        sector: "AI",
        stage: "Series A",
        fundingAmount: 22000000,
        employees: 78,
        assignedAgent: null,
        pipelineValue: 0,
        lastFundingDate: "2024-10-30",
        imported: false,
    },
    {
        id: "i6",
        name: "BlockPay Solutions",
        domain: "blockpay.io",
        sector: "Fintech",
        stage: "Seed",
        fundingAmount: 8000000,
        employees: 48,
        assignedAgent: null,
        pipelineValue: 0,
        lastFundingDate: "2024-11-15",
        imported: false,
    },
    {
        id: "i7",
        name: "HealthSync Pro",
        domain: "healthsync.pro",
        sector: "Healthcare",
        stage: "Series A",
        fundingAmount: 14000000,
        employees: 62,
        assignedAgent: null,
        pipelineValue: 0,
        lastFundingDate: "2024-09-20",
        imported: false,
    },
    {
        id: "i8",
        name: "DevOps Cloud",
        domain: "devopscloud.com",
        sector: "SaaS",
        stage: "Series B",
        fundingAmount: 40000000,
        employees: 165,
        assignedAgent: null,
        pipelineValue: 0,
        lastFundingDate: "2024-08-15",
        imported: false,
    },
]

const stageOptions = ["Pre-seed", "Seed", "Series A", "Series B"]
const sectorOptions = ["AI", "SaaS", "Fintech", "Healthcare"]
const fundingDateOptions = [
    { value: "90", label: "Last 90 days" },
    { value: "180", label: "Last 6 months" },
    { value: "365", label: "Last year" },
]

const formatFunding = (amount: number): string => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`
    }
    return `$${(amount / 1000).toFixed(0)}K`
}

export function Companies() {
    const { addToast } = useToast()
    const [portfolio, setPortfolio] = useState<Company[]>(mockPortfolio)
    const [searchQuery, setSearchQuery] = useState("")
    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

    const filteredPortfolio = portfolio.filter((company) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.sector.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleCompanyClick = (company: Company) => {
        setSelectedCompany(company)
        setIsDetailModalOpen(true)
    }

    const handleImport = (company: Company) => {
        const importedCompany: Company = {
            ...company,
            id: `portfolio-${Date.now()}`,
            imported: true,
        }
        setPortfolio((prev) => [...prev, importedCompany])
        addToast("success", `${company.name} added to portfolio!`)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between animate-fade-in">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight">
                        Companies
                    </h1>
                    <p className="text-[#6B6B6B]">
                        Manage your company portfolio and import new prospects.
                    </p>
                </div>
                <Button onClick={() => setIsImportModalOpen(true)}>
                    <Upload className="w-4 h-4" />
                    Import Companies
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 animate-slide-up">
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Total Companies</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">{portfolio.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Assigned</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                {portfolio.filter((c) => c.assignedAgent).length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Pipeline Value</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                ${(portfolio.reduce((sum, c) => sum + c.pipelineValue, 0) / 1000).toFixed(0)}K
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#6B6B6B]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#6B6B6B]">Total Employees</p>
                            <p className="text-xl font-semibold text-[#1A1A1A]">
                                {portfolio.reduce((sum, c) => sum + c.employees, 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 animate-slide-up stagger-1">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                    <input
                        type="text"
                        placeholder="Search companies..."
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
            </div>

            {/* Portfolio Grid */}
            <div className="space-y-3 animate-slide-up stagger-2">
                <h2 className="text-sm font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    Current Portfolio
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPortfolio.map((company) => (
                        <div
                            key={company.id}
                            onClick={() => handleCompanyClick(company)}
                            className={cn(
                                "bg-white rounded-lg border border-[#E5E5E5] p-5",
                                "hover:border-[#1A1A1A] hover:shadow-sm",
                                "transition-all duration-200 cursor-pointer"
                            )}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                    <span className="text-sm font-semibold text-[#6B6B6B]">
                                        {company.name.charAt(0)}
                                    </span>
                                </div>
                                {company.assignedAgent && (
                                    <Badge variant="success" className="text-xs">
                                        <Bot className="w-3 h-3 mr-1" />
                                        {company.assignedAgent}
                                    </Badge>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">
                                {company.name}
                            </h3>
                            <p className="text-sm text-[#6B6B6B] mb-4">
                                {company.sector} • {company.stage} • {company.employees} employees
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                                <div>
                                    <p className="text-xs text-[#6B6B6B]">Pipeline Value</p>
                                    <p className="text-base font-semibold text-[#1A1A1A]">
                                        ${company.pipelineValue.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#6B6B6B]">Funding</p>
                                    <p className="text-base font-semibold text-[#1A1A1A]">
                                        {formatFunding(company.fundingAmount)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Import Modal */}
            <ImportModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImport={handleImport}
                existingIds={portfolio.map((c) => c.domain)}
            />

            {/* Company Detail Modal */}
            {selectedCompany && (
                <CompanyDetailModal
                    company={selectedCompany}
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setIsDetailModalOpen(false)
                        setSelectedCompany(null)
                    }}
                />
            )}
        </div>
    )
}

// Import Modal Component
interface ImportModalProps {
    isOpen: boolean
    onClose: () => void
    onImport: (company: Company) => void
    existingIds: string[]
}

function ImportModal({ isOpen, onClose, onImport, existingIds }: ImportModalProps) {
    const [importSource, setImportSource] = useState<"url" | "csv">("url")
    const [crunchbaseUrl, setCrunchbaseUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [importedIds, setImportedIds] = useState<Set<string>>(new Set())

    // Filters
    const [selectedStages, setSelectedStages] = useState<string[]>([])
    const [selectedSectors, setSelectedSectors] = useState<string[]>([])
    const [employeeMin, setEmployeeMin] = useState("")
    const [employeeMax, setEmployeeMax] = useState("")
    const [fundingDate, setFundingDate] = useState("90")

    // Filter the importable companies based on criteria
    const filteredCompanies = mockImportableCompanies.filter((company) => {
        // Stage filter
        if (selectedStages.length > 0 && !selectedStages.includes(company.stage)) {
            return false
        }
        // Sector filter
        if (selectedSectors.length > 0 && !selectedSectors.includes(company.sector)) {
            return false
        }
        // Employee range
        const min = parseInt(employeeMin) || 0
        const max = parseInt(employeeMax) || Infinity
        if (company.employees < min || company.employees > max) {
            return false
        }
        // Already imported
        if (existingIds.includes(company.domain) || importedIds.has(company.id)) {
            return false
        }
        return true
    })

    const handleSearch = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
        setShowResults(true)
    }

    const handleImportCompany = (company: Company) => {
        onImport(company)
        setImportedIds((prev) => new Set([...prev, company.id]))
    }

    const toggleStage = (stage: string) => {
        setSelectedStages((prev) =>
            prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
        )
    }

    const toggleSector = (sector: string) => {
        setSelectedSectors((prev) =>
            prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]
        )
    }

    const handleClose = () => {
        setShowResults(false)
        setCrunchbaseUrl("")
        setSelectedStages([])
        setSelectedSectors([])
        setEmployeeMin("")
        setEmployeeMax("")
        setImportedIds(new Set())
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-3xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#1A1A1A]">Import Companies</h2>
                        <p className="text-sm text-[#6B6B6B] mt-1">
                            Find and import companies from external sources
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {!showResults ? (
                    <>
                        {/* Import Source */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-[#1A1A1A]">
                                Import Source
                            </label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setImportSource("url")}
                                    className={cn(
                                        "flex-1 p-4 rounded-lg border-2 transition-all duration-200",
                                        importSource === "url"
                                            ? "border-[#1A1A1A] bg-[#FAFAFA]"
                                            : "border-[#E5E5E5] hover:border-[#1A1A1A]"
                                    )}
                                >
                                    <Link2 className="w-5 h-5 text-[#6B6B6B] mb-2" />
                                    <p className="text-sm font-medium text-[#1A1A1A]">Crunchbase URL</p>
                                    <p className="text-xs text-[#6B6B6B] mt-1">
                                        Import from a Crunchbase search or company page
                                    </p>
                                </button>
                                <button
                                    onClick={() => setImportSource("csv")}
                                    className={cn(
                                        "flex-1 p-4 rounded-lg border-2 transition-all duration-200",
                                        importSource === "csv"
                                            ? "border-[#1A1A1A] bg-[#FAFAFA]"
                                            : "border-[#E5E5E5] hover:border-[#1A1A1A]"
                                    )}
                                >
                                    <FileSpreadsheet className="w-5 h-5 text-[#6B6B6B] mb-2" />
                                    <p className="text-sm font-medium text-[#1A1A1A]">CSV Upload</p>
                                    <p className="text-xs text-[#6B6B6B] mt-1">
                                        Upload a CSV file with company data
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* URL Input */}
                        {importSource === "url" && (
                            <Input
                                label="Crunchbase URL"
                                placeholder="https://crunchbase.com/hub/ai-startups"
                                value={crunchbaseUrl}
                                onChange={(e) => setCrunchbaseUrl(e.target.value)}
                            />
                        )}

                        {/* CSV Upload */}
                        {importSource === "csv" && (
                            <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-8 text-center hover:border-[#1A1A1A] transition-colors">
                                <Upload className="w-8 h-8 text-[#6B6B6B] mx-auto mb-3" />
                                <p className="text-sm text-[#1A1A1A] font-medium mb-1">
                                    Drag CSV here or click to upload
                                </p>
                                <p className="text-xs text-[#6B6B6B]">
                                    Required columns: company_name, domain, sector, stage
                                </p>
                            </div>
                        )}

                        {/* Filters */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-[#6B6B6B]" />
                                <label className="text-sm font-medium text-[#1A1A1A]">Filters</label>
                            </div>

                            {/* Stage Filter */}
                            <div>
                                <label className="block text-xs text-[#6B6B6B] mb-2">Stage</label>
                                <div className="flex flex-wrap gap-2">
                                    {stageOptions.map((stage) => (
                                        <button
                                            key={stage}
                                            onClick={() => toggleStage(stage)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                                                selectedStages.includes(stage)
                                                    ? "bg-[#1A1A1A] text-white"
                                                    : "bg-[#F5F5F5] text-[#6B6B6B] hover:bg-[#E5E5E5]"
                                            )}
                                        >
                                            {stage}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sector Filter */}
                            <div>
                                <label className="block text-xs text-[#6B6B6B] mb-2">Sector</label>
                                <div className="flex flex-wrap gap-2">
                                    {sectorOptions.map((sector) => (
                                        <button
                                            key={sector}
                                            onClick={() => toggleSector(sector)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                                                selectedSectors.includes(sector)
                                                    ? "bg-[#1A1A1A] text-white"
                                                    : "bg-[#F5F5F5] text-[#6B6B6B] hover:bg-[#E5E5E5]"
                                            )}
                                        >
                                            {sector}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Employee Range & Funding Date */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-[#6B6B6B] mb-2">Min Employees</label>
                                    <input
                                        type="number"
                                        placeholder="10"
                                        value={employeeMin}
                                        onChange={(e) => setEmployeeMin(e.target.value)}
                                        className={cn(
                                            "w-full px-3 py-2 text-sm rounded-lg border",
                                            "bg-white border-[#E5E5E5]",
                                            "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10"
                                        )}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#6B6B6B] mb-2">Max Employees</label>
                                    <input
                                        type="number"
                                        placeholder="500"
                                        value={employeeMax}
                                        onChange={(e) => setEmployeeMax(e.target.value)}
                                        className={cn(
                                            "w-full px-3 py-2 text-sm rounded-lg border",
                                            "bg-white border-[#E5E5E5]",
                                            "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10"
                                        )}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#6B6B6B] mb-2">Funding Date</label>
                                    <select
                                        value={fundingDate}
                                        onChange={(e) => setFundingDate(e.target.value)}
                                        className={cn(
                                            "w-full px-3 py-2 text-sm rounded-lg border",
                                            "bg-white border-[#E5E5E5]",
                                            "focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10"
                                        )}
                                    >
                                        {fundingDateOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E5E5]">
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleSearch} loading={isLoading}>
                                <Search className="w-4 h-4" />
                                Search Companies
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Results */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-[#6B6B6B]">
                                    Found {filteredCompanies.length} companies matching your criteria
                                </p>
                                <button
                                    onClick={() => setShowResults(false)}
                                    className="text-sm text-[#1A1A1A] hover:underline"
                                >
                                    ← Back to filters
                                </button>
                            </div>

                            {/* Preview Table */}
                            <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">
                                                Company
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">
                                                Sector
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">
                                                Stage
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">
                                                Funding
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase">
                                                Employees
                                            </th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-[#6B6B6B] uppercase">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCompanies.map((company) => (
                                            <tr key={company.id} className="border-b border-[#E5E5E5] last:border-0">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                                            <span className="text-xs font-medium text-[#6B6B6B]">
                                                                {company.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-[#1A1A1A]">
                                                                {company.name}
                                                            </p>
                                                            <p className="text-xs text-[#6B6B6B]">{company.domain}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="default">{company.sector}</Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-sm text-[#6B6B6B]">{company.stage}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-sm font-medium text-[#1A1A1A]">
                                                        {formatFunding(company.fundingAmount)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-sm text-[#6B6B6B]">{company.employees}</span>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleImportCompany(company)}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                        Import
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E5E5]">
                            <Button variant="secondary" onClick={handleClose}>
                                Done
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}

// Company Detail Modal Component
interface CompanyDetailModalProps {
    company: Company
    isOpen: boolean
    onClose: () => void
}

function CompanyDetailModal({ company, isOpen, onClose }: CompanyDetailModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-[#F5F5F5] flex items-center justify-center">
                            <span className="text-xl font-bold text-[#6B6B6B]">
                                {company.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-[#1A1A1A]">{company.name}</h2>
                            <a
                                href={`https://${company.domain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1"
                            >
                                {company.domain}
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[#FAFAFA]">
                        <p className="text-xs text-[#6B6B6B] mb-1">Sector</p>
                        <p className="text-sm font-medium text-[#1A1A1A]">{company.sector}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#FAFAFA]">
                        <p className="text-xs text-[#6B6B6B] mb-1">Stage</p>
                        <p className="text-sm font-medium text-[#1A1A1A]">{company.stage}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#FAFAFA]">
                        <p className="text-xs text-[#6B6B6B] mb-1">Funding Amount</p>
                        <p className="text-sm font-medium text-[#1A1A1A]">
                            {formatFunding(company.fundingAmount)}
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#FAFAFA]">
                        <p className="text-xs text-[#6B6B6B] mb-1">Employees</p>
                        <p className="text-sm font-medium text-[#1A1A1A]">{company.employees}</p>
                    </div>
                </div>

                {/* Assigned Agent */}
                <div className="p-4 rounded-lg border border-[#E5E5E5]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-[#6B6B6B]">Assigned Agent</p>
                                <p className="text-sm font-medium text-[#1A1A1A]">
                                    {company.assignedAgent || "Not assigned"}
                                </p>
                            </div>
                        </div>
                        {!company.assignedAgent && (
                            <Button size="sm">Assign Agent</Button>
                        )}
                    </div>
                </div>

                {/* Pipeline */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-emerald-50">
                        <p className="text-xs text-emerald-600 mb-1">Pipeline Value</p>
                        <p className="text-xl font-semibold text-emerald-700">
                            ${company.pipelineValue.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50">
                        <p className="text-xs text-blue-600 mb-1">Last Funding</p>
                        <p className="text-xl font-semibold text-blue-700">
                            {new Date(company.lastFundingDate).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E5E5]">
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button>View Pipeline</Button>
                </div>
            </div>
        </Modal>
    )
}
