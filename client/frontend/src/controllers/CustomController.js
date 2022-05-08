import Kitalabel from '@/apis/Kitalabel.js';

export default {
	add(custom){
		return Kitalabel().post('custom/add', custom)
	},

	userId(custom){
		return Kitalabel().post('custom/show/user-id', custom)
	},

}