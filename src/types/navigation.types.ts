export interface RouteDefinition {
    id: string;
    path: string;
    title: string;
    description?: string;

    search?: {
        keywords?: string[];
        aliases?: string[];
    };
}
