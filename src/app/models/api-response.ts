export interface APIResponse<R=any> {
    status: number;
    message: string;
    data: R;
}