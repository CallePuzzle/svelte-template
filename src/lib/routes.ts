interface Route {
	name: string;
	url?: string;
	generateUrl?: (params: any) => string;
}

interface Routes {
	[id: string]: Route;
}

const Routes: Routes = {
	home: {
		name: 'Inicio',
		url: '/'
	},
	login: {
		name: 'Login',
		url: '/auth'
	},
	profile: {
		name: 'Perfil',
		url: '/profile'
	},
	notification_my: {
		name: 'Mis notificaciones',
		url: '/notification/my'
	},
	notification_subscribe: {
		name: 'Subscribe',
		url: '/notification/subscribe'
	}
};

interface ProtectedRoute {
	path: string;
	message: string;
}

const ProtectedRoutes: ProtectedRoute[] = [
	{
		path: '/profile',
		message: 'Para ver tu perfil necesitas iniciar sesión'
	},
	{
		path: '/notification/my',
		message: 'Para ver tus notificaciones necesitas iniciar sesión'
	}
];

const RouteIsProtected = (path: string): boolean => {
	return ProtectedRoutes.some((route) => route.path === path);
};

export { Routes, ProtectedRoutes, RouteIsProtected };
