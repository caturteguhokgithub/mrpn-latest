export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    per_page: number;
    total: number;
    last_page: number;
}