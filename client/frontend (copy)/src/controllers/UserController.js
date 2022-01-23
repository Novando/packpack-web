import Kitalabel from '@/apis/Kitalabel.js';

export default{
	register(user){
		return Kitalabel().post('user/register', user)
	},

	login(user){
		return Kitalabel().post('user/login', user)
	},

	refresh(user){
		return Kitalabel().post('user/refresh', user)
	},

	logout(){
		return Kitalabel().post('user/logout')
	},

	show(){
		return Kitalabel().get('user')
	},
};