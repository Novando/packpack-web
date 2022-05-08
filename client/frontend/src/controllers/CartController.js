import Kitalabel from '@/apis/Kitalabel.js';

export default {
	add(cart){
		return Kitalabel().post('cart/add', cart)
	},

	show(id){
		return Kitalabel().post('cart/show/user', id)
	},

}