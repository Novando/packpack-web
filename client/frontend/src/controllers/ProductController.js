import Kitalabel from '@/apis/Kitalabel.js';

export default {
	print(){
		return Kitalabel().get('/product')
	},

	show(id){
		return Kitalabel().get(`/product/show/${id}`)
	},

}