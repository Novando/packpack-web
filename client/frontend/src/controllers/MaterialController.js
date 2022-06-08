import Kitalabel from '@/apis/Kitalabel.js';

export default {
	print(){
		return Kitalabel().get('/material')
	},
	show(id){
		return Kitalabel().get(`/material/show/${id}`)
	},
}