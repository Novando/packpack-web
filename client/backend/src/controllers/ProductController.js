import Kitalabel from '@/apis/Kitalabel.js';

export default {
	print(){
		return Kitalabel().get('/product')
	},

	addMainImg(product){
		return Kitalabel().post('/product/add/main', product)
	},

	addOtherImgs(product){
		return Kitalabel().post('/product/add/other', product)
	},

	addDesignFiles(product){
		return Kitalabel().post('/product/add/files', product)
	},

	add(product){
		return Kitalabel().post('/product/add', product)
	},

	show(id){
		return Kitalabel().get(`/product/show/${id}`)
	},

	edit(id, product){
		return Kitalabel().post(`/product/edit/${id}`, product)
	},

	remove(id){
		return Kitalabel().delete(`/product/remove/${id}`)
	},

}