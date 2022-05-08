import Kitalabel from '@/apis/Kitalabel.js';

export default {
	print(){
		return Kitalabel().get('material/')
	},
	add(attribute){
		return Kitalabel().post('material/add', attribute)
	},
	edit(id, attribute){
		return Kitalabel().post('material/edit/' + id, attribute)
	},
	restock(id, attribute){
		return Kitalabel().post('material/restock/' + id, attribute)
	},
	adjust(id, attribute){
		return Kitalabel().post('material/adjust/' + id, attribute)
	},
	show(id){
		return Kitalabel().get('material/show/' + id)
	},
}