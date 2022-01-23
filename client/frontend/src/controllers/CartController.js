import Kitalabel from '@/apis/Kitalabel.js';

export default {
	addCart(cart){
		return Kitalabel().post('cart/add', cart)
	},

	showUserCart(id){
		return Kitalabel().get('cart/show/user/' + id)
	},

}