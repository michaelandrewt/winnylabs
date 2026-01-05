// Types for the application

// Page types for client portal navigation
export type Page =
    | "agents"
    | "companies"
    | "pipeline"
    | "settings"
    | "analytics"
    | "products"
    | "clients"
    | "associates"

// Page types for agents portal
export type AgentsPage = "dashboard" | "fleet" | "activity" | "training" | "settings"
