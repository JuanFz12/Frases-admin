export interface AppRoutes {
    name: string;
    icon: string;
    link?: string;
    children?: AppRoutes[]
}
export const APP_ROUTES: AppRoutes[] = [
    {
        name: 'Frases',
        icon: "format_quote",
        link: "/admin/phrases"
    },
    {
        name: 'Usuarios',
        icon: "people",
        link: "/admin/users"
    },

];

