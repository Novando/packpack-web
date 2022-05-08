import Kitalabel from '@/apis/Kitalabel.js';

export default {
	showCity(id){
		return Kitalabel().post('rajaongkir/city/', id)
	},
	setZip(id){
		return Kitalabel().post('rajaongkir/zip/', id)
	},
	showCost(dest){
		return Kitalabel().post('rajaongkir/cost/', dest)
	},
  printProvince(){
		return Kitalabel().get('rajaongkir/province/')
	},
  

}