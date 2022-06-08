import Kitalabel from '@/apis/Kitalabel.js';

export default{
	register(user){
		return Kitalabel().post('/user/register', user)
	},

	login(user){
		return Kitalabel().post('/user/login', user)
	},

	show(id){
		return Kitalabel().get(`/user/show/${id}`)
	},

	edit(id, user){
		return Kitalabel().post(`/user/edit/${id}`, user)
	},

	remove(id){
		return Kitalabel().delete(`/user/remove/${id}`)
	},

	logout(){
		return Kitalabel().post('/user/logout')
	},

	print(){
		return Kitalabel().get('/user')
	},
};