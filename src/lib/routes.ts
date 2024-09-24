interface Route {
	name: string;
	url?: string;
	generateUrl?: (params: any) => string;
}

interface Routes {
	[id: string]: Route;
}

export const Routes: Routes = {
	home: {
		name: 'Inicio',
		url: '/'
	},
	login: {
		name: 'Login',
		url: '/login'
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
	},
};
