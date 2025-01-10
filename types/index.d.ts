export interface UserSession  {
    id?: string,
    email: string | null |  undefined;
    name: string | null | undefined;
    avatar?: string | null | undefined;
    plan?: string;

}