export interface IPostRequest {
    title: string;
    content: string;
    image: string;
    user: string;
}

export interface IPostResponse {
    id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    user: IUser;
    created_at: string;
    updated_at: string;
}

export interface IPostsResponse {
    status: string;
    data: {
        posts: IPostResponse[];
    };
}