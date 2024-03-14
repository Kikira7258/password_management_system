export interface APIResponse<R=any> {
    status: string;
    message: string;
    data: R;
}