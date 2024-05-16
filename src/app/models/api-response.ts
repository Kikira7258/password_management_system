export interface APIResponse<R=any> {
    status: string;
    message: string;
    error:any;
    data: R;
}