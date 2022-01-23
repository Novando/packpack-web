import Kitalabel from '@/apis/Kitalabel.js';

export default {
	show(){
		return Kitalabel().get('prod-atrb/')
	},
	add(attribute){
		return Kitalabel().post('prod-atrb/add', attribute)
	},
}