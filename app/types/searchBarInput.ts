export interface SearchBarProps {
    onSearch: (query: string) => Promise<any>;
    delay?: number;
    placeholder?: string;
}

export interface SearchBarAnimeEntryItems {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
    aired: {
        from: string;
    }
}