import Kitalabel from '@/apis/Kitalabel.js';

export default {
	print(){
		return Kitalabel().get('custom/')
	},
}